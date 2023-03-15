import {runGame} from "../platformerGame/js/platformerMain.js";
import {audioGameCatcher} from "../audio/gameCatcher/audio.js";
import {KeyboardMenu} from "./KeyboardMenu.js";

export class RunArcadeStation {
    constructor(fighters, map, id) {
        this.fighters = fighters;
        this.map = map
        this.id = id
    }

    titleScreen() {
        this.element = document.createElement("div");
        this.element.classList.add("TitleScreen");
        this.element.innerHTML = (`
            <img class="TitleScreen_platformer" src="/img/ui/logoPlatformer.png" alt="logo de LittleRed" />
        `)
    }

    getOptions(resolve) {
        return [
            {
                label: "Nouvelle partie",
                description: "Gare aux champignons...",
                handler: () => {
                    this.close();
                    this.menuRunNewGame(this.id)
                    resolve();
                }
            },
        ]
    }

    menuRunNewGame(fighterId) {
        switch (fighterId) {
            case "s001":
                this.runPlatformer(fighterId)
                break;
        }
    }

    close() {
        this.keyboardMenu.end();
        this.element.remove();
    }

    runPlatformer(id) {
        this.map.isPaused = true;
        audioGameCatcher.titleScreen.stop()
        runGame(id, this.map)
    }

    init(container) {
        return new Promise(resolve => {
            this.titleScreen();
            container.appendChild(this.element);
            this.keyboardMenu = new KeyboardMenu();
            this.keyboardMenu.init(this.element);
            this.keyboardMenu.setOptions(this.getOptions(resolve))
            //audioGameCatcher.titleScreen.play()
        })
    }
}