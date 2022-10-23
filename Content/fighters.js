window.FighterTypes = {
    normal: "normal",
    spicy: "spicy",
    veggie: "veggie",
    fungi: "fungi",
    chill: "chill",
}

window.Fighters = {
    "s001": {
        name: "Slice Samurai",
        description: "Pizza desc here",
        type: FighterTypes.spicy,
        src: "/images/personnages/personnes/me.png",
        icon: "/images/icones/spicy.png",
        actions: [ "saucyStatus", "clumsyStatus", "damage1" ],
    },
    "s002": {
        name: "Bacon Brigade",
        description: "A salty warrior who fears nothing",
        type: FighterTypes.spicy,
        src: "/images/personnages/combatants/s002.png",
        icon: "/images/icones/spicy.png",
        actions: [ "damage1", "saucyStatus", "clumsyStatus" ],
    },
    "v001": {
        name: "Call Me Kale",
        description: "Pizza desc here",
        type: FighterTypes.veggie,
        src: "/images/personnages/combatants/v001.png",
        icon: "/images/icones/veggie.png",
        actions: [ "damage1" ],
    },
    "f001": {
        name: "Portobello Express",
        description: "Pizza desc here",
        type: FighterTypes.fungi,
        src: "/images/personnages/combatants/f001.png",
        icon: "/images/icones/fungi.png",
        actions: [ "damage1" ],
    }
}