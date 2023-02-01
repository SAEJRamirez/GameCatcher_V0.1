class CraftingStone extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "/images/personnages/personnes/erio.png",
            animations: {
                "used-down" : [ [0,0] ],
                "unused-down": [ [1,0] ],
            },
            currentAnimation: "used-down"
        });
        this.storyFlag = config.storyFlags;
        this.fighters = config.fighters

        this.talking = [
            {
                required: [this.storyFlag],
                events: [
                    {type: "textMessage", text: "You have already used this."}
                ]
            },
            {
                events: [
                    {type: "textMessage", text: "Welcome Player, ready to win ?", who: "ArcadEx"},
                    {type: "craftingMenu", fighters: this.fighters},
                    {type: "addStoryFlag", flag: this.storyFlag}
                ]
            }
        ]
    }

    update() {
        this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag] ? "used-down" : "unused-down"
    }
}