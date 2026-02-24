class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/pics/fairy-background-craft-pixel.png');
        this.load.image('sprite', 'assets/rope/dragonball.png');
    }

    create ()
    {
        const bg = this.add.image(400, 200, 'bg').setScale(2);

        this.spriteBase = this.add.image(240, 420, 'sprite').setFlipX(true);
        this.spriteKey = this.add.image(1000, 400, 'sprite').enableFilters();

        // Isolate the blue uniform and turn it saffron.
        const parallelFilters = this.spriteKey.filters.internal.addParallelFilters();
        const keyRed = parallelFilters.top.addKey({
            color: 0x241cb4,
            isolate: true,
            threshold: 0.4
        });
        const colorMatrix = parallelFilters.top.addColorMatrix();
        colorMatrix.colorMatrix.hue(150).brightness(2,true);
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    backgroundColor: '#2d3440',
    smoothPixelArt: true,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
