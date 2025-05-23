class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bomb', 'assets/sprites/bombcolor.png');
    }

    create ()
    {
        const bomb1 = this.add.sprite(400, 300, 'bomb');

        const fx1 = bomb1.enableFilters().filters.external.addGlow(0xffff00, 4, 0, 1, false, 10, 32);
        const fx2 = bomb1.enableFilters().filters.external.addGlow(0xff0000, 4, 2);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
