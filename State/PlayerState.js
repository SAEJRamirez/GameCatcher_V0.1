import {utils} from "../utils.js";

class PlayerState {
    constructor() {
        this.fighters = {
            "f1": {
                fighterId: "s001",
                gameId: "hms1",
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                level: 1,
                status: null,
            }
        }
        this.lineup = [];
        this.items = [
            { actionId: "item_recoverHp", instanceId: "item1" },
            { actionId: "item_recoverHp", instanceId: "item2" },
            { actionId: "item_recoverHp", instanceId: "item3" },
        ]
        this.storyFlags = {
            /*ARCADE_BOSS_CHAT2: {
                flag: "ARCADE_BOSS_CHAT2",
                complete: true
            }*/
        }

    }

    addFighter(fighterId) {
        const newId = `f${Date.now()}`+Math.floor(Math.random() * 99999);
        this.fighters[newId] = {
            fighterId,
            hp: 50,
            maxHp: 50,
            xp: 0,
            maxXp: 100,
            level: 1,
            status: null,
        }
        if (this.lineup.length < 3) {
            this.lineup.push(newId)
        }
        utils.emitEvent("LineupChanged");
    }

    swapLineup(oldId, incomingId) {
        const oldIndex = this.lineup.indexOf(oldId);
        this.lineup[oldIndex] = incomingId;
        utils.emitEvent("LineupChanged");
    }

    moveToFront(futurFrontId) {
        this.lineup = this.lineup.filter(id => id !== futurFrontId);
        this.lineup.unshift(futurFrontId);
        utils.emitEvent("LineupChanged");
    }
}

window.playerState = new PlayerState();