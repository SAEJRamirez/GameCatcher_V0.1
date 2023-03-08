import {utils} from "../utils.js";

export let cinematicScripts = [
   {
        id: "CinematicIntroTv",
        script: [
            {
                type: "textMessage",
                text: "Nous sommes toujours sans nouvelles suite à la disparition de tous" +
                    " les jeux vidéos dans le monde...",
                who: "Tv"
            },
            {
                type: "textMessage",
                text: "Retrouvons notre envoyé spécial, Georges-Jean, devant un studio de développement " +
                    "de jeux vidéos.",
                who: "Tv"
            },
            {
                type: "textMessage",
                text: "Et oui en effet Marc-Antoine, je me trouve devant le studio GamesForGamers...",
                who: "Tv"
            },
            {
                type: "textMessage",
                text: "...cela fait maintenant une semaine que tout a disparu. La peur règne !",
                who: "Tv"
            },
            {
                type: "textMessage",
                text: "La panique a gagné le monde du streaming et les gamers sont désemparés...",
                who: "Tv"
            },
            {
                type: "textMessage",
                text: "Le mystère reste complet Georges-Jean! Les jeunes sauront-ils affronter tout ce temps libre ?",
                who: "Tv"
            },
            {
                type: "textMessage",
                text: "Et bien, Marc-Antoine, au moins, il n'y aura plus de tuerie dans les écoles... hahaha",
                who: "Tv"
            },
            {
                type: "changeMap",
                map: "CinematicIntroStreamer",
                x: utils.withGrid(3),
                y: utils.withGrid(3),
                direction: "up"
            }
        ]
    },
    {
        id: "HeroHouseMap",
        script: [
            {
                type: "textMessage",
                text: "Bienvenue dans GameCatcher, Pseudo ! Comme tu l'as compris, la situation est catastrophique.",
                who: "La voix"
            },
            {
                type: "textMessage",
                text: "Tous les jeux vidéos ont disparus. Il est de ton devoir de les retrouver et de résoudre le mystère " +
                    "de leur disparition.",
                who: "La voix"
            },
            {
                type: "textMessage",
                text: "Le streamer mystérieux t'as conseillé de te rendre au nord de la ville.",
                who: "La voix"
            },
            {
                type: "textMessage",
                text: "Avec sa cartouche, tu pourras jouer au seul jeu restant dans le monde.",
                who: "La voix"
            },
            {
                type: "textMessage",
                text: "Appuie sur les touches W / A / S / D de ton clavier pour te déplacer, ou sur les touches fléchées. ",
                who: "La voix"
            },
            {
                type: "textMessage",
                text: "Appuie sur la touche ENTER pour interagir avec un objet ou une personne. Bonne chance, Pseudo...",
                who: "La voix"
            },
            {
                type: "addStoryFlag",
                flag: "INTRO_DONE"
            }
        ]
    }
]