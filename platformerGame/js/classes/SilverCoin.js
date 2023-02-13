import {Sprite} from "./Sprite.js";
import {ctx} from "../platformerMain.js";

export class SilverCoin extends Sprite {
    constructor(
        {
            position,
            imageSrc = "../../img/ui/SilveCoin.png",
            frameRate= 12,
            scale = 0.5
        }
    )
    {
        super({imageSrc, frameRate, scale});

        this.position = position;
        this.width = 30;
        this.height = 30
        this.animation = {
            Turn: {
             imageSrc: "../../img/ui/SilveCoin.png",
             frameRate: 12,
             frameBuffer: 5
            }
        }

        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
            this.frameBuffer = this.animations[key].frameBuffer;
        }

    }

    update() {
        this.updateFrames()
        ctx.fillStyle = "rgba(255, 0, 0, 0)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.draw()
    }
}