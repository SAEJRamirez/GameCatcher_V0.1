import {ctx} from "../platformerMain.js";


export class ScoreBoard {
    constructor(score = 0) {
        this.score = score
        this.position = {
            x: 930,
            y: 20
        }
        //this.pScore = document.getElementById('score')
        //this.pScoreToReach = document.getElementById('scoreToReach')

    }
    draw() {
        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`Score: ${this.score}`, this.position.x, this.position.y)
    }

    /*draw2() {
        this.pScore.textContent = `Score: ${this.score}`
        this.pScoreToReach.textContent = "Score to reach: 1000"
    }*/
    update() {
        this.draw()
        //this.draw2()
    }

}