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
                text: "Et oui en effet Marc-Antoin, je me trouve devant le studio GamersForGames...",
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
]