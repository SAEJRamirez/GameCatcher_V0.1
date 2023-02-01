import {Sprite} from "./Sprite.js";
import {ctx} from "../platformerMain.js";
import {gravity} from "../init.js";
import {collision, objectDownCollision} from "../tools/collisionUtils.js";
import {groundCollisionBlocks, platformDownCollisionBlocks} from "../tools/utils.js";

export class EnemyChoompy extends Sprite {
    constructor(
        {
            position,
            imageSrc = "../../img/enemies/choompy/walkLeft.png",
            frameRate = 20,
            scale = 0.2,
            distance
        }
    ) {
        super({imageSrc, frameRate, scale});

        this.position = position;
        this.velocity = {
            x: 1,
            y: 0
        };
        this.width = 50;
        this.height = 50;
        this.groundCollisionBlocks = groundCollisionBlocks
        this.platformDownCollisionBlocks = platformDownCollisionBlocks
        this.distance = {
            limit: distance.limit,
            traveled: distance.traveled,
            direction: distance.direction
        }
        this.animations = {
            RunRight: {
                imageSrc: "../../img/enemies/choompy/walkRight.png",
                    frameRate: 18,
                    frameBuffer: 2
            },
            RunLeft: {
                imageSrc: "../../img/enemies/choompy/walkLeft.png",
                    frameRate: 18,
                    frameBuffer: 2
            },
        },
        this.type = "Choompy";


        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
            this.frameBuffer = this.animations[key].frameBuffer;
        }
    }

    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded ) return
        this.currentFrame = 0;
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    update() {
        this.updateFrames()
        ctx.fillStyle = "rgba(255, 0, 0, 0)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.draw()
        this.applyGravity();
        this.checkForCollision();

        this.distance.direction === "Left" ? this.position.x -= this.velocity.x : this.position.x += this.velocity.x;
        this.distance.traveled += Math.abs(this.velocity.x);
        if (this.distance.traveled > this.distance.limit) {
            this.distance.traveled = 0;
            this.velocity.x = -this.velocity.x
        }

        if (this.distance.direction === "Right") {
            if (this.velocity.x < 0) {
                this.switchSprite("RunLeft")
            }
            else {
                this.switchSprite("RunRight")
            }
        } else if (this.distance.direction === "Left") {
            if (this.velocity.x < 0) {
                this.switchSprite("RunRight")
            }
            else {
                this.switchSprite("RunLeft")
            }
        }

    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    checkForCollision() {
        //Ground collision
        for (let i = 0; i < this.groundCollisionBlocks.length; i++) {
            const collisionBlock = this.groundCollisionBlocks[i];

            if(collision({object1: this, object2: collisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }
            }
        }

        //platform top collision
        for (let i = 0; i < this.platformDownCollisionBlocks.length; i++) {
            const platformDownCollisionBlock = this.platformDownCollisionBlocks[i];

            if(objectDownCollision({object1: this, object2: platformDownCollisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.position.y - this.position.y + this.height
                    this.position.y = (platformDownCollisionBlock.position.y + platformDownCollisionBlock.adjustPosition) - offset - 0.01;
                    break;
                }
            }
        }

    }
}