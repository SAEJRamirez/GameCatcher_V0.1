//Imports
import {renderCollisionBlocks} from "./tools/renderCollisionBlocks.js"
import {
    initPlatformer,
    camera,
    cameraBg,
    enemies,
    player,
    background,
    backgroundMap,
    deathSprites,
    scoreBoard,
    coins
} from "./initPlatformer.js";
import {killChoompy} from "./tools/killEnemies.js";
import {actualFps} from "../../initMain.js";
import {utils} from "../../utils.js";
import {audioPlatformer} from "../../audio/platformer/audio.js";


//Canvas setup
export let canvas = null ;
export let ctx = null ;


//Variables
export let score = 0;
export let figtherPlatformerId = "";
let initialGameCatcherMap = null;
let reqAnimationFrame;
let menuModal = document.querySelector('.menu-end-game')


export function runGame(id, map) {

    canvas = document.querySelector('.next-game-canvas')
    document.querySelector('.next-game-container').style.display = "flex";
    ctx = canvas.getContext('2d')
    figtherPlatformerId = id;
    initialGameCatcherMap = map;
    audioPlatformer.mapMusic.play()
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

    coins.forEach((coin) => {
        coin.update()
    })
    enemies.forEach((enemy) => {
        enemy.update()
    })

    //Update player
    player.update();

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
    if (player.position.x >= 1000 && scoreBoard.score >= 20) {
        window.cancelAnimationFrame(reqAnimationFrame)
        utils.endingGame(canvas, figtherPlatformerId)
        playerState.addFighter(figtherPlatformerId)
        initialGameCatcherMap.isPaused = false
        initialGameCatcherMap.overworld.startGameLoop();
        audioPlatformer.mapMusic.stop()
    } else if(player.position.x >= 1300 && scoreBoard.score <= 10) {
        player.isDead = true
        player.switchSprite("Idle")
        menuModal.style.display = 'flex'
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

document.getElementById('end-game-restart').addEventListener('click', () => {
    player.isDead = false
    initPlatformer()
    menuModal.style.display = "none"
})
