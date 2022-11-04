window.FighterTypes = {
    normal: "normal",
    combat: "combat",
    fire: "fire",
    poison: "poison",
    magic: "magic",
}

window.Fighters = {
    "s001": {
        name: "Maria",
        game: "Hyper Maria Siss",
        description: "La soeur cachée de Matio",
        type: FighterTypes.normal,
        src: "",
        icon: "/images/icones/chill.png",
        actions: [ "damage1", "healDot" ],
    },
    "s002": {
        name: "Bind",
        game: "The legend of Zalde",
        description: "Le héro qui sauvera Zalde",
        type: FighterTypes.combat,
        src: "",
        icon: "/images/icones/chill.png",
        actions: [ "damage1", "healDot", "bananaSlip" ],
    },
}