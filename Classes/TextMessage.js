import {RevealingText} from "./RevealingText.js";
import {KeyPressListener} from "./KeyPressListener.js";

export class TextMessage {
    constructor({text, onComplete, who}) {
        this.text = text;
        this.onComplete = onComplete;
        this.who = who;
        this.element = null;
    }

    createElement() {
        //Créer l'élément
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
              <p class="TextMessage_p"><b class="temp">${this.who}: </b></p>
              <button class="TextMessage_button">Suivant</button>
            `)
        //Initialiser l'effet machine à écrire
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text,
        })

        this.element.querySelector("button").addEventListener("click", () => {
            //Fermer le message
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
        })
    }

    done() {
        if (this.revealingText.isDone) {
            this.element.remove();
            this.actionListener.unbind();
            this.onComplete();
        } else {
            this.revealingText.warpToDone();
        }
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}