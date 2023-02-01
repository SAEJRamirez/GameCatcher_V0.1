class ArcadeStation {
    constructor(fighters) {
        this.fighters = fighters;

    }

    runNewGame(fighterId) {
        this.fighters.map.isPaused = true;
        this.fighters.forEach(fighter => {
            console.log(fighter)
            if (fighter === fighterId) {
                console.log("OUI")
            }
        })
    }
}