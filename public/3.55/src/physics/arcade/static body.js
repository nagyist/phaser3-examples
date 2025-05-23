var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var sprite;
var static1;
var static2;
var static3;

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('bar', 'assets/sprites/healthbar.png');
    this.load.image('mushroom', 'assets/sprites/mushroom2.png');
}

function create ()
{
    sprite = this.physics.add.image(100, 100, 'mushroom');

    static1 = this.physics.add.staticImage(400, 100, 'bar');
    static2 = this.physics.add.staticImage(100, 400, 'bar');
    static3 = this.physics.add.staticImage(500, 300, 'bar');

    sprite.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
}

function update ()
{
    this.physics.world.collide(sprite, [ static1, static2, static3 ]);
}
