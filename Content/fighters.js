export const FighterTypes = {
    normal: "normal",
    combat: "combat",
    fire: "fire",
    poison: "poison",
    magic: "magic",
}

export const Fighters = {
    "s001": {
        name: "Little Red",
        game: "Little Red VS Mushrooms",
        gameId: "hms1",
        description: "Petit chaperon rouge, veut du sang...",
        type: FighterTypes.normal,
        src: "",
        icon: "",
        actions: [ "damage1", "healDot" ],
    },
    "s002": {
        name: "ChoompyMax",
        game: "Little Red VS Mushrooms",
        gameId: "hms1",
        description: "Gare aux champignons géants",
        type: FighterTypes.normal,
        src: "",
        icon: "/img/icones/chill.png",
        actions: [ "damage1", "bananaSlip" ],
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