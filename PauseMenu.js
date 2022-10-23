class PauseMenu {
    constructor({progress, onComplete}) {
        this.progress = progress;
        this.onComplete = onComplete;
    }

    getOptions(pageKey) {

        //Cas 1: Montrer la première page d'options
        if (pageKey === "root") {
            const lineupFighters = playerState.lineup.map(id => {
                const {fighterId} = playerState.fighters[id];
                const base = Fighters[fighterId];
                return {
                    label: base.name,
                    description: base.description,
                    handler: () => {
                        this.keyboardMenu.setOptions( this.getOptions(id) )
                    }
                }
            })

            return [
                ...lineupFighters,
                {
                    label: "Save",
                    description: "Save your progress",
                    handler: () => {
                        this.progress.save();
                        this.close();
                    }
                },
                {
                    label: "Close",
                    description: "Close the pause menu",
                    handler: () => {
                        this.close();
                    }
                }
            ]
        }

        //Cas 2: Montrer les options juste pour un combatant (by id)
        const unequipped = Object.keys(playerState.fighters).filter(id => {
            return playerState.lineup.indexOf(id) === -1;
        }).map(id => {
            const {fighterId} = playerState.fighters[id];
            const base = Fighters[fighterId];
            return {
                label: `Swap for ${base.name}`,
                description: base.description,
                handler: () => {
                    playerState.swapLineup(pageKey, id);
                    this.keyboardMenu.setOptions( this.getOptions("root") );
                }
            }
        })
        return [
            ...unequipped,
            {
                label: "Move to front",
                description: "Move this fighter to the front of the list",
                handler: () => {
                    playerState.moveToFront(pageKey);
                    this.keyboardMenu.setOptions( this.getOptions("root") );
                }
            },
            {
                label: "Back",
                description: "Back to root menu",
                handler: () => {
                    this.keyboardMenu.setOptions( this.getOptions("root") );
                }
            }
        ]
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("PauseMenu");
        this.element.classList.add("overlayMenu");
        this.element.innerHTML = (`
            <h2>
                Pause Menu
            </h2>
        `)
    }

    close() {
        this.esc?.unbind();
        this.keyboardMenu.end();
        this.element.remove();
        this.onComplete();
    }

    async init(container) {
        this.createElement();
        this.keyboardMenu = new KeyboardMenu({
            descriptionContainer: container
        })
        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions(this.getOptions("root"));

        container.appendChild(this.element);

        await utils.wait(200)
        this.esc = new KeyPressListener("Escape", () => {
            this.close();
        })
    }
}