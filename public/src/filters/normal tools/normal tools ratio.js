class Example extends Phaser.Scene
{
    image;
    lightNormalTools;
    specularNormalTools;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('gold', 'assets/textures/gold.png');
        this.load.image('gold-n', 'assets/textures/gold-n.png');
    }

    create ()
    {
        // Base image.
        this.image = this.add.image(640, 360, 'gold');
        Phaser.Actions.FitToRegion(this.image, 1);

        const lightImage = this.add.image(640, 360, 'gold-n')
        .setBlendMode(Phaser.BlendModes.ADD)
        .setScale(this.image.scale)
        .enableFilters();
        this.lightNormalTools = lightImage.filters.internal.addNormalTools({
            outputRatio: true
        });
        const cm = lightImage.filters.internal.addColorMatrix();
        cm.colorMatrix.set([
            0.5, 0, 0, 0, 0,
            0, 0.4, 0, 0, 0,
            0, 0, 0.25, 0, 0,
            0, 0, 0, 1, 0,
        ]);

        const specularImage = this.add.image(640, 360, 'gold-n')
        .setBlendMode(Phaser.BlendModes.ADD)
        .setScale(this.image.scale)
        .enableFilters();
        this.specularNormalTools = specularImage.filters.internal.addNormalTools({
            outputRatio: true,
            ratioRadius: 0.1,
        });

        // Uncomment the following to isolate parts of the image:
        // this.image.setVisible(false);
        // lightImage.setVisible(false);
        // specularImage.setVisible(false);
    }

    update (time, delta)
    {
        this.lightNormalTools.ratioVector.set(
            Math.cos(time / 1000),
            Math.sin(time / 1000),
            0.3
        );
        this.specularNormalTools.ratioVector.set(
            Math.cos(time / 1000),
            Math.sin(time / 1000),
            0.3
        );
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
