class PongGame {
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create,update : this.update });
    }

    game: Phaser.Game;
    paddle1: Phaser.Sprite;
    paddle2: Phaser.Sprite;
    ball_launched:boolean;
    ball_velocity:number;
    ball:Phaser.Sprite;
    score1_text:Phaser.BitmapText;
    score2_text:Phaser.BitmapText;
    score1:number;
    score2:number;

    preload = () => {
        this.game.load.image('paddle', 'assets/paddle.png');
        this.game.load.image('ball', 'assets/ball.png');
        this.game.load.bitmapFont('Desyrel','assets/FontName.png','assets/FontName.fnt');

    }

    create = ()=> {
        this.paddle1 = this.create_paddle(0,this.game.world.centerY);
        this.paddle2 = this.create_paddle(this.game.world.width,this.game.world.centerY);
        this.ball_launched = false;
        this.ball_velocity = 400;
        this.ball = this.create_ball(this.game.world.centerX,this.game.world.centerY);
        this.game.input.onDown.add(this.launch_ball,this);
        this.score1_text = this.game.add.bitmapText(128,128,'Desyrel','0',64);
        this.score2_text = this.game.add.bitmapText(this.game.world.width -128 ,128,'Desyrel','0',64);

        this.score1 = 0;
        this.score2 = 0;
    }

    update = () =>{
        this.score1_text.text = this.score1+"";
        this.score2_text.text = this.score2+"";
        this.control_paddle(this.paddle1,this.game.input.y);
        this.game.physics.arcade.collide(this.paddle1,this.ball);
        this.game.physics.arcade.collide(this.paddle2,this.ball);

        if(this.ball.body.blocked.left){
            console.log('Player 2 scores');
            this.score2++;
        }else if(this.ball.body.blocked.right){
            this.score1++;
            console.log('Player 1 scores');
        }

        this.paddle2.body.velocity.setTo(this.ball.body.velocity.y);
        this.paddle2.body.velocity.x = 0;
        this.paddle2.body.maxVelocity.y = 250;

    }

    create_paddle(x,y) :  Phaser.Sprite{
        let paddle = this.game.add.sprite(x,y,'paddle');
        paddle.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable = true;
        paddle.scale.setTo(0.5,2.5);
        return paddle;

    }
    
    control_paddle(paddle:Phaser.Sprite,y:number) : Phaser.Sprite{
        paddle.y = y;
        if(paddle.y < paddle.height / 2){
            paddle.y = paddle.height /2;
        }else if(paddle.y > this.game.world.height - paddle.height / 2){
            paddle.y = this.game.world.height - paddle.height /2;
        }

        return paddle;
    }

    create_ball(x,y) : Phaser.Sprite{
        let ball = this.game.add.sprite(x,y,'ball');
        ball.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1,1);
        return ball;

    }

    launch_ball() : void{
        if(this.ball_launched){
            this.ball.x = this.game.world.centerX;
            this.ball.y = this.game.world.centerY;
            this.ball.body.velocity.setTo(0,0);
            this.ball_launched = false;
        }else{
            this.ball.body.velocity.x = -this.ball_velocity;
            this.ball.body.velocity.y = this.ball_velocity;
            this.ball_launched = true;
        }
    }
}

window.onload = () => {
    var game = new PongGame();
};