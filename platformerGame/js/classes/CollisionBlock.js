import {ctx} from "../platformerMain.js";

export class CollisionBlock {
    constructor({position, height = 64, adjustPosition = 0}) {
        this.position = position;
        this.width = 64;
        this.height = height;
        this.adjustPosition = adjustPosition;
    }

    //Drawing method for sprite
    draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0)";
        ctx.fillRect(this.position.x, this.position.y + this.adjustPosition, this.width, this.height)
    }

    update() {
        this.draw();
    }
}