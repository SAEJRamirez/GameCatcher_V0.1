//Imports
import {renderCollisionBlocks} from "./tools/renderCollisionBlocks.js"
import {init, camera, cameraBg, enemies, player, background, backgroundMap, deathSprites, scoreBoard} from "./init.js";
import {killChoompy} from "./tools/killEnemies.js";


//Canvas setup
export let canvas = null ;
export let ctx = null ;
//canvas.width = 1024;
//canvas.height = 576;

//Variables
export let actualFps = 0;
export let setTest = false;
let messageFps = document.getElementById('message');
export let score = 0;
export let winPlatformerLevel1 = false;

//Test FPS
/*function testFps() {
    let prevTime = Date.now(),
        frames = 0;

    requestAnimationFrame(function loop() {
        const time = Date.now();
        frames++;
        if (time > prevTime + 1000) {
            let fps = Math.round((frames * 1000))
            prevTime = time;
            frames = 0;
            actualFps = fps / 1000;
            console.log(fps / 1000)
            messageFps.textContent = `Testing your FPS... Please wait... (${fps / 1000})`
        }
        if (!setTest) {
            requestAnimationFrame(loop)
        }

    })
}*/
export function runGame(trigger) {
    if (trigger === true) {
        canvas = document.querySelector('.next-game-canvas')
        ctx = canvas.getContext('2d')
        canvas.style.display = "flex"
        //setTest = true
        //console.log(actualFps)
        //messageFps.remove()
        //Fire up game
        init();
        animate();
    }
}


//testFps();
/*setTimeout(() => {
    setTest = true
    console.log(actualFps)
    messageFps.remove()
    //Fire up game
    init();
    animate();
}, 2000)*/


//Const, variables
export let gravity;
if (actualFps <= 59) {
    gravity = 1
} else if (actualFps >= 65) {
    gravity = 0.3
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
    window.requestAnimationFrame(animate);

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
        init();
    }

    //Check for win
    if (player.position.x >= 12550 && scoreBoard.score >= 130) {
        console.log("WIIIIIN")
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
            init()
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
            init()
        }
    }

    if (key === "spikeUp" && player.isDead) {
        if (player.lastDirection === "right" && !player.animationEnd) {
            player.switchSprite("DieRight")
        } else {
            player.switchSprite("Die")
        }
        player.animationEnd = false
        init()

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
            if (!player.isJumping && player.velocity.y === 0 && !player.isDead && actualFps >= 59) {
                player.isJumping = true
                player.velocity.y = -18.5;
            } else if (player.isJumping && player.velocity.y === 0 && !player.isDead && actualFps <= 65) {
                player.isJumping = true
                player.velocity.y = -10;
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