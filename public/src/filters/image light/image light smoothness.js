class Example extends Phaser.Scene
{
    background;
    backgroundLight;
    spider;
    spiderLight;
    environmentImage;
    environmentImageBlur;
    panoramaBlurTexture;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/textures/alien-metal.jpg');
        this.load.image('bg_n', 'assets/textures/alien-metal-n.jpg');
        this.load.image('spider', 'assets/normal-maps/spider.png');
        this.load.image('spider_n', 'assets/normal-maps/spider_n.png');
        this.load.image('environment', 'assets/panorama-360/KPNO-Drone-360-2-CC2-by-NOIRLab.jpg');
    }

    create ()
    {
        this.environmentImage = this.add.image(0, 0, 'environment').setOrigin(0).setVisible(false);
        this.environmentImageBlur = this.environmentImage.enableFilters().filters.internal.addPanoramaBlur({
            power: 2
        });
        this.environmentImageBlur.active = false;
        this.panoramaBlurTexture = this.textures.addDynamicTexture('environmentBlur', this.environmentImage.width, this.environmentImage.height);
        this.panoramaBlurTexture.draw(this.environmentImage).render();

        this.background = this.add.image(640, 360, 'bg').enableFilters().setScale(1.5);
        this.backgroundLight = this.background.filters.internal.addImageLight({
            environmentMap: 'environmentBlur',
            normalMap: 'bg_n',
            colorFactor: [ 1.5, 1.5, 1.5 ]
        });

        this.spider = this.add.image(320, 480, 'spider').enableFilters().setRotation(1).setScale(0.5);
        this.spiderLight = this.spider.filters.internal.addImageLight({
            environmentMap: 'environmentBlur',
            normalMap: 'spider_n',
            colorFactor: [ 2, 2, 2 ],
            modelRotationSource: this.spider
        });

        this.add.text(640, 48, 'Click to toggle light image smoothing', { fontSize: 24 }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.environmentImageBlur.active = !this.environmentImageBlur.active;
            this.panoramaBlurTexture.draw(this.environmentImage).render();
        });
    }

    update (time, delta)
    {
        const angle = time / 3000;
        this.spider.setPosition(128 * Math.cos(angle) + 300, 128 * Math.sin(angle) + 500)
        .setRotation(angle);
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
