import {Sprite} from "./Sprite.js";
import {ctx} from "../platformerMain.js";

export class EnemyVampBat extends Sprite {
    constructor(
        {
            position,
            velocity = {
                x: 1,
                y: 0.1
            },
            imageSrc = "../../img/enemies/vampBat/flyRight.png",
            frameRate = 20,
            scale = 0.3,
            distance
        }
    ) {
        super({imageSrc, frameRate, scale});

        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 50;
        this.distance = {
            limit: distance.limit,
            traveled: distance.traveled,
            direction: distance.direction
        }
        this.animations = {
            RunRight: {
                imageSrc: "../../img/enemies/vampBat/flyRight.png",
                frameRate: 20,
                frameBuffer: 2
            },
            RunLeft: {
                imageSrc: "../../img/enemies/vampBat/flyLeft.png",
                frameRate: 20,
                frameBuffer: 2
            },
        }
        this.type = "VampBat"

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

        this.distance.direction === "Left" ? this.position.x -= this.velocity.x : this.position.x += this.velocity.x;
        this.position.y -= this.velocity.y;
        this.distance.traveled += Math.abs(this.velocity.x);
        if (this.distance.traveled > this.distance.limit) {
            this.distance.traveled = 0;
            this.velocity.x = -this.velocity.x
            this.velocity.y = -this.velocity.y

        }
        if (this.distance.traveled > this.distance.limit * 0.2) {
            this.velocity.y = -this.velocity.y
        } else {
            this.velocity.y = +this.velocity.y
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

}