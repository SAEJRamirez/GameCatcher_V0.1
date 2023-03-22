import {Overworld} from './Classes/Overworld.js'

export let setTest = false;
let messageFps = document.getElementById('message');
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
            prevTime = time;
            frames = 0;
            messageFps.textContent = `Testing your FPS... Please wait... (${fps / 1000})`
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
    messageFps.remove()
    startGameCatcher()
}, 2000)

function startGameCatcher () {

    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });
    overworld.init();

}