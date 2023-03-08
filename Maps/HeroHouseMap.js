import {utils} from "../utils.js"

export const HeroHouseMap = {
    id: "HeroHouseMap",
    lowerSrc: "/img/cartes/heroHouse.png",
    upperSrc: "/img/cartes/heroHouseUpper.png",
    configObjects: {
        hero: {
            type: "Person",
            src:"/img/personnages/personnes/me.png",
            isPlayerControlled: true,
            x: utils.withGrid(6),
            y: utils.withGrid(8),
            direction: "up",
            useShadow: true
        },
        kitchen: {
            type: "Person",
            src: "",
            x: utils.withGrid(4),
            y: utils.withGrid(2),
            talking: [
                {
                    events: [
                        {type: "textMessage", text: "La cuisine de Pseudo.", who: "Info"}
                    ]
                }
            ]
        }
    },

    cutsceneSpaces: {
        [utils.asGridCoord(10,13)] : [
            {
                events: [
                    {
                        type: "changeMap",
                        map: "CvMap",
                        x: utils.withGrid(18),
                        y: utils.withGrid(20),
                        direction: "down"
                    },
                ],
                [utils.asGridCoord(3,2)]: [
                    {

                    }

                ]
            }
        ]
    },

    walls: {
        //Upper walls
        [utils.asGridCoord(1, 0)] : true,
        [utils.asGridCoord(2, 0)] : true,
        [utils.asGridCoord(3, 0)] : true,
        [utils.asGridCoord(4, 0)] : true,
        [utils.asGridCoord(5, 0)] : true,
        [utils.asGridCoord(6, 0)] : true,
        [utils.asGridCoord(7, 0)] : true,
        [utils.asGridCoord(8, 0)] : true,
        [utils.asGridCoord(9, 0)] : true,
        [utils.asGridCoord(10, 0)] : true,
        [utils.asGridCoord(11, 0)] : true,
        [utils.asGridCoord(12, 0)] : true,

        //Left walls
        [utils.asGridCoord(1, 0)] : true,
        [utils.asGridCoord(1, 1)] : true,
        [utils.asGridCoord(1, 2)] : true,
        [utils.asGridCoord(1, 3)] : true,
        [utils.asGridCoord(1, 4)] : true,
        [utils.asGridCoord(1, 5)] : true,
        [utils.asGridCoord(1, 6)] : true,
        [utils.asGridCoord(1, 7)] : true,
        [utils.asGridCoord(1, 8)] : true,
        [utils.asGridCoord(1, 9)] : true,
        [utils.asGridCoord(1, 10)] : true,
        [utils.asGridCoord(1, 11)] : true,
        [utils.asGridCoord(1, 12)] : true,

        //Down walls with door
        [utils.asGridCoord(2, 12)] : true,
        [utils.asGridCoord(3, 12)] : true,
        [utils.asGridCoord(4, 12)] : true,
        [utils.asGridCoord(5, 12)] : true,
        [utils.asGridCoord(6, 12)] : true,
        [utils.asGridCoord(7, 12)] : true,
        [utils.asGridCoord(8, 12)] : true,
        [utils.asGridCoord(9, 12)] : true,
        [utils.asGridCoord(11, 12)] : true,
        [utils.asGridCoord(9, 13)] : true,
        [utils.asGridCoord(11, 13)] : true,
        [utils.asGridCoord(10, 14)] : true,

        //Right wall
        [utils.asGridCoord(12, 11)] : true,
        [utils.asGridCoord(12, 10)] : true,
        [utils.asGridCoord(12, 9)] : true,
        [utils.asGridCoord(12, 8)] : true,
        [utils.asGridCoord(12, 7)] : true,
        [utils.asGridCoord(12, 6)] : true,
        [utils.asGridCoord(12, 5)] : true,
        [utils.asGridCoord(12, 4)] : true,
        [utils.asGridCoord(12, 3)] : true,
        [utils.asGridCoord(12, 2)] : true,
        [utils.asGridCoord(12, 1)] : true,

        //Decoration
        [utils.asGridCoord(3, 10)] : true,
        [utils.asGridCoord(7, 9)] : true,
        [utils.asGridCoord(8, 9)] : true,
        [utils.asGridCoord(9, 9)] : true,
        [utils.asGridCoord(5, 8)] : true,
        [utils.asGridCoord(7, 8)] : true,
        [utils.asGridCoord(8, 8)] : true,
        [utils.asGridCoord(9, 8)] : true,
        [utils.asGridCoord(3, 8)] : true,
        [utils.asGridCoord(3, 6)] : true,
        [utils.asGridCoord(2, 4)] : true,
        [utils.asGridCoord(3, 5)] : true,
        [utils.asGridCoord(4, 5)] : true,
        [utils.asGridCoord(5, 5)] : true,
        [utils.asGridCoord(8, 5)] : true,
        [utils.asGridCoord(9, 5)] : true,
        [utils.asGridCoord(10, 5)] : true,
        [utils.asGridCoord(11, 4)] : true,
        [utils.asGridCoord(11, 2)] : true,
        [utils.asGridCoord(10, 2)] : true,
        [utils.asGridCoord(9, 1)] : true,
        [utils.asGridCoord(8, 2)] : true,
        [utils.asGridCoord(7, 2)] : true,
        [utils.asGridCoord(6, 2)] : true,
        [utils.asGridCoord(5, 2)] : true,
        [utils.asGridCoord(4, 2)] : true,
        [utils.asGridCoord(3, 2)] : true,
        [utils.asGridCoord(2, 1)] : true,
    }
}