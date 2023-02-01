import {Player} from "./classes/Player.js";
import {
    groundCollisionBlocks,
    platformDownCollisionBlocks,
    platformUpCollisionBlocks,
    spikeDownCollisionBlocks, spikeUpCollisionBlocks
} from "./tools/utils.js";
import {Sprite} from "./classes/Sprite.js";
import {spawnEnemies} from "./spawns/spawnEnemies.js";
import {ScoreBoard} from "./classes/ScoreBoard.js";
import {actualFps} from "../../initMain.js";


export let player;
export let backgroundMap;
export let background;
export let camera;
export let cameraBg;
export let enemies;
export let deathSprites;
export let scoreBoard;
export let gravity = 0;

function initPlayer() {
    player = new Player({
        position: {
            x: 0,
            y: 250
        },
        groundCollisionBlocks,
        platformDownCollisionBlocks,
        platformUpCollisionBlocks,
        spikeDownCollisionBlocks,
        spikeUpCollisionBlocks,
        enemies,
        imageSrc: "../../img/Hero/Idle_right2.png",
        frameRate: 18,
        animationEnd : false,
        animations: {
            Idle: {
                imageSrc: "../../img/Hero/Idle_right2.png",
                frameRate: 18,
                frameBuffer: 2
            },
            IdleLeft: {
                imageSrc: "../../img/Hero/Idle_left2.png",
                frameRate: 18,
                frameBuffer: 2
            },
            Run: {
                imageSrc: "../../img/Hero/run_right2.png",
                frameRate: 12,
                frameBuffer: 3
            },
            RunLeft: {
                imageSrc: "../../img/Hero/run_left2.png",
                frameRate: 12,
                frameBuffer: 3
            },
            Jump: {
                imageSrc: "../../img/Hero/jumpRight.png",
                frameRate: 6,
                frameBuffer: 4
            },
            JumpLeft: {
                imageSrc: "../../img/Hero/jumpLeft.png",
                frameRate: 6,
                frameBuffer: 4
            },
            Fall: {
                imageSrc: "../../img/Hero/fallingRight.png",
                frameRate: 6,
                frameBuffer: 5
            },
            FallLeft: {
                imageSrc: "../../img/Hero/fallingLeft.png",
                frameRate: 6,
                frameBuffer: 5
            },
            Die: {
                imageSrc: "../../img/Hero/dieLeft.png",
                frameRate: 21,
                frameBuffer: 1
            },
            DieRight: {
                imageSrc: "../../img/Hero/dieRight.png",
                frameRate: 21,
                frameBuffer: 1
            }
        },
    });
}

function initBackground() {
    backgroundMap = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: "../../img/Level1Map.png"
    })

    background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: "../../img/Level1MapBackground2.png"
    })

    scoreBoard = new ScoreBoard(0)
}

export function initPlatformer() {

    if (actualFps >= 56) {
        gravity = 1
    } else if (actualFps <= 55) {
        gravity = 0.3
    }

    enemies = [];
    deathSprites = [];
    camera = {
        position: {
            x: 0,
            y: 0
        }
    };
    cameraBg = {
        position: {
            x: 0,
            y: 0
        }
    };

    initPlayer();
    spawnEnemies();
    initBackground();
}