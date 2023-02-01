class ArcadeStation {
    constructor(fighters, map) {
        this.fighters = fighters;
        this.map = map
    }

    runNewGame(fighterId) {
        const nextCanvas = document.querySelector('.next-game-canvas');
        const ctxNext = nextCanvas.getContext("2d")

        this.map.isPaused = true
        this.fighters.forEach(fighter => {
            if (fighter === fighterId) {
                console.log("OUI")
                nextCanvas.style.display = "block"
                ctxNext.fillStyle = "red"
                ctxNext.fillRect(0,0,nextCanvas.width,nextCanvas.height)
            }
        })
    }
}