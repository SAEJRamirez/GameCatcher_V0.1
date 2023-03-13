//TODO Ici on set les attacks et les hp qu'elles retirent, et les status, et les items

export const Actions = {
    damage1: {
        name: "Scrabouille",
        description: "Un saut écrant !",
        success: [
            { type: "textMessage", text: "{CASTER} utilise {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 10}
        ]
    },
    healDot: {
        name: "Soins",
        description: "Applique un effet de soin",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} utilise {ACTION}!"},
            { type: "stateChange", status: { type: "soigné", expiresIn: 3 } },
            { type: "textMessage", text: "{TARGET} s'applique un soin !"},
        ]
    },
    poison: {
        name: "Poison",
        description: "Ronge jusqu'à l'os",
        success: [
            { type: "textMessage", text: "{CASTER} utilise {ACTION}!"},
            { type: "animation", animation: "glob", color: "#442482" },
            { type: "stateChange", status: { type: "empoisonné", expiresIn: 3 } },
            { type: "textMessage", text: "{TARGET} est empoisonné !"},
        ]
    },
    //Items
    item_recoverStatus: {
        name: "Gel hydro-alcoolique",
        description: "Retire tous les status",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} utilise un {ACTION}!"},
            { type: "stateChange", status: null },
            { type: "textMessage", text: "Ho oui je suis désinfecté!"},
        ]
    },
    item_recoverHp: {
        name: "Potion de soin",
        description: "Une potion... qui soigne...",
        targetType: "friendly",
        success: [
            { type:"textMessage", text: "{CASTER} tète une bonne {ACTION}!"},
            { type:"stateChange", recover: 10, },
            { type:"textMessage", text: "{CASTER} récupère sa santé!"},
        ]
    },
}