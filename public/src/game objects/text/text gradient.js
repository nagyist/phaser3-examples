class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('lulu', 'assets/pics/shocktroopers-lulu2.png');
    }

    create ()
    {
        this.add.image(790, 600, 'lulu').setOrigin(1);

        const text = this.add.text(25, 250, 'Gradient', { fontFamily: 'Arial Black', fontSize: 82 });
        text.setStroke('#000000', 4);

        //  Apply the gradient fill.
        const gradient = text.context.createLinearGradient(0, 0, 0, text.height);
        gradient.addColorStop(0, '#111111');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(0.5, '#aaaaaa');
        gradient.addColorStop(1, '#111111');

        text.setFill(gradient);

    }
}

const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: 0xbdbdbd,
    scene: Example
};

const game = new Phaser.Game(config);
