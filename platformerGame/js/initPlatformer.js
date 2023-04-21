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
import {keys} from "./platformerMain.js";
import {spawnCoins} from "./spawns/spawnCoins.js";
import {audioPlatformer} from "../../audio/platformer/audio.js";


export let player;
export let backgroundMap;
export let background;
export let endHouseMap;
export let camera;
export let cameraBg;
export let enemies;
export let coins;
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
        coins,
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
                frameBuffer: 3,
            },
            DieRight: {
                imageSrc: "../../img/Hero/dieRight.png",
                frameRate: 21,
                frameBuffer: 3,
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

function initEndHouse() {
    endHouseMap = new Sprite({
        position: {
            x: 12500,
            y: 95
        },
        imageSrc: "../../img/ui/endHouse.png",
        scale: 0.4
    })
}

export function initPlatformer() {
    gravity = 0.7
    enemies = [];
    coins = [];
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

    window.addEventListener('keydown', (e) => {
        console.log(e.key)
        switch (e.key) {
            case "d":
                keys.d.pressed = true
                break;
            case "a":
                keys.a.pressed = true
                break;
            case "w":
                if (!player.isJumping && player.velocity.y === 0 && !player.isDead) {
                    player.isJumping = true
                    audioPlatformer.jump.play()
                    player.velocity.y = -16.5;
                }
                break
            case " ":
                if (!player.isJumping && player.velocity.y === 0 && !player.isDead) {
                    player.isJumping = true
                    audioPlatformer.jump.play()
                    player.velocity.y = -16.5;
                }
                break;
        }
    })
    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case "d":
                keys.d.pressed = false
                break;
            case "a":
                keys.a.pressed = false
                break;
        }
    })

    initPlayer();
    spawnEnemies();
    spawnCoins();
    initEndHouse();
    initBackground();

}