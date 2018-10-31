var width = 1800;
var height = 800;
var game = new Phaser.Game(width,height,Phaser.CANVAS);
var ballSpeed = 1000;



var TEST = {
    preload: function() {
        game.load.image('background','assets/background.jpg');
        game.load.image('player1','assets/Jjangu.png');
        game.load.image('player2','assets/Dulli.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('refree1', 'assets/refree1.jpg');
        game.load.image('refree2', 'assets/refree2.jpg');
        game.load.image('net','assets/net.png');
        game.load.image('ball','assets/ball.png');
    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 3000;

        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.lKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.tKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

        this.bg1 = game.add.sprite(0,0,'background');
        this.bg2 = game.add.sprite(width+10,0,'background');
        //this.bg1.scale.setTo(3,3);
        //this.bg2.scale.setTo(3,3);
        this.bg1.width = width;
        this.bg1.height = height;
        this.bg2.width = width;
        this.bg2.height = height;

        this.ground = game.add.sprite(0,700,'ground');
        this.ground.width = width;
        this.ground.height = 100;
        game.physics.enable(this.ground,Phaser.Physics.ARCADE);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.player1 = game.add.sprite(100,300,'player1');
        this.player1.scale.setTo(0.4,0.4);
        this.player1.anchor.setTo(0.5,0);
        game.physics.enable(this.player1,Phaser.Physics.ARCADE);
        this.player1.body.collideWorldBounds = true;
        this.player1.score = 0;
        

        this.player2 = game.add.sprite(width-100-100,300,'player2');
        this.player2.scale.setTo(0.4,0.4);
        this.player2.anchor.setTo(0.5,0);
        game.physics.enable(this.player2,Phaser.Physics.ARCADE);
        this.player2.body.collideWorldBounds = true;
        this.player2.score = 0;
        
        
        this.net = game.add.sprite(width/2,height-100,'net');
        this.net.scale.setTo(0.6,0.35);
        this.net.x -= this.net.width/2;
        this.net.y -= this.net.height;
        game.physics.enable(this.net,Phaser.Physics.ARCADE);
        this.net.body.immovable = true;
        this.net.body.allowGravity = false;
        this.net.body.moves = false;

        this.ball = game.add.sprite(width/2+200,height-500,'ball');
        game.physics.enable(this.ball,Phaser.Physics.ARCADE);
        this.ball.body.collideWorldBounds = true;
        this.ball.scale.setTo(0.5,0.5);
        this.ball.body.bounce.set(1);
        this.ball.anchor.setTo(0.5,1);
        //this.ball.body.setCircle(this.width);
        this.ball.body.allowGravity = false;

        this.ball.body.velocity.x = -ballSpeed;

        

    },
    update: function() {
        if (Phaser.Rectangle.intersects(this.ball.body,this.player2.body) == true) {
            //this.ball.body.velocity.x *= -1;
            
            this.ball.body.velocity.y = -ballSpeed;
        };
        if (Phaser.Rectangle.intersects(this.ball.body,this.player1.body) == true) {
            //this.ball.body.velocity.x *= -1;
            this.ball.body.velocity.y = -ballSpeed;
        };

        game.physics.arcade.collide(this.ball,this.net);
        game.physics.arcade.collide(this.ball,this.ground,function(obj1,obj2) {
            if (obj2.key == "ground") {
                if (obj1.world.x > width/2) {
                    obj1.body.position.x = width/2-200;
                    obj1.body.position.y = height-500;
                    obj1.body.velocity.y = 0;
                    
                } else {
                    
                    obj1.body.position.x = width/2+200;
                    obj1.body.position.y = height-500;
                    obj1.body.velocity.y = 0;
                    console.log(obj1.score)
                }
            }
        },function(a,b){return true;});
        // game.physics.arcade.collide(this.ball,this.player1);
        // game.physics.arcade.collide(this.ball,this.player2)

        game.physics.arcade.collide(this.player1,this.net);
        if(game.physics.arcade.collide(this.player2,this.net))
        {
            console.log("!");
        }
        game.physics.arcade.collide(this.player1,this.ground);
        game.physics.arcade.collide(this.player2,this.ground);

        if(this.bg2.x<=0)
        {
            this.bg1.x = 0;
            this.bg2.x = width;
        }

        this.bg1.x -= 10;
        this.bg2.x -= 10;

        var velocity = 1000;
        var jump = 1000;
        // && this.player1.body.touching.down
        if(this.wKey.isDown && this.player1.body.touching.down)
            this.player1.body.velocity.y-=1200;
        if(this.aKey.isDown)
            this.player1.body.velocity.x= -velocity;
        if(this.dKey.isDown)
            this.player1.body.velocity.x= velocity;
        if(!this.aKey.isDown && !this.dKey.isDown) {
            this.player1.body.velocity.x = 0;
        }

        if(this.tKey.isDown && this.player2.body.touching.down)
            this.player2.body.velocity.y-=1200;

        if(this.lKey.isDown)
            this.player2.body.velocity.x= -velocity;
        if(this.rKey.isDown)
            this.player2.body.velocity.x= velocity;
        if(!this.lKey.isDown && !this.rKey.isDown) {
            this.player2.body.velocity.x = 0;
        }

    }
};

game.state.add('TEST',TEST);

game.state.start('TEST');