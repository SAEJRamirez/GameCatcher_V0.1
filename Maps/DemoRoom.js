import {utils} from "../utils.js";

export const DemoRoom = {
    id: "DemoRoom",
    lowerSrc: "/img/cartes/DemoRoomLower.png",
    upperSrc: "/img/cartes/DemoRoomUpper.png",
    configObjects: {
        hero: {
            type: "Person",
            isPlayerControlled: true,
            x: utils.withGrid(7),
            y: utils.withGrid(7)
        },
        npcA: {
            type: "Person",
            x: utils.withGrid(7),
            y: utils.withGrid(9),
            src: "/img/personnages/personnes/npc3.png",

            talking: [
                {
                    required: ["Intro"],
                    events: [
                        { type: "textMessage", text: "Je vais te défoncer", who:"Beth" },
                        { type: "battle", enemyId: "beth"},
                        { type: "addStoryFlag", flag: "DEFEATED_BETH" },
                        { type: "textMessage", text: "Tu m'as défoncé", who:"Beth"},
                        { type: "textMessage", text: "Dégage, vilain !", who:"Beth"}
                    ]
                }
            ],
        },
        craftingStone: {
            type: "CraftingStone",
            x: utils.withGrid(9),
            y: utils.withGrid(8),
            fighters: ["s001"]
        }

    },
    cutsceneSpaces: {
        [utils.asGridCoord(7, 3)]: [
            {
                events: [
                    {
                        type: "changeMap",
                        map: "CvMap",
                        x: utils.withGrid(18),
                        y: utils.withGrid(20),
                        direction: "down"
                    },
                ]
            }
        ],
    },

    walls: {
        //Upper walls with door
        [utils.asGridCoord(1, 3)] : true,
        [utils.asGridCoord(2, 3)] : true,
        [utils.asGridCoord(3, 3)] : true,
        [utils.asGridCoord(4, 3)] : true,
        [utils.asGridCoord(5, 3)] : true,
        [utils.asGridCoord(6, 3)] : true,
        [utils.asGridCoord(9, 3)] : true,
        [utils.asGridCoord(10, 3)] : true,
        [utils.asGridCoord(6, 4)] : true,
        [utils.asGridCoord(6, 2)] : true,
        [utils.asGridCoord(6, 1)] : true,
        [utils.asGridCoord(7, 1)] : true,
        [utils.asGridCoord(8, 1)] : true,
        [utils.asGridCoord(8, 2)] : true,
        [utils.asGridCoord(8, 3)] : true,
        [utils.asGridCoord(8, 4)] : true,

        //Left walls
        [utils.asGridCoord(0, 4)] : true,
        [utils.asGridCoord(0, 5)] : true,
        [utils.asGridCoord(0, 6)] : true,
        [utils.asGridCoord(0, 7)] : true,
        [utils.asGridCoord(0, 8)] : true,
        [utils.asGridCoord(0, 9)] : true,

        //Down walls with entry
        [utils.asGridCoord(1, 10)] : true,
        [utils.asGridCoord(2, 10)] : true,
        [utils.asGridCoord(3, 10)] : true,
        [utils.asGridCoord(4, 10)] : true,
        [utils.asGridCoord(5, 11)] : true,
        [utils.asGridCoord(6, 10)] : true,
        [utils.asGridCoord(7, 10)] : true,
        [utils.asGridCoord(8, 10)] : true,
        [utils.asGridCoord(9, 10)] : true,
        [utils.asGridCoord(10, 10)] : true,

        //Right walls
        [utils.asGridCoord(11, 9)] : true,
        [utils.asGridCoord(11, 8)] : true,
        [utils.asGridCoord(11, 7)] : true,
        [utils.asGridCoord(11, 6)] : true,
        [utils.asGridCoord(11, 5)] : true,
        [utils.asGridCoord(11, 4)] : true,

        //Decoration
        [utils.asGridCoord(1, 5)] : true,
        [utils.asGridCoord(2, 5)] : true,
        [utils.asGridCoord(3, 5)] : true,
        [utils.asGridCoord(5, 5)] : true,
        [utils.asGridCoord(5, 6)] : true,
        [utils.asGridCoord(5, 7)] : true,
        [utils.asGridCoord(5, 8)] : true,
        [utils.asGridCoord(4, 6)] : true,
        [utils.asGridCoord(4, 7)] : true,
        [utils.asGridCoord(4, 8)] : true,
        [utils.asGridCoord(4, 8)] : true,
        [utils.asGridCoord(1, 9)] : true,
    }
}