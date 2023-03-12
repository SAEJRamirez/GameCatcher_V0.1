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
            useShadow: false
        },
        npcManager: {
            type: "Person",
            x: utils.withGrid(10),
            y: utils.withGrid(9),
            src: "/img/personnages/personnes/npc3.png",
            direction: "down",
            talking: [
                {
                    required: ["DEFEATED_ERIO"],
                    events: [
                        { type: "textMessage", text: "Suite HISTOIRE", who: "Patron"},
                    ]
                },
                {
                    required: ["LITTLE_RED_PLAYED"],
                    events: [
                        { type: "textMessage", text: "Le mec là-bas te regarde super chelou... parle-lui nan ? C'est hyper mal saint..." , who: "Patron"},
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
        npcBadGuy: {
            type: "Person",
            x: utils.withGrid(5),
            y: utils.withGrid(7),
            src: "/img/personnages/personnes/erio.png",
            direction: "right",
            talking: [
                {
                    required: ["DEFEATED_ERIO"],
                    events: [
                        { type: "textMessage", text: "Notre organisation est surpuissante ! On se vengera ! Jamais on vous rendra les jeux !", who: "DouxVoleur"},
                    ]
                },
                {

                    required: ["LITTLE_RED_PLAYED"],
                    events: [
                        { type: "textMessage", text: "Alors comme ça Monsieur essaie de récupérer tous les jeux hein ?", who: "DouxVoleur"},
                        { type: "textMessage", text: "Malheureusement pour toi mon petit, je vais pas pouvoir te laisser faire.", who: "DouxVoleur"},
                        { type: "textMessage", text: "Je vais te défoncer, mon lapin...", who: "DouxVoleur"},
                        { type: "battle", enemyId: "erio"},
                        { type: "addStoryFlag", flag: "DEFEATED_ERIO" },
                        { type: "textMessage", text: "Tu crois que tu vas t'en tirer comme ça ? Hahahaha !", who: "DouxVoleur"},
                        { type: "textMessage", text: "Notre organisation est surpuissante ! On se vengera ! Jamais on vous rendra les jeux !", who: "DouxVoleur"},
                    ]

                },
                {
                    events: [
                        { type: "textMessage", text: "Tu veux quoi ? Ta mère t'as jamais dit de pas parler aux inconnus ?", who: "Inconnu"},
                    ]
                }
            ],
        },
        arcadeStation: {
            type: "ArcadeStation",
            x: utils.withGrid(8),
            y: utils.withGrid(6),
            fighters: ["s001"],
            storyFlag: "LITTLE_RED_PLAYED",
            playable: "ARCADE_BOSS_CHAT1"
        }
    },

    walls: {
        //Upper walls
        [utils.asGridCoord(2, 6)] : true,
        [utils.asGridCoord(3, 6)] : true,
        [utils.asGridCoord(4, 6)] : true,
        [utils.asGridCoord(5, 6)] : true,
        [utils.asGridCoord(6, 6)] : true,
        [utils.asGridCoord(7, 6)] : true,
        [utils.asGridCoord(8, 6)] : true,
        [utils.asGridCoord(9, 6)] : true,
        [utils.asGridCoord(10, 6)] : true,
        [utils.asGridCoord(11, 6)] : true,

        //Left walls
        [utils.asGridCoord(1, 7)] : true,
        [utils.asGridCoord(1, 8)] : true,
        [utils.asGridCoord(1, 9)] : true,
        [utils.asGridCoord(1, 10)] : true,
        [utils.asGridCoord(1, 11)] : true,
        [utils.asGridCoord(1, 12)] : true,

        //Down walls with entry
        [utils.asGridCoord(2, 13)] : true,
        [utils.asGridCoord(3, 13)] : true,
        [utils.asGridCoord(4, 13)] : true,
        [utils.asGridCoord(5, 13)] : true,
        [utils.asGridCoord(6, 13)] : true,
        [utils.asGridCoord(7, 13)] : true,
        [utils.asGridCoord(8, 13)] : true,
        [utils.asGridCoord(9, 13)] : true,
        [utils.asGridCoord(11, 13)] : true,
        [utils.asGridCoord(10, 14)] : true,

        //Right walls
        [utils.asGridCoord(12, 7)] : true,
        [utils.asGridCoord(12, 8)] : true,
        [utils.asGridCoord(12, 9)] : true,
        [utils.asGridCoord(12, 10)] : true,
        [utils.asGridCoord(12, 11)] : true,
        [utils.asGridCoord(12, 12)] : true,

        //Deco
        [utils.asGridCoord(2, 8)] : true,
        [utils.asGridCoord(3, 8)] : true,
        [utils.asGridCoord(6, 9)] : true,
        [utils.asGridCoord(6, 10)] : true,
        [utils.asGridCoord(6, 11)] : true,
        [utils.asGridCoord(2, 11)] : true,
        [utils.asGridCoord(3, 11)] : true,

    }
}