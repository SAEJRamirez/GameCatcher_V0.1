import {EnemyVampBat} from "../classes/EnemyVampBat.js";
import {EnemyChoompyMax} from "../classes/EnemyChoompyMax.js";
import {EnemyChoompy} from "../classes/EnemyChoompy.js";
import {enemies} from "../initPlatformer.js";


function spawnChoompys() {
    enemies.push(
        new EnemyChoompy({
            position: {
                x: 780,
                y: 300
            },
            distance: {
                limit: 150,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 830,
                y: 150
            },
            distance: {
                limit: 150,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 3250,
                y: 250
            },
            distance: {
                limit: 100,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 5680,
                y: 400
            },
            distance: {
                limit: 100,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 5680,
                y: 400
            },
            distance: {
                limit: 100,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 7520,
                y: 320
            },
            distance: {
                limit: 120,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 7560,
                y: 320
            },
            distance: {
                limit: 120,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 7600,
                y: 320
            },
            distance: {
                limit: 120,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 7780,
                y: 320
            },
            distance: {
                limit: 120,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 7820,
                y: 320
            },
            distance: {
                limit: 120,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 7860,
                y: 320
            },
            distance: {
                limit: 120,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 10200,
                y: 340
            },
            distance: {
                limit: 340,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 10940,
                y: 160
            },
            distance: {
                limit: 30,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 10940,
                y: 400
            },
            distance: {
                limit: 200,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyChoompy({
            position: {
                x: 10940,
                y: 400
            },
            distance: {
                limit: 200,
                traveled: 0,
                direction: "Left"
            }
        }),
    )
}

function spawnChoompysMax() {
    enemies.push(
        new EnemyChoompyMax({
            position: {
                x: 300,
                y: 150
            },
            distance: {
                limit: 150,
                traveled: 0,
            }
        }),
        new EnemyChoompyMax({
            position: {
                x: 3900,
                y: 200
            },
            distance: {
                limit: 180,
                traveled: 0,
            }
        }),
        new EnemyChoompyMax({
            position: {
                x: 7690,
                y: 120
            },
            distance: {
                limit: 100,
                traveled: 0,
            }
        }),
        new EnemyChoompyMax({
            position: {
                x: 10700,
                y: 160
            },
            distance: {
                limit: 30,
                traveled: 0,
            }
        }),
        new EnemyChoompyMax({
            position: {
                x: 11210,
                y: 160
            },
            distance: {
                limit: 30,
                traveled: 0,
            }
        }),
    )
}

function spawnVampBats() {
    enemies.push(
        new EnemyVampBat({
            position: {
                x: 1900,
                y: 250
            },
            velocity: {
                x: 1,
                y: 0.1
            },
            distance: {
                limit: 180,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyVampBat({
            position: {
                x: 2500,
                y: 280
            },
            velocity: {
                x: 1,
                y: 0.1
            },
            distance: {
                limit: 190,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyVampBat({
            position: {
                x: 4640,
                y: 340
            },
            velocity: {
                x: 3,
                y: 0.1
            },
            distance: {
                limit: 350,
                traveled: 0,
                direction: "Right"
            }
        }),
        new EnemyVampBat({
            position: {
                x: 6250,
                y: 450
            },
            velocity: {
                x: 1,
                y: 0.1
            },
            distance: {
                limit: 250,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyVampBat({
            position: {
                x: 6200,
                y: 250
            },
            velocity: {
                x: 1.5,
                y: 0.1
            },
            distance: {
                limit: 150,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyVampBat({
            position: {
                x: 6800,
                y: 220
            },
            velocity: {
                x: 1,
                y: 0.1
            },
            distance: {
                limit: 300,
                traveled: 0,
                direction: "Left"
            }
        }),
        new EnemyVampBat({
            position: {
                x: 9350,
                y: 190
            },
            velocity: {
                x: 2,
                y: 0.1
            },
            distance: {
                limit: 300,
                traveled: 0,
                direction: "Right"
            }
        }),
    )
}

export function spawnEnemies() {
    spawnChoompys();
    spawnChoompysMax();
    spawnVampBats();
}