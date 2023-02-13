import {coins} from "../initPlatformer.js";
import {SilverCoin} from "../classes/SilverCoin.js";

export function spawnCoins() {
    coins.push(
        new SilverCoin({
            position: {
                x: 100,
                y: 300
            }
        })
    )
}