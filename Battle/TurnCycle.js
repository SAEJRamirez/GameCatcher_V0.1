
export class TurnCycle {
    constructor({battle, onNewEvent, onWinner}) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.onWinner = onWinner;
        this.currentTeam = "player"; //ou "enemy"
    }

    async turn() {
        //Trouver le "Caster"
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];
        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"]
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })

        //Arrêter ici si on remplace ce combatant
        if (submission.replacement) {
            await this.onNewEvent({
                type: "replace",
                replacement: submission.replacement
            })
            await this.onNewEvent({
                type: "textMessage",
                text: `Go get 'em, ${submission.replacement.name}!`
            })
            this.nextTurn();
            return;
        }

        if (submission.instanceId) {
            //Ajouter à la liste pour qu'il soit présent dans le PlayerState après
            this.battle.usedInstanceIds[submission.instanceId] = true;

            //Enlever l'objet depuis l'état du combat
            this.battle.items = this.battle.items.filter(i => i.instanceId !== submission.instanceId)
        }

        const resultingEvents = caster.getReplacedEvents(submission.action.success);

        for (let i=0; i<resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            }
            await this.onNewEvent(event);
        }

        //La cible est-elle morte ?
        const targetDead = submission.target.hp <= 0;
        if (targetDead) {
            await this.onNewEvent({
                type: "textMessage", text: `${submission.target.name} est KO!`
            })

            if (submission.target.team === "enemy") {

                const playerActiveFighterId = this.battle.activeCombatants.player;
                const xp = submission.target.givesXp;

                await this.onNewEvent({
                    type: "textMessage",
                    text: `Vous gagnez ${xp} XP!`
                })
                await this.onNewEvent({
                    type: "giveXp",
                    xp,
                    combatant: this.battle.combatants[playerActiveFighterId]
                })
            }
        }

        //Y a-t-il une équipe gagnante ?
        const winner = this.getWinningTeam();
        if (winner) {
            await this.onNewEvent({
                type: "textMessage",
                text: "Vous avez gagné!"
            })
            this.onWinner(winner);
            return;
        }

        //Une cible morte, mais toujours pas de gagnant, donc il faut la remplacer
        if (targetDead) {
            const replacement = await this.onNewEvent({
                type: "replacementMenu",
                team: submission.target.team
            })
            await this.onNewEvent({
                type: "replace",
                replacement: replacement
            })
            await this.onNewEvent({
                type: "textMessage",
                text: `${replacement.name} apparaît!`
            })
        }

        //Voir s'il y a des post évènements
        //Faire quelque chose APRES le tour originel
        const postEvents = caster.getPostEvents();
        for (let i=0; i < postEvents.length; i++ ) {
            const event = {
                ...postEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            }
            await this.onNewEvent(event);
        }

        //Check for status expire
        //Voir si des status ont expirés
        const expiredEvent = caster.decrementStatus();
        if (expiredEvent) {
            await this.onNewEvent(expiredEvent)
        }

        this.nextTurn();
    }

    nextTurn() {
        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
    }

    getWinningTeam() {
        let aliveTeams = {};
        Object.values(this.battle.combatants).forEach(c => {
            if (c.hp > 0) {
                aliveTeams[c.team] = true;
            }
        })
        if (!aliveTeams["player"]) { return "enemy"}
        if (!aliveTeams["enemy"]) { return "player"}
        return null;
    }

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: `${this.battle.enemy.name} veut vous démonter!`,
        })

        //Démarre le premier tour
        this.turn();

    }
}