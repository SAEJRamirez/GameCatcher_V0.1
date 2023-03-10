import {utils} from '../utils.js'

export const ArcadeShopMap = {
    id: "ArcadeShopMap",
    lowerSrc: "/img/cartes/ArcadeShopMap.png",
    upperSrc: "/img/cartes/ArcadeShopMapUpper.png",
    configObjects: {
        hero: {
            type: "Person",
            src: "/img/personnages/personnes/me.png",
            isPlayerControlled: true,
            x: utils.withGrid(10),
            y: utils.withGrid(12),
            direction: "up",
            useShadow: true
        },
        npcManager: {
            type: "Person",
            x: utils.withGrid(10),
            y: utils.withGrid(9),
            src: "/img/personnages/personnes/npc3.png",
            direction: "down"
        },
    }
}