import {cinematicScripts} from "../cinematicScripts/CinematicScripts.js";

export class Cinematic {

    constructor(map) {
        this.storyflags = window.playerState.storyFlags;
        this.map = map
    }


    runCinematic(mapId) {

        cinematicScripts.forEach(cinematic => {
            if (cinematic.id === mapId && !cinematic.done) {
                this.map.startCutscene(cinematic.script)
                cinematic.done = true
            }
        })
    }

}