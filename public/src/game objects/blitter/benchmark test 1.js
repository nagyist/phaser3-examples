
let total;
let blitter;
let text;
class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.atlas('atlas', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json');
    }

    create ()
    {
        total = 250;
        blitter = this.add.blitter(0, 0, 'atlas', 'chunk');
        text = this.add.text(10, 10, 'Total: 250', { font: '64px Courier', fill: '#00ff00' });

        for (var i = 0; i < 250; ++i)
        {
            blitter.create(Phaser.Math.Between(0, 1020), Phaser.Math.Between(0, 764));
        }
    }

    update ()
    {
        if (this.input.activePointer.isDown)
        {
            for (var i = 0; i < 250; ++i)
            {
                blitter.create(Phaser.Math.Between(0, 1020), Phaser.Math.Between(0, 764));
            }

            total += 250;

            text.setText('Total: ' + total);
        }
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
