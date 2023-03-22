//Imports methods and variables
import {utils} from "../utils.js";

//Animation for Battle
export const BattleAnimations = {
    async spin(event, onComplete) {
        const element = event.caster.fighterElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
        element.classList.add(animationClassName);
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, {once: true})

        await utils.wait(100);
        onComplete();
    },

    //Poison bubble animation
    async glob(event, onComplete) {
        const {caster} = event;
        let div = document.createElement("div");
        div.classList.add("glob-orb");
        div.classList.add(caster.team === "player" ? "battle-glob-right" : "battle-glob-left");

        div.innerHTML = (`
                          <svg viewBox="0 0 32 32" width="32" height="32">
                            <circle cx="16" cy="16" r="16" fill="${event.color}" />
                          </svg>
                        `);

        div.addEventListener("animationend", () => {
            div.remove();
        });
        document.querySelector(".Battle").appendChild(div);
        await utils.wait(820);
        onComplete();
    }
}