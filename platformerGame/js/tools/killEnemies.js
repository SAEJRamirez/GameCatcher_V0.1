import {deathSprites, enemies, scoreBoard} from "../initPlatformer.js";
import {Sprite} from "../classes/Sprite.js";
import {EnemyChoompy} from "../classes/EnemyChoompy.js";



export function killChoompy(choompy, index) {
    enemies.splice(index, 1)
    deathSprites.push(new Sprite({
        position: {
            x: choompy.position.x,
            y: choompy.position.y
        },
        imageSrc: "../../img/enemies/choompy/death.png",
        frameBuffer: 8,
        frameRate: 8,
        scale: 0.2
    }))
    setTimeout(() => {
        deathSprites.splice(0, 1)
    }, 400)
    scoreBoard.score += 10;
}

export function killChoompyMax(choompyMax, index) {
    enemies.splice(index, 1)
    deathSprites.push(new Sprite({
        position: {
            x: choompyMax.position.x,
            y: choompyMax.position.y
        },
        imageSrc: "../../img/enemies/choompy/death.png",
        frameBuffer: 8,
        frameRate: 8,
        scale: 0.2
    }))
    setTimeout(() => {
        deathSprites.splice(0, 1)
    }, 400)
    scoreBoard.score += 10;
    enemies.push(
        new EnemyChoompy({
            position: {
                x: choompyMax.position.x,
                y: choompyMax.position.y
            },
            distance: {
                limit: choompyMax.distance.limit,
                traveled: choompyMax.distance.traveled,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: choompyMax.position.x,
                y: choompyMax.position.y
            },
            distance: {
                limit: choompyMax.distance.limit,
                traveled: choompyMax.distance.traveled,
                direction: "Left"
            }
        }),
    )
}

export function killVampBat(vampBat, index) {
    enemies.splice(index, 1)

    deathSprites.push(new Sprite({
        position: {
            x: vampBat.position.x,
            y: vampBat.position.y
        },
        imageSrc: "../../img/enemies/choompy/death.png",
        frameBuffer: 8,
        frameRate: 8,
        scale: 0.2
    }))
    setTimeout(() => {
        deathSprites.splice(0, 1)
    }, 400)
    scoreBoard.score += 10;
}