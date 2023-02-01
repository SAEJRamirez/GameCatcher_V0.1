//TODO ici on définit les enemis, leurs sprites, combatants, niveaux etc...

export const Enemies = {
    "erio": {
        name: "Erio",
        src: "/images/personnages/personnes/erio.png",
        fighters: {
            "a": {
                fighterId: "s001",
                maxHp: 50,
                level: 1,
            },
            "b": {
                fighterId: "s002",
                maxHp: 50,
                level: 1,
            },
        }
    },
    "beth": {
        name: "Beth",
        src: "/images/personnages/personnes/npc1.png",
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