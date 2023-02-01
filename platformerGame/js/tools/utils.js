//Imports
import {groundCollisions, platformCollisionsUp, platformCollisionsDown, spikeCollisionsUp, spikeCollisionsDown} from "../data/collisionsBlocks.js";
import {CollisionBlock} from "../classes/CollisionBlock.js";

//Set constantes, variables
const groundCollisionsData = groundCollisions;
const groundCollisions2D = [];
let tempBlocksGround = get2DArrayFromTiledData(groundCollisionsData, groundCollisions2D);
export const groundCollisionBlocks = [];

const platformCollisionsUpData = platformCollisionsUp;
const platformUpCollisions2D = [];
let tempBlocksPlatformUp = get2DArrayFromTiledData(platformCollisionsUpData, platformUpCollisions2D);
export const platformUpCollisionBlocks = [];

const platformCollisionsDownData = platformCollisionsDown;
const platformDownCollisions2D = [];
let tempBlocksPlatformDown = get2DArrayFromTiledData(platformCollisionsDownData, platformDownCollisions2D);
export const platformDownCollisionBlocks = [];

const spikesCollisionsUpData = spikeCollisionsUp;
const spikeUpCollisions2D = [];
let tempBlocksSpikeUp = get2DArrayFromTiledData(spikesCollisionsUpData, spikeUpCollisions2D);
export const spikeUpCollisionBlocks = [];

const spikesCollisionsDownData = spikeCollisionsDown;
const spikeDownCollisions2D = [];
let tempBlocksSpikeDown = get2DArrayFromTiledData(spikesCollisionsDownData, spikeDownCollisions2D);
export const spikeDownCollisionBlocks = [];


//function for get 2D arrays from data
export function get2DArrayFromTiledData(arrayData, array2D) {
    for (let i = 0; i < arrayData.length; i += 200) {
        array2D.push(arrayData.slice(i, i + 200))
    }
    return array2D;
}

//Set arrays of collision blocks for ground
tempBlocksGround.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            groundCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64
                }
            }))
        }
    })
})

//Set arrays of collision blocks for platforms UP
tempBlocksPlatformUp.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            platformUpCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64
                },
                height: 20
            }))
        }
    })
})

//Set arrays of collision blocks for platforms DOWN
tempBlocksPlatformDown.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            platformDownCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64
                },
                height: 20,
                adjustPosition: 42
            }))
        }
    })
})

//Set arrays of collision blocks for platforms DOWN
tempBlocksSpikeUp.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            spikeUpCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64
                },
                height: 20,
            }))
        }
    })
})

//Set arrays of collision blocks for platforms DOWN
tempBlocksSpikeDown.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            spikeDownCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64
                },
                height: 20,
                adjustPosition: 43
            }))
        }
    })
})

