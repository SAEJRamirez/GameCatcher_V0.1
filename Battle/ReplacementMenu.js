
//Class menu for replacement of fighter
export class ReplacementMenu {
    constructor({ replacements, onComplete }) {
        this.replacements = replacements;
        this.onComplete = onComplete;
    }

    //Trigger replacement
    decide() {
        this.menuSubmit(this.replacements[0])
    }

    //Close menu
    menuSubmit(replacement) {
        this.keyboardMenu?.end();
        this.onComplete(replacement)
    }

    //Display menu
    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.replacements.map(c => {
            return {
                label: c.name,
                description: c.description,
                handler: () => {
                    this.menuSubmit(c);
                }
            }
        }))
    }

    //Init class
    init(container) {
        if (this.replacements[0].isPlayerControlled) {
            this.showMenu(container);
        } else {
            this.decide();
        }
    }
}