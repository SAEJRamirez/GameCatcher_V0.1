//TODO à compléter si besoin d'un menu crafting ou pour ramasser les objects

class CraftingMenu {
    constructor({fighters, onComplete}) {
        this.fighters = fighters;
        this.onComplete = onComplete;
        this.arcadeStation = new ArcadeStation(fighters)
    }

    getOptions() {
        return this.fighters.map(id => {
            const base = Fighters[id];
            return {
                label: base.name,
                description: base.description,
                handler: () => {
                    this.arcadeStation.runNewGame(id);
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