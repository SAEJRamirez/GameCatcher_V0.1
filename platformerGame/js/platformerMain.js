//Imports
import {renderCollisionBlocks} from "./tools/renderCollisionBlocks.js"
import {initPlatformer, camera, cameraBg, enemies, player, background, backgroundMap, deathSprites, scoreBoard} from "./initPlatformer.js";
import {killChoompy} from "./tools/killEnemies.js";
import {actualFps} from "../../initMain.js";
import {utils} from "../../utils.js";


//Canvas setup
export let canvas = null ;
export let ctx = null ;


//Variables
export let score = 0;
export let figtherPlatformerId = "";
let initialGameCatcherMap = null;
let reqAnimationFrame;


export function runGame(id, map) {
    canvas = document.querySelector('.next-game-canvas')
    ctx = canvas.getContext('2d')
    canvas.style.display = "flex"
    figtherPlatformerId = id;
    initialGameCatcherMap = map;
    initPlatformer();
    animate();
}

export const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
}

//Game loop
function animate() {
    //Request for loop animation
    reqAnimationFrame = window.requestAnimationFrame(animate);

    //Clear canvas every frames
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(cameraBg.position.x, 0)
    //Background update
    background.update();
    ctx.restore()

    ctx.save()
    ctx.translate(camera.position.x, 0)
    backgroundMap.update();
    //Call functions for set collisionBlocks
    renderCollisionBlocks();
    player.checkForHorizontalCanvasCollision();

    //Update player
    player.update();

    enemies.forEach((enemy) => {
        enemy.update()
    })
    deathSprites.forEach((death) => {
        death.update()
    })
    //Listen keys pressed
    player.velocity.x = 0;
    if (keys.d.pressed && !player.isDead) {
        player.switchSprite("Run");
        if (actualFps >= 59) {
            player.velocity.x = 8;
        } else if (actualFps <= 65) {
            player.velocity.x = 4;
        }

        player.lastDirection = "right"
        player.shouldPanCameraToTheLeft({canvas, camera, cameraBg})
    } else if (keys.a.pressed && !player.isDead) {
        player.switchSprite("RunLeft")
        if (actualFps >= 59) {
            player.velocity.x = -8;
        } else if (actualFps <= 65) {
            player.velocity.x = -4;
        }

        player.lastDirection = "left"
        player.shouldPanCameraToTheRight({camera, cameraBg})
    } else if (player.velocity.y === 0 && !player.isDead) {
        if (player.lastDirection === "right") {
            player.switchSprite("Idle")
        } else {
            player.switchSprite("IdleLeft")
        }
    }

    if (player.velocity.y < 0) {
        if (player.lastDirection === "right") {
            player.switchSprite("Jump")
        } else {
            player.switchSprite("JumpLeft")
        }
    } else if (player.velocity.y > 0) {
        if (player.lastDirection === "right")
            player.switchSprite("Fall")
        else {
            player.switchSprite("FallLeft")
        }
    }
    ctx.restore();

    //Check for death
    if (player.position.y > canvas.height) {
        initPlatformer();
    }

    //Check for win 12550
    if (player.position.x >= 1000 && scoreBoard.score >= 10) {
        window.cancelAnimationFrame(reqAnimationFrame)
        utils.endingGame(canvas, figtherPlatformerId)
        playerState.addFighter(figtherPlatformerId)
        initialGameCatcherMap.isPaused = false
        initialGameCatcherMap.overworld.startGameLoop();
    }

}


//Kill Player
export function playerDeath(key, index = 0, enemy = "") {
    if (key === "enemy" && player.isDead) {
        if (player.lastDirection === "right") {
            player.switchSprite("DieRight")
        } else {
            player.switchSprite("Die")
        }
        setTimeout(() => {
            killChoompy(enemy, index)
        }, 0)

        setTimeout(() => {
            player.isDead = false
            initPlatformer()
        }, 800)
    }
    if (key === "spikeDown" && player.isDead) {
        if (player.lastDirection === "right" && !player.animationEnd) {
            player.switchSprite("DieRight")
            setTimeout(() => {
                player.animationEnd = true
            }, 800)

        } else {
            player.switchSprite("Die")
            setTimeout(() => {
                player.animationEnd = true
            }, 800)
        }
        if (player.animationEnd) {
            player.animationEnd = false
            initPlatformer()
        }
    }

    if (key === "spikeUp" && player.isDead) {
        if (player.lastDirection === "right" && !player.animationEnd) {
            player.switchSprite("DieRight")
        } else {
            player.switchSprite("Die")
        }
        player.animationEnd = false
        initPlatformer()
    }
}

//Listeners
window.addEventListener('keydown', (e) => {
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
                if (actualFps <= 55) {
                    player.velocity.y = -10;

                } else {
                    player.velocity.y = -18.5;

                }
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