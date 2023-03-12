//TODO ici on définit les enemis, leurs sprites, combatants, niveaux etc...

export const Enemies = {
    "erio": {
        name: "Erio",
        src: "/img/personnages/personnes/erio.png",
        fighters: {
            "a": {
                fighterId: "s002",
                maxHp: 10,
                level: 1,
            },
        }
    },
    "beth": {
        name: "Beth",
        src: "/img/personnages/personnes/npc1.png",
        fighters: {
            "a": {
                hp: 1,
                fighterId: "s002",
                maxHp: 50,
                level: 1,
            },
        }
    }
}