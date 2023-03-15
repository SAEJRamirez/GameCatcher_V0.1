import {GameObject} from "./GameObject.js";
import {Sprite} from "./Sprite.js";

export class ArcadeStation extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "",
            animations: {
                "unused-down": [ [1,0] ],
                "used-down": [[1,0]]
            },
            currentAnimation: "used-down"
        });
        this.storyFlag = config.storyFlag;
        this.playable = config.playable
        this.fighters = config.fighters

        this.talking = [
            {
                required: [this.storyFlag],
                events: [
                    {who:"ArcadEx" ,type: "textMessage", text: "Félicitation ! Tu as débloqué un nouveau combattant."}
                ]
            },
            {
                required: [this.playable],
                events: [
                    {type: "textMessage", text: "Bienvenue ! Envie de jouer avec moi ?", who: "ArcadEx"},
                    {type: "craftingMenu", fighters: this.fighters},
                    {type: "addStoryFlag", flag: this.storyFlag}
                ]
            },
        ]
    }

    update() {
        this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag] ? "used-down" : "unused-down"
    }
}