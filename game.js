var width = 800;
var height = 600;
var game = new Phaser.Game(width,height,Phaser.CANVAS);

var TEST = {
    preload: function() {
        game.load.image('background','assets/Background.png');
        game.load.image('player','assets/Player.png');
        game.load.image('bullet','assets/Bullet.png');
        game.load.image('enemy','assets/Enemy2.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

        this.spaceKey.onDown.add(this.shoot);
        this.rKey.onDown.add(function(){
            game.state.start('BLANK');
        })

        this.bg1 = game.add.sprite(0,0,'background');
        this.bg2 = game.add.sprite(width,0,'background');

        this.player = game.add.sprite(0,0,'player');
        this.player.anchor.setTo(0.5);
        this.bulletList = [];
        this.bulletGroup=game.add.group();
        this.enemy = game.add.sprite(300,300,'enemy');
        game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    },
    update: function() {
        if(this.bg2.x<=0)
        {
            this.bg1.x = 0;
            this.bg2.x = 800;
        }
        this.bg1.x -= 10;
        this.bg2.x -= 10;

        if(this.wKey.isDown)
            this.player.y-=3;
        if(this.sKey.isDown)
            this.player.y+=3;
        if(this.aKey.isDown)
            this.player.x-=3;
        if(this.dKey.isDown)
            this.player.x+=3;
       
        // for(let i = 0; i<this.bulletList.length; i++)
        // {
        //     this.bulletList[i].x+=10;
        //     if(game.physics.arcade.collide(this.bulletList[i],this.enemy,function(e,b) {
            
        //     {
        //         this.bulletList[i].destroy();
        //         this.bulletList.splice(i,1);
        //         i--;
        //     })
        // }
        for(let i = 0; i<this.bulletGroup.children.length; i++)
        {
            this.bulletGroup.children[i].x+=10;
        }
        game.physics.arcade.collide(this.bulletGroup,this.enemy,function(e,b) {
            b.destroy();
        });
    },
    shoot: function(){
        let b = game.add.sprite(TEST.player.x,TEST.player.y,'bullet');
        game.physics.enable(b,Phaser.Physics.ARCADE);
        b.anchor.setTo(0.5);
        //TEST.bulletList.push(b);
        TEST.bulletGroup.add(b);
    }
};

var BLANK={
    preload:function(){},
    create:function(){},
    update:function(){}
}
game.state.add('TEST',TEST);
game.state.add('BLANK',BLANK);

game.state.add('TEST',TEST);

game.state.start('TEST');