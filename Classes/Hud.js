import {Combatant} from "../Battle/Combatant.js";
import {Fighters} from "../Content/fighters.js";


export class Hud {
    constructor() {
        this.scoreboards = [];
    }

    update() {
        this.scoreboards.forEach(s => {
            s.update(window.playerState.fighters[s.id])
        })
    }

    createElement() {
        if (this.element) {
            this.element.remove();
            this.scoreboards = [];
        }

        this.element = document.createElement("div");
        this.element.classList.add("Hud");

        const {playerState} = window;
        playerState.lineup.forEach(key => {
            const fighter = playerState.fighters[key];
            const scoreboard = new Combatant({
                id: key,
                ...Fighters[fighter.fighterId],
                ...fighter,
            }, null)
            scoreboard.createElement();
            this.scoreboards.push(scoreboard);
            this.element.appendChild(scoreboard.hudElement);
        })
        this.update();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        document.addEventListener("PlayerStateUpdated", () => {
            this.update();
        })

        document.addEventListener("LineupChanged", () => {
            this.createElement();
            container.appendChild(this.element);
        })
    }
}