class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('taikodrummaster', 'assets/pics/taikodrummaster.jpg');
        this.load.image('sukasuka-chtholly', 'assets/pics/sukasuka-chtholly.png');
    }

    create ()
    {
        this.add.image(400, 300, 'taikodrummaster');

        var chtholly = this.add.image(400, 500, 'sukasuka-chtholly');

        this.tweens.add({
            targets: chtholly,
            y: Math.random() * 600,
            x: Math.random() * 200,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

        this.input.on('pointerdown', function () {

            this.sys.game.destroy(true);

            document.addEventListener('mousedown', function newGame () {

                game = new Phaser.Game(config);

                document.removeEventListener('mousedown', newGame);

            });

        }, this);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: Example
};

let game = new Phaser.Game(config);
