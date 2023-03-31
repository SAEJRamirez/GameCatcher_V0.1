import {Overworld} from './Classes/Overworld.js'

export let setTest = false;
let loader = document.getElementById('loader-container')
let loaderText = document.getElementById('loader-text')
let gameContainer = document.querySelector('.game-container')
export let actualFps = 0;

//Test FPS
function testFps() {
    let prevTime = Date.now(),
        frames = 0;

    requestAnimationFrame(function loop() {
        const time = Date.now();
        frames++;
        if (time > prevTime + 1000) {
            let fps = Math.round((frames * 1000))
            loaderText.textContent = `Testing your fps ${fps / 1000}`
            prevTime = time;
            frames = 0;
            loader.style.display = "flex"
            actualFps = fps / 1000;
            return actualFps
        }
        if (!setTest) {
            requestAnimationFrame(loop)
        }
    })
}

testFps();
setTimeout(() => {
    gameContainer.style.display = "block"
    if (actualFps <= 56) {
        location.reload()
    }
    setTest = true
    loader.style.display = "none"
    loaderText.textContent = ""
    startGameCatcher()
}, 2000)

function startGameCatcher () {

    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });
    overworld.init();

}