import {utils} from "../utils.js"

export const CinematicIntroStreamer = {
    id: "CinematicIntroStreamer",
    lowerSrc: "/img/cartes/HeroHouseMap.png",
    upperSrc: "/img/cartes/HeroHouseUpper.png",
    configObjects: {
        hero: {
            type: "Person",
            src: "/img/personnages/personnes/me.png",
            isPlayerControlled: false,
            x: utils.withGrid(3),
            y: utils.withGrid(3),
            direction: "up",
            useShadow: true,
            behaviorLoop: [
                //Cooking until knocking door
                { type: "walk", direction: "right" },
                { type: "walk", direction: "right" },
                {type: "stand", direction: "up", time: 2200},
                { type: "walk", direction: "left" },
                {type: "stand", direction: "up", time: 2500},
                { type: "walk", direction: "right" },
                { type: "walk", direction: "right" },
                { type: "walk", direction: "right" },
                { type: "walk", direction: "right" },

                //Go to living room
                { type: "walk", direction: "left" },
                { type: "walk", direction: "left" },
                { type: "walk", direction: "down" },
                { type: "walk", direction: "down" },
                { type: "walk", direction: "down" },
                { type: "walk", direction: "right" },
                {type: "stand", direction: "right", time: 2800},
                { type: "walk", direction: "left" },
                { type: "walk", direction: "down" },
                { type: "walk", direction: "down" },
                {type: "stand", direction: "right", time: 280000},


            ],
        },
        npcA: {
            type: "Person",
            x: utils.withGrid(9),
            y: utils.withGrid(13),
            src: "/img/personnages/personnes/npc3.png",
            behaviorLoop: [
                { type: "stand", direction: "up", time: 5500 },
                { type: "walk", direction: "up" },
                { type: "walk", direction: "up" },
                { type: "walk", direction: "right" },
                { type: "walk", direction: "up" },
                { type: "walk", direction: "up" },
                { type: "walk", direction: "up" },
                { type: "walk", direction: "up" },
                { type: "walk", direction: "up" },
                { type: "walk", direction: "left" },
                {type: "stand", direction: "left", time: 2000},
                {type: "walk", direction: "right"},
                {type: "walk", direction: "right"},
                {type: "walk", direction: "down"},
                {type: "walk", direction: "down"},
                {type: "walk", direction: "down"},
                {type: "walk", direction: "down"},
                {type: "walk", direction: "down"},
                {type: "walk", direction: "left"},
                {type: "walk", direction: "down"},
                {type: "walk", direction: "down"},
                {type: "stand", direction: "down", time: 50000},
            ],

            talking: [
                {
                    events: [
                        { type: "textMessage", text: "Toc toc toc...", faceHero: "hero", who: "Porte" },
                    ]
                }
            ]
        },
    },

    cutsceneSpaces: {
        [utils.asGridCoord(8,3)]: [
            {
                events: [
                    { type: "textMessage", text: "Toc toc toc...", who:"Porte" },
                ]
            }
        ],
        [utils.asGridCoord(7,6)]: [
            {
                events: [
                    { type: "textMessage", text: "Je te cherchais Pseudo...", who:"Ztreamer mystère" },
                    { type: "textMessage", text: "Tu étais le meilleur gamer d'entre nous à l'époque...", who:"Ztreamer mystère" },
                    { type: "textMessage", text: "Il faut que tu retrouve les jeux... on fait plus de stream Bro. On a perdu l'argent des abonnés !", who:"Ztreamer mystère" },
                    { type: "textMessage", text: "J'ai trouvé une cartouche de jeu avec le dernier survivant. Il faut que tu la plug dans une console.", who:"Ztreamer mystère" },
                    { type: "textMessage", text: "Vous avez reçu la cartouche Multigaming", who:"Info" },
                    { type: "textMessage", text: "Joue à ce jeu, débloque le perso et combat les enfoirés qui ont volé nos jeux...", who:"Ztreamer mystère" },
                    { type: "textMessage", text: "... il en va de notre santé mentale et financière à tous. Tu es l'élu Pseudo, ne me déçois pas !", who:"Ztreamer mystère" },
                    { type: "textMessage", text: "Rend toi au nord de la ville, tu y trouvera une console de jeu. Mais fais gaffe, ces connards sont partout...", who:"Ztreamer mystère" },
                    { type: "textMessage", text: "On se reverra bientôt Pseudo, fais en sorte que je sois fier de toi. Pour le jeu ! Pour l'argent ! I'll be back !", who:"Ztreamer mystère" },
                ]
            }
        ],
        [utils.asGridCoord(6,8)] : [
            {
                events: [
                    {
                        type: "changeMap",
                        map: "HeroHouseMap",
                        x: utils.withGrid(6),
                        y: utils.withGrid(8),
                        direction: "down"
                    },
                ]
            }
        ]
    },
}