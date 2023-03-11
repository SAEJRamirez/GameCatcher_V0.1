//TODO à compléter si besoin d'un menu crafting ou pour ramasser les objects
import {KeyboardMenu} from "./KeyboardMenu.js";
import {RunArcadeStation} from "./RunArcadeStation.js";
import {Fighters} from "../Content/fighters.js";


export class CraftingMenu {
    constructor({fighters, map, onComplete}) {
        this.fighters = fighters;
        this.onComplete = onComplete;
        this.map = map
        this.arcadeStation = null
    }

    getOptions() {
        return this.fighters.map(id => {
            const base = Fighters[id];
            return {
                label: base.name,
                description: base.description,
                handler: () => {
                    this.arcadeStation = new RunArcadeStation(this.fighters, this.map)
                    this.arcadeStation.menuRunNewGame(id);
                    this.close();
                }
            }
        })
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("overlayMenu");
        this.element.innerHTML = (`
            <h2>Unlock a Fighter</h2>
        `)
    }

    close() {
        this.keyboardMenu.end();
        this.element.remove();
        this.onComplete();
    }

    init(container) {
        this.createElement();
        this.keyboardMenu = new KeyboardMenu({
            descriptionContainer: container,
        })
        this.keyboardMenu.init(this.element)
        this.keyboardMenu.setOptions(this.getOptions());

        container.appendChild(this.element)
    }
}