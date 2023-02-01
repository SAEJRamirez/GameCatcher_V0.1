import {KeyboardMenu} from "./KeyboardMenu.js";
import {utils} from "../utils.js";
import {KeyPressListener} from "./KeyPressListener.js";
import {Fighters} from "../Content/fighters.js";

export class PauseMenu {
    constructor({progress, onComplete}) {
        this.progress = progress;
        this.onComplete = onComplete;
    }

    getOptions(pageKey, id = null) {

        //Cas 1: Montrer la première page d'options
        if(pageKey === "games") {
            let temps = [];
            const games = playerState.lineup.map(id => {
              const {fighterId} = playerState.fighters[id];
              const gameOfFighter = Fighters[fighterId];
              if(temps.length > 0) {
                  temps.forEach(entry => {
                      if(entry.game !== gameOfFighter.game) {
                          temps.push(gameOfFighter)
                      }
                  })
              } else {
                  temps.push(gameOfFighter)
              }
            })

            const final = temps.map(game => {
                return {
                    label: game.game,
                    description: game.description,
                    handler: () =>{
                        this.keyboardMenu.setOptions( this.getOptions("fighters", game.gameId))
                    }
                }
            })

            return [
                ...final
            ]

        }

        if (pageKey === "fighters") {
            let temp = [];
            let idForSwap;
            const fighters = playerState.lineup.map(fId => {
                const {fighterId} = playerState.fighters[fId];
                idForSwap = fId;
                if(Fighters[fighterId].gameId === id) {
                    temp.push(Fighters[fighterId]);
                }
            })
            const final = temp.map(fighter => {
                return {
                    label: fighter.name,
                    description: fighter.description,
                    handler: () => {
                        this.keyboardMenu.setOptions( this.getOptions(idForSwap))
                    }
                }
            })
            return [
                ...final
            ]

        }



        if (pageKey === "root") {
            return [

                {
                    label: "Games",
                    description: "Vos jeux",
                    handler: () => {
                        this.keyboardMenu.setOptions( this.getOptions("games"))
                    }
                },
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