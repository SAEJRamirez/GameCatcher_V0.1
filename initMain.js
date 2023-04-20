import {Overworld} from './Classes/Overworld.js'

startGameCatcher()
function startGameCatcher () {

    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });
    overworld.init();

}