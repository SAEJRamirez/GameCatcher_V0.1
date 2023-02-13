//Imports
import {ctx, playerDeath, score} from "../platformerMain.js"
import {gravity} from "../initPlatformer.js";
import {
    collision,
    collisionSidesEnemy,
    objectDownCollision,
    objectUpCollision
} from "../tools/collisionUtils.js";
import {Sprite} from "./Sprite.js";
import {killChoompy, killChoompyMax, killVampBat} from "../tools/killEnemies.js";
import {scoreBoard} from "../initPlatformer.js";
import {coins} from "../initPlatformer.js";

//Player class
export class Player extends Sprite {
    constructor({
                    position,
                    groundCollisionBlocks,
                    platformDownCollisionBlocks,
                    platformUpCollisionBlocks,
                    spikeDownCollisionBlocks,
                    spikeUpCollisionBlocks,
                    enemies,
                    imageSrc,
                    frameRate,
                    scale = 0.95,
                    animations,
                    animationEnd = false,
                }) {
        super({imageSrc, frameRate, scale})
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.isJumping = false;
        this.isDead = false;
        this.groundCollisionBlocks = groundCollisionBlocks
        this.platformDownCollisionBlocks = platformDownCollisionBlocks
        this.platformUpCollisionBlocks = platformUpCollisionBlocks
        this.spikeDownCollisionBlocks = spikeDownCollisionBlocks
        this.spikeUpCollisionBlocks = spikeUpCollisionBlocks
        this.enemies = enemies;
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 0,
            height: 0
        }
        this.animations = animations
        this.animationEnd = animationEnd;
        this.lastDirection = "right";

        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
        }

        this.camerBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 200,
            height: 80
        }
        this.camerBoxBg = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 200,
            height: 80
        }
    }

    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return
        this.currentFrame = 0;
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    updateCamerabox() {
        this.camerBox = {
            position: {
                x: this.position.x - 375,
                y: this.position.y - 104
            },
            width: 850,
            height: 300
        }
        this.camerBoxBg = {
            position: {
                x: this.position.x - 375,
                y: this.position.y - 104
            },
            width: 850,
            height: 300
        }
    }

    checkForHorizontalCanvasCollision() {
        if (this.hitBox.position.x + this.hitBox.width + this.velocity.x >= 12800 ||
            this.hitBox.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        }
    }

    shouldPanCameraToTheLeft({canvas, camera, cameraBg}) {
        const cameraboxRightSide = this.camerBox.position.x + this.camerBox.width;

        if (cameraboxRightSide >= 12800) return
        if (cameraboxRightSide >= canvas.width + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
        if (this.camerBox.position.x >= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
            scoreBoard.position.x += this.velocity.x
            cameraBg.position.x -= 0.2
        }
    }

    shouldPanCameraToTheRight({camera, cameraBg}) {
        if (this.camerBox.position.x <= 0) return
        if (this.camerBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
            scoreBoard.position.x += this.velocity.x
            cameraBg.position.x += 0.2
        }
    }

    //Update method for player
    update() {
        this.updateFrames();
        this.updateHitbox();
        this.updateCamerabox();
        //Player Camera
        ctx.fillStyle = "rgba(0, 0, 255, 0)"
        ctx.fillRect(this.camerBox.position.x, this.camerBox.position.y, this.camerBox.width, this.camerBox.height)
        //Player Image
        ctx.fillStyle = "rgba(0, 255, 0, 0)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        //Player Hitbox
        ctx.fillStyle = "rgba(255, 0, 0, 0)"
        ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)

        this.draw();

        //Mouvements
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();
        scoreBoard.update();

    }

    updateHitbox() {
        this.hitBox = {
            position: {
                x: this.position.x + 38,
                y: this.position.y + 18,
            },
            width: 23,
            height: 59
        }
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.groundCollisionBlocks.length; i++) {
            const collisionBlock = this.groundCollisionBlocks[i];

            if (collision({object1: this.hitBox, object2: collisionBlock})) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitBox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }


    checkForVerticalCollision() {
        //Ground collision blocks
        for (let i = 0; i < this.groundCollisionBlocks.length; i++) {
            this.isJumping = false;
            const collisionBlock = this.groundCollisionBlocks[i];
            if (collision({object1: this.hitBox, object2: collisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }

        //Platform DOWN collision blocks
        for (let i = 0; i < this.platformDownCollisionBlocks.length; i++) {
            const platformDownCollisionBlock = this.platformDownCollisionBlocks[i];

            if (objectDownCollision({object1: this.hitBox, object2: platformDownCollisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = (platformDownCollisionBlock.position.y + platformDownCollisionBlock.adjustPosition) - offset - 0.01;
                    break;
                }
            }
        }

        //Platform UP collision blocksUp
        for (let i = 0; i < this.platformUpCollisionBlocks.length; i++) {
            const platformUpCollisionBlock = this.platformUpCollisionBlocks[i];

            if (objectUpCollision({object1: this.hitBox, object2: platformUpCollisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = (platformUpCollisionBlock.position.y + platformUpCollisionBlock.adjustPosition) - offset - 0.01;
                    break;
                }
            }
        }

        //Spike DOWN collision blocksUp
        for (let i = 0; i < this.spikeDownCollisionBlocks.length; i++) {
            const spikeDownCollisionBlock = this.spikeDownCollisionBlocks[i];

            if (objectDownCollision({object1: this.hitBox, object2: spikeDownCollisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = (spikeDownCollisionBlock.position.y + spikeDownCollisionBlock.adjustPosition) - offset - 0.01;
                    this.isDead = true
                    playerDeath("spikeDown")
                    this.animationEnd = false
                    break
                }
            }
        }

        //Spike UP collision blocksUp
        for (let i = 0; i < this.spikeUpCollisionBlocks.length; i++) {
            const spikeUpCollisionBlock = this.spikeUpCollisionBlocks[i];

            if (collision({object1: this.hitBox, object2: spikeUpCollisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.isDead = true
                    playerDeath("spikeUp")
                    break;
                }
            }
        }

        //Collision with enemies
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            if (objectUpCollision({object1: this.hitBox, object2: enemy})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = -12;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = enemy.position.y - offset - 0.01;

                    if (enemy.type === "ChoompyMax") {
                        killChoompyMax(enemy, i)
                        break;
                    } else if (enemy.type === "Choompy") {
                        killChoompy(enemy, i)
                        break;
                    } else if (enemy.type === "VampBat") {
                        killVampBat(enemy, i)
                    }
                }
            } else if (collisionSidesEnemy({object1: this.hitBox, object2: enemy})) {
                this.isDead = true
                playerDeath("enemy", i, enemy)
                break;
            }
        }

        //Collision with Coin
        for (let i = 0; i < coins.length; i ++) {
            const coin = coins[i];
            if (collisionSidesEnemy({object1: this.hitBox, object2: coin})) {
                coins.splice(i, 1);
                scoreBoard.score +=10
            }
        }
    }
}