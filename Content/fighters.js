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
        src: "/img/personnages/combatants/little-red.png",
        icon: "/img/icones/chill.png",
        actions: [ "damage1", "poison", "healDot"],
    },
    "s002": {
        name: "ChoompyMax",
        game: "Little Red VS Mushrooms",
        gameId: "hms1",
        description: "Gare aux champignons géants",
        type: FighterTypes.normal,
        src: "/img/personnages/combatants/choompyMax.png",
        icon: "/img/icones/fungi.png",
        actions: [ "damage1", "poison" ],
    },
}