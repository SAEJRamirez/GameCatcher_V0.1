//TODO Ici on set les attacks et les hp qu'elles retirent, et les status, et les items

window.Actions = {
    damage1: {
        name: "Jump",
        description: "Un saut écrant !",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 10}
        ]
    },
    healDot: {
        name: "Soins",
        description: "Applique un effet de soin",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!", who: ""},
            { type: "stateChange", status: { type: "soigné", expiresIn: 3 } }
        ]
    },
    bananaSlip: {
        name: "Banana",
        description: "Attention, ça glisse...",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!", who: ""},
            { type: "animation", animation: "glob", color: "#fdf22a" },
            { type: "stateChange", status: { type: "glisse", expiresIn: 3 } },
            { type: "textMessage", text: "{TARGET} glisse sur une peau de banane!", who: ""},
        ]
    },
    //Items
    item_recoverStatus: {
        name: "Gel hydro-alcoolique",
        description: "Retire tous les status",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses a {ACTION}!", who: ""},
            { type: "stateChange", status: null },
            { type: "textMessage", text: "Ho oui je suis désinfecté!", who: ""},
        ]
    },
    item_recoverHp: {
        name: "Potion de soin",
        targetType: "friendly",
        success: [
            { type:"textMessage", text: "{CASTER} tète une bonne {ACTION}!",who: "" },
            { type:"stateChange", recover: 10, },
            { type:"textMessage", text: "{CASTER} rècupère sa santé!",who: "" },
        ]
    },
}