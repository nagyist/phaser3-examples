class Example extends Phaser.Scene
{
    g1;
    g2;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('distortion', 'assets/textures/distortion7.png');
        this.load.image('gradient1', 'assets/skies/gradient1.png');
        this.load.image('gradient2', 'assets/skies/gradient2.png');
    }

    create ()
    {
        const bg = this.add.image(640, 360, 'distortion').setAlpha(0.1);
        Phaser.Actions.FitToRegion(bg, 1);

        // Use brightness from `distortion` as an alpha channel.
        const g1 = this.add.image(640, 360, 'gradient1');
        const g1Combine = g1.enableFilters().filters.internal.addCombineColorMatrix('distortion');
        g1Combine.setupAlphaTransfer(true, false, undefined, true);
        this.g1 = g1;

        // Invert the brightness-derived alpha.
        const g2 = this.add.image(640, 360, 'gradient2');
        const g2Combine = g2.enableFilters().filters.internal.addCombineColorMatrix('distortion');
        g2Combine.setupAlphaTransfer(true, false, undefined, undefined, undefined, true);
        this.g2 = g2;
    }

    update (time, delta)
    {
        const d = 128 * Math.sin(time / 3000);
        this.g1.x = 640 + d;
        this.g2.x = 640 - d;
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    backgroundColor: '#2d3440',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
