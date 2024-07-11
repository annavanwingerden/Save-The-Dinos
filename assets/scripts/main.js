class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight; 
        this.background = new Background(this);
        this.player = new Player(this);
        this.obstacles =[];
        this.numberOfObstacles = 3;
        this.gravity;
        this.speed;
        this.score;
        this.gameOver;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize',  e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });
        // mouse controls
        this.canvas.addEventListener('mousedown', e => {
            this.player.flap();
        });
        // keyboard controls
        window.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') this.player.flap();
        });
        // touch controls
        this.canvas.addEventListener('touchstart', e => {
            this.player.flap();
        });
    }
    resize (width, height){
        this.canvas.width= width;
            this.canvas.height= height;
            this.ctx.fillStyle = 'blue';
            this.ctx.font = '30px Arsenal SC';
            this.ctx.textAlign='right';
            this.width = this.canvas.width;
            this.height= this.canvas.height;
            this.ratio = this.height / this.baseHeight; 

            this.gravity = 0.15 * this.ratio;
            this.speed = 2 * this.ratio;
            this.background.resize();
            this.player.resize();    
            this.createObstacles();
            this.obstacles.forEach (obstacle => {
                obstacle.resize();
            });
            this.score = 0;
            this.gameOver = false; 
    }
    render (){
        this.background.update();
        this.background.draw();
        this.drawStatusText();
        this.player.update();
        this.player.draw();
        this.obstacles.forEach (obstacle => {
            obstacle.update();
            obstacle.draw();
        });
    }
    createObstacles(){
        this.obstacles =[];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600*this.ratio;
        for (let i = 0; i < this.numberOfObstacles; i++){
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
        }
    }
    drawStatusText(){
        this.ctx.save();
        this.ctx.fillText('Score: ' + this.score, this.width - 10, 30);
        this.ctx.restore();
    }
}

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);
    game.render();

    function animate (){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render();
        if(!game.gameOver) requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
});