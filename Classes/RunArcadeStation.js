import {runGame} from "../platformerGame/js/platformerMain.js";
import {audioGameCatcher} from "../audio/gameCatcher/audio.js";

export class RunArcadeStation {
    constructor(fighters, map) {
        this.fighters = fighters;
        this.map = map
    }

    menuRunNewGame(fighterId) {
        //this.map.isPaused = true

        switch (fighterId) {
            case "s001":
                this.runPlatformer(fighterId)
                break;
        }
    }

    runPlatformer(id) {
        this.map.isPaused = true;
        audioGameCatcher.mapMusic.stop()
        runGame(id, this.map)
    }
}