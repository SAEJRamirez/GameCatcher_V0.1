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
            direction: "down",
            talking: [
                {
                    required: ["LITTLE_RED_PLAYED"],
                    events: [
                        { type: "textMessage", text: "TEST", who: "Patron"},
                    ],

                },
                {
                    required: ["ARCADE_BOSS_CHAT1"],
                    events: [
                        { type: "textMessage", text: "Attendez ! Vous avez un jeu !? Génial ! Mettez le dans la borne d'arcade, vite !", who: "Patron"},

                    ]
                },
                {
                    events: [
                        { type: "textMessage", text: "Bonjour. Soit vous avez pas la télé, soit vous êtes débile...", who: "Patron"},
                        { type: "textMessage", text: "... il n'y a plus un seul jeu dans le monde et vous venez ici...", who: "Patron"},
                        { type: "textMessage", text: "Attendez ! Vous avez un jeu !? Génial ! Mettez le dans la borne d'arcade, vite !", who: "Patron"},
                        { type: "addStoryFlag", flag: "ARCADE_BOSS_CHAT1"}
                    ]
                }

            ]
        },
        arcadeStation: {
            type: "ArcadeStation",
            x: utils.withGrid(8),
            y: utils.withGrid(6),
            fighters: ["s001"],
            storyFlag: "LITTLE_RED_PLAYED",
            playable: "ARCADE_BOSS_CHAT1"
        }
    }
}