import {utils} from "../utils.js"
import {audioGameCatcher} from "../audio/gameCatcher/audio.js";

export const CinematicIntroTv = {
    id: "CinematicIntroTv",
    lowerSrc: "/img/cartes/HeroHouseMap.png",
    upperSrc: "/img/cartes/HeroHouseUpper.png",
    music: audioGameCatcher.intro1,
    configObjects: {
        hero: {
            type: "Person",
            src: "/img/personnages/personnes/me.png",
            isPlayerControlled: false,
            x: utils.withGrid(4),
            y: utils.withGrid(10),
            direction: "up",
            useShadow: true
        },
    },
}