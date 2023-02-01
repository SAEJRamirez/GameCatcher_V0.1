import {
    groundCollisionBlocks,
    platformDownCollisionBlocks,
    platformUpCollisionBlocks, spikeDownCollisionBlocks,
    spikeUpCollisionBlocks
} from "./utils.js";

export function renderCollisionBlocks() {
    //Set collisionBlocks for ground
    groundCollisionBlocks.forEach(groundCollisionBlock => {
        groundCollisionBlock.update();
    })
    //Set collisionBlocks for platformUp
    platformUpCollisionBlocks.forEach(platformUpCollisionBlock => {
        platformUpCollisionBlock.update();
    })
    //Set collisionBlocks for platformDown
    platformDownCollisionBlocks.forEach((platformDownCollisionBlock) => {
        platformDownCollisionBlock.update();
    })
    //Set collisionBlocks for spikeUp
    spikeUpCollisionBlocks.forEach((spikeUpCollisionBlock) => {
        spikeUpCollisionBlock.update();
    })
    //Set collisionBlocks for spikeDown
    spikeDownCollisionBlocks.forEach((spikeDownCollisionBlock) => {
        spikeDownCollisionBlock.update();
    })
}