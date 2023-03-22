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
    endHouseMap,
    deathSprites,
    scoreBoard,
    coins
} from "./initPlatformer.js";
import {killChoompy} from "./tools/killEnemies.js";
import {actualFps} from "../../initMain.js";
import {utils} from "../../utils.js";
import {audioPlatformer} from "../../audio/platformer/audio.js";
import {audioGameCatcher} from "../../audio/gameCatcher/audio.js";


//Canvas setup
export let canvas = null ;
export let ctx = null ;


//Variables
export let score = 0;
export let figtherPlatformerId = "";
let initialGameCatcherMap = null;
let reqAnimationFrame;
let menuModal = document.querySelector('.menu-end-game')
let menuModalTitle = document.getElementById('end-game-title')
let menuModalText = document.getElementById('end-game-text')
let soundPlayed = false


export function runGame(id, map) {

    canvas = document.querySelector('.next-game-canvas')
    document.querySelector('.next-game-container').style.display = "flex";
    ctx = canvas.getContext('2d')
    figtherPlatformerId = id;
    initialGameCatcherMap = map;
    audioPlatformer.mapMusic.play()
    audioPlatformer.mapMusic.volume(0.1)
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
    endHouseMap.update()
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
        if (actualFps >= 57) {
            player.velocity.x = 8;
        } else if (actualFps <= 65) {
            player.velocity.x = 4;
        }

        player.lastDirection = "right"
        player.shouldPanCameraToTheLeft({canvas, camera, cameraBg})
    } else if (keys.a.pressed && !player.isDead) {
        player.switchSprite("RunLeft")
        if (actualFps >= 57) {
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
        audioPlatformer.playerDeath.play()
        initPlatformer();
    }

    //Check for win 12550
    if (player.position.x >= 12550 && scoreBoard.score >= 301) {
        gameWin()
    } else if(player.position.x >= 12550 && scoreBoard.score <= 300) {
       gameOver()
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
            }, 1200)

        } else {
            player.switchSprite("Die")
            setTimeout(() => {
                player.animationEnd = true
            }, 1200)
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

function gameOver() {
    if (!soundPlayed) {
        audioPlatformer.loose.play()
    }
    soundPlayed = true
    player.isDead = true
    player.switchSprite("Idle")
    createModal("loose")

}

function gameWin() {
    if (!soundPlayed) {
        audioPlatformer.victory.play()
    }
    soundPlayed = true
    player.isDead = true
    player.switchSprite("Idle")
    createModal("win")
}

function createModal(state) {
    if (state === "loose") {
        menuModal.style.display = 'flex'
        menuModalTitle.textContent = 'Vous êtes si nul !'
        menuModalText.textContent = "Les pièces dispersées dans le niveau ne sont pas là pour faire joli... Les ennemis non plus d'ailleurs ! Le score semble être un bon indice de ce qu'il faut faire non ?"
        let btn = document.getElementById('end-game-restart')
        btn.textContent = "Recommencer"
        btn.onclick = () => {
            player.isDead = false
            initPlatformer()
            menuModal.style.display = "none"
            soundPlayed = false
        }
    }

    if (state === "win") {
        menuModal.style.display = 'flex'
        menuModalTitle.textContent = 'Vous êtes puissant !'
        menuModalText.textContent = "Félicitations ! Vous avez vaincus les vils champignons et autres créatures volantes. Vous avez même ramené le fric ! On aime les aventuriers comme vous ici."
        let btn = document.getElementById('end-game-restart')
        btn.textContent = "Quitter"
        btn.onclick = () => {
            player.isDead = true
            menuModal.style.display = "none"
            window.cancelAnimationFrame(reqAnimationFrame)
            utils.endingGame(canvas, figtherPlatformerId)
            playerState.addFighter(figtherPlatformerId)
            initialGameCatcherMap.isPaused = false
            initialGameCatcherMap.overworld.startGameLoop();
            audioPlatformer.mapMusic.stop()
            audioGameCatcher.introStreamer.play()
            soundPlayed = false
        }
    }

}


