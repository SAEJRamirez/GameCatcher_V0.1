import {Combatant} from "./Combatant.js";
import {Team} from "./Team.js";
import {TurnCycle} from "./TurnCycle.js";
import {BattleEvent} from "./BattleEvent.js";
import {utils} from "../utils.js";
import {Fighters} from "../Content/fighters.js";

export class Battle {
    constructor({ enemy, onComplete }) {
        this.enemy = enemy;
        this.onComplete = onComplete;
        this.combatants = {};
        this.activeCombatants = {
            player: null,
            enemy: null,
        }

        //Ajouter dynamiquement l'équipe du Joueur
        window.playerState.lineup.forEach(id => {
            this.addCombatant(id, "player", window.playerState.fighters[id])
        });
        //Ajouter dynamiquement l'équipe ennemie
        Object.keys(this.enemy.fighters).forEach(key => {
            this.addCombatant("e_"+key, "enemy", this.enemy.fighters[key])
        });

        //Objets
        this.items = [];
        //Ajout d'objets au Joueur
        window.playerState.items.forEach(item => {
            this.items.push({
                ...item,
                team: "player"
            })
        })
        this.usedInstanceIds = {};
    }

    addCombatant(id, team, config) {
        this.combatants[id] = new Combatant({
            ...Fighters[config.fighterId],
            ...config,
            team,
            isPlayerControlled: team === "player"
        }, this)

        //Premier combattant du joueur
        this.activeCombatants[team] = this.activeCombatants[team] || id;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = (`
            <div class="Battle_hero">
              <img src="${'/images/personnages/personnes/me.png'}" alt="Hero" />
            </div>
            <div class="Battle_enemy">
              <img src=${this.enemy.src} alt=${this.enemy.name} />
            </div>
            `)
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        this.playerTeam = new Team("player", "Hero");
        this.enemyTeam = new Team("enemy", "Bully");

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)

            //Ajouter à la bonne équipe
            if (combatant.team === "player") {
                this.playerTeam.combatants.push(combatant);
            } else if (combatant.team === "enemy") {
                this.enemyTeam.combatants.push(combatant);
            }
        })

        this.playerTeam.init(this.element);
        this.enemyTeam.init(this.element);

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve);
                })
            },
            onWinner: winner => {

                if (winner === "player") {
                    const playerState = window.playerState;
                    Object.keys(playerState.fighters).forEach(id => {
                        const playerStateFighter = playerState.fighters[id];
                        const combatant = this.combatants[id];
                        if (combatant) {
                            playerStateFighter.hp = combatant.hp;
                            playerStateFighter.xp = combatant.xp;
                            playerStateFighter.maxXp = combatant.maxXp;
                            playerStateFighter.level = combatant.level;
                        }
                    })

                    //Se débarrasser des objets utilisés par les joueurs
                    playerState.items = playerState.items.filter(item => {
                        return !this.usedInstanceIds[item.instanceId]
                    })

                    //Envoyer un évènement pour update
                    utils.emitEvent("PlayerStateUpdated");
                }
                this.element.remove();
                this.onComplete(winner === "player");
            }
        })
        this.turnCycle.init();
    }
}