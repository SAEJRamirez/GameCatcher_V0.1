export let audioPlatformer = {
    mapMusic: new Howl({
        src: "../audio/src/platformerMusic.mp3",
        volume: 0.2,
        loop: true
    }),
    jump: new Howl({
        src: "../audio/src/audioJump.mp3",
        volume: 0.2,
        loop: false
    }),
    miniSplash: new Howl({
        src: "../audio/src/choompySplash.mp3",
        volume: 0.8,
        loop: false
    }),
    maxSplash: new Howl({
        src: "../audio/src/maxSplash.mp3",
        volume: 0.8,
        loop: false
    }),
    grabCoin: new Howl({
        src: "../audio/src/grabCoin.mp3",
        volume: 0.8,
        loop: false
    }),
    playerDeath: new Howl({
        src: "../audio/src/playerDie.mp3",
        volume: 0.8,
        loop: false
    }),
    victory: new Howl({
        src: "../audio/src/platformerVictory.mp3",
        volume: 0.8,
        loop: false
    }),
    loose: new Howl({
        src: "../audio/src/platformerLoose.mp3",
        volume: 0.8,
        loop: false,
    }),

}