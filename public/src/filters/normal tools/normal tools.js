class Example extends Phaser.Scene
{
    imageN;
    normalTools;
    normalTexture;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('phaser', 'assets/sprites/phaser-large.png');
        this.load.image('phaser_n', 'assets/normal-maps/phaser-large_n.png');
        this.load.image('chrome', 'assets/skies/chrome.png');
    }

    create ()
    {
        this.add.gradient({
            start: { x: 0.5, y: 0.5 },
            shape: { x: 0.5, y: 0.5 },
            shapeMode: 2,
            bands: {
                colorStart: 0xffff44,
                colorEnd: 0xaa4422,
                colorSpace: 1
            }
        }, 640, 360, 1280, 720);

        // Get a texture with a modified normal map.
        this.imageN = this.add.image(0, 0, 'phaser_n').setOrigin(0).setVisible(false);
        this.normalTools = this.imageN.enableFilters().filters.internal.addNormalTools({});
        this.normalTexture = this.textures.addDynamicTexture('phaser_n_tooled', this.imageN.width, this.imageN.height);

        // Use the modified normal map.
        const image = this.add.image(640, 360, 'phaser');
        image.enableFilters().filters.internal.addImageLight({
            environmentMap: 'chrome',
            normalMap: 'phaser_n_tooled'
        });

        // Display the normal map, original and altered.
        this.add.image(320, 560, 'phaser_n').setScale(0.5);
        this.add.image(960, 560, 'phaser_n_tooled').setScale(0.5);
    }

    update (time, delta)
    {
        this.normalTools.setRotation(time / 1000);
        this.normalTexture.draw(this.imageN).render();
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
