import {KeyboardMenu} from "./KeyboardMenu.js";
import {audioGameCatcher} from "../audio/gameCatcher/audio.js";

export class TitleScreen {
    constructor({progress}) {
        this.progress = progress;
    }

    getOptions(resolve) {
        const safeFile = this.progress.getSaveFile();
        return [
            {
                label: "Nouvelle partie",
                description: "Démarrer une nouvelle aventure !",
                handler: () => {
                    this.close();
                    resolve();
                }
            },
            safeFile ? {
                label: "Continuer",
                description: "Reprendre votre aventure en cours",
                handler: () => {
                    this.close();
                    resolve(safeFile);
                }
            } :null
        ].filter( v=> v);
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TitleScreen");
        this.element.innerHTML = (`
            <img class="TitleScreen_logo" src="/img/ui/logoGameCatcher.png" alt="logo Game Catcher" />
            <img class="TitleScreen_img" src="/img/enemies/choompy/uniqueLeft.png" alt="choompy" />
        `)
    }

    close() {
        this.keyboardMenu.end();
        this.element.remove();
        audioGameCatcher.titleScreen.stop()
    }

    init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
            this.keyboardMenu = new KeyboardMenu();
            this.keyboardMenu.init(this.element);
            this.keyboardMenu.setOptions(this.getOptions(resolve))
            audioGameCatcher.titleScreen.play()
            audioGameCatcher.titleScreen.volume(0.5)
        })
    }
}