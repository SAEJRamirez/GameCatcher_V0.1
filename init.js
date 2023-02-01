import {Overworld} from './Classes/Overworld.js'

(function () {

    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });
    overworld.init();

})();