export const FighterTypes = {
    normal: "normal",
    combat: "combat",
    fire: "fire",
    poison: "poison",
    magic: "magic",
}

export const Fighters = {
    "s001": {
        name: "Maria",
        game: "Hyper Maria Siss",
        gameId: "hms1",
        description: "La soeur cachée de Mario",
        type: FighterTypes.normal,
        src: "",
        icon: "",
        actions: [ "damage1", "healDot" ],
    },
    "s002": {
        name: "Luigia",
        game: "Hyper Maria Siss",
        gameId: "hms1",
        description: "La soeur cachée de Luigi",
        type: FighterTypes.normal,
        src: "",
        icon: "/img/icones/chill.png",
        actions: [ "damage1" ],
    },
    "s003": {
        name: "Bind",
        game: "The legend of Zalde",
        gameId: "tlz1",
        description: "Le héro qui sauvera Zalde",
        type: FighterTypes.combat,
        src: "",
        icon: "/img/icones/chill.png",
        actions: [ "damage1", "healDot", "bananaSlip" ],
    },
}