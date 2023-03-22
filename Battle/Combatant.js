//Imports methods and variables
import {utils} from "../utils.js";

//Class for fighter
export class Combatant {
    constructor(config, battle) {
        Object.keys(config).forEach(key => {
            this[key] = config[key];
        })
        this.hp = typeof (this.hp) === "undefined" ? this.maxHp : this.hp;
        this.battle = battle;
    }

    //HP
    get hpPercent() {
        const percent = this.hp / this.maxHp * 100;
        return percent > 0 ? percent : 0;
    }

    //XP
    get xpPercent() {
        return this.xp / this.maxXp * 100;
    }

    //If is the fighter who fight
    get isActive() {
        return this.battle?.activeCombatants[this.team] === this.id;
    }

    //Give XP after fight
    get givesXp() {
        return this.level * 20;
    }

    //DOM creation
    createElement() {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");
        this.hudElement.setAttribute("data-combatant", this.id);
        this.hudElement.setAttribute("data-team", this.team);
        this.hudElement.innerHTML = (`
              <p class="Combatant_name">${this.name}</p>
              <p class="Combatant_level"></p>
              <div class="Combatant_character_crop">
                <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
              </div>
              <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
              <svg viewBox="0 0 26 3" class="Combatant_life-container">
                <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
                <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
              </svg>
              <svg viewBox="0 0 26 2" class="Combatant_xp-container">
                <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
                <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
              </svg>
              <p class="Combatant_status"></p>
            `);

        this.fighterElement = document.createElement("img");
        this.fighterElement.classList.add("Fighter");
        this.fighterElement.setAttribute("src", this.src );
        this.fighterElement.setAttribute("alt", this.name );
        this.fighterElement.setAttribute("data-team", this.team );

        this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect");
        this.xpFills = this.hudElement.querySelectorAll(".Combatant_xp-container > rect");
    }

    //Update in requestAnimationFrame
    update(changes={}) {
        //Update everything
        Object.keys(changes).forEach(key => {
            this[key] = changes[key]
        });

        //Update fighter name and infos
        this.hudElement.setAttribute("data-active", this.isActive);
        this.fighterElement.setAttribute("data-active", this.isActive);

        //Update HP & XP percent fills
        this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`)
        this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`)

        //Update level
        this.hudElement.querySelector(".Combatant_level").innerText = this.level;

        //Update status
        const statusElement = this.hudElement.querySelector(".Combatant_status");
        if (this.status) {
            statusElement.innerText = this.status.type;
            statusElement.style.display = "block";
        } else {
            statusElement.innerText = "";
            statusElement.style.display = "none";
        }
    }

    //Display info from status
    getReplacedEvents(originalEvents) {
        if (this.status?.type === "empoisonné" && utils.randomFromArray([false, true, false])) {
            return [
                { type: "textMessage", text: `${this.name} est blessé par le poison !` },
                { type: "stateChange", recover: -10, onCaster: true },
            ]
        }
        return originalEvents;
    }

   //Trigger effect of status (heal, poison, etc...)
    getPostEvents() {
        if (this.status?.type === "soigné") {
            return [
                { type: "textMessage", text: "MMMh c'est bon!" },
                { type: "stateChange", recover: 5, onCaster: true }
            ]
        }
        if (this.status?.type === "empoisonné") {
            return [
                { type: "textMessage", text: `${this.name} est blessé par le poison !` },
                { type: "stateChange", recover: -10, onCaster: true },
            ]
        }
        return [];
    }

    //Effect duration
    decrementStatus() {
        if (this.status?.expiresIn > 0) {
            this.status.expiresIn -= 1;
            if (this.status.expiresIn === 0) {
                this.update({
                    status: null
                })
                return {
                    type: "textMessage",
                    text: "Status expired!"
                }
            }
        }
        return null;
    }

    //Init class
    init(container) {
        this.createElement();
        container.appendChild(this.hudElement);
        container.appendChild(this.fighterElement);
        this.update();
    }
}