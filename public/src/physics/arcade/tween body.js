class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('block', 'assets/sprites/block.png');
        this.load.image('dude', 'assets/sprites/phaser-dude.png');
    }

    create ()
    {
        // this.physics.world.OVERLAP_BIAS = 8;

        const block = this.physics.add.image(400, 200, 'block');

        block.body.allowGravity = false;
        block.body.immovable = true;
        block.body.moves = false;

        const sprite = this.physics.add.image(400, 100, 'dude');

        this.tweens.add({
            targets: block,
            y: 400,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        this.physics.add.collider(sprite, block);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 300 },
            overlapBias: 8
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);
