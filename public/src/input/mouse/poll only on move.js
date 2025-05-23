class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
    }

    create ()
    {
        const sprite = this.add.sprite(100, 300, 'eye').setInteractive();

        //  Enable pointer polling only when you move the mouse

        //  This will check the pointer against the interactive objects only when you move the mouse
        //  If you leave the mouse in the path of the sprite and don't touch it,
        //  the sprite will *not* trigger the over/out events as it tweens across the screen.

        this.input.setPollOnMove();

        //  Events

        this.input.on('gameobjectover', (pointer, gameObject) =>
        {

            gameObject.setTint(0xff0000);

        });

        this.input.on('gameobjectout', (pointer, gameObject) =>
        {

            gameObject.clearTint();

        });

        this.tweens.add({

            targets: sprite,
            x: 800,
            yoyo: true,
            repeat: -1,
            duration: 5000

        });
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
