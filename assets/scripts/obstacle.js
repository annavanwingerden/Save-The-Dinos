class Obstacle {
    constructor (game,x){
        this.game = game
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.x = x; 
        this.y = this.game. height *0.5 - this.height;
    }
}