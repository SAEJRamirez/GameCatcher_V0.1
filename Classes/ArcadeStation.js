import {runGame, winPlatformerLevel1} from "../platformerGame/js/platformerMain.js";

export class ArcadeStation {
    constructor(fighters, map) {
        this.fighters = fighters;
        this.map = map
    }

    menuRunNewGame(fighterId) {
        this.map.isPaused = true

        switch (fighterId) {
            case "s001":
                this.runPlatformer()
                break;
        }
    }

    runPlatformer() {
        runGame(true)
    }
}