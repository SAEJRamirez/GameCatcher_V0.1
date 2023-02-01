export class Cinematic {

    constructor(map) {
        this.storyflags = window.playerState.storyFlags;
        this.map = map
    }


    runCinematic(mapId) {
        if (this.storyflags.Intro.complete === false && mapId === "DemoRoom") {
            this.map.startCutscene([
                {type: "textMessage", text: "Coucou les amis", who: "Narrator"},

            ])

            this.storyflags.Intro.complete = true;
        }
    }

}