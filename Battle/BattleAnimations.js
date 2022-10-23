window.BattleAnimations = {
    async spin(event, onComplete) {
        const element = event.caster.fighterElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
        element.classList.add(animationClassName);

        //Enlever la classe quand l'animation est totalement finie
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, {once: true})

        //Continuer le cycle de combat au moment où les combattants se collisionnent
        await utils.wait(100);
        onComplete();
    },

    //Animation de jet de boule de poison
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

        //Enlever la classe quand l'animation est totalement finie
        div.addEventListener("animationend", () => {
            div.remove();
        });

        //Ajouter à la scène
        document.querySelector(".Battle").appendChild(div);
        await utils.wait(820);
        onComplete();
    }
}