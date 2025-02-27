var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('brush', 'assets/sprites/brush1.png');
}

function create ()
{
    var rt = this.add.renderTexture(0, 0, 800, 600);

    this.input.on('pointermove', function (pointer) {

        if (pointer.isDown)
        {
            rt.draw('brush', pointer.x - 32, pointer.y - 32);
        }

    }, this);
}
