class Example extends Phaser.Scene
{
    background;
    backgroundLight;
    environmentSky;
    environmentTrees;
    environmentCompositeTexture;
    environmentCompositeImage;
    redbubble;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/textures/alien-metal.jpg');
        this.load.image('bg_n', 'assets/textures/alien-metal-n.jpg');
        this.load.image('spider', 'assets/normal-maps/spider.png');
        this.load.image('spider_n', 'assets/normal-maps/spider_n.png');
        this.load.image('ms3-sky', 'assets/skies/ms3-sky.png');
        this.load.image('ms3-trees', 'assets/skies/ms3-trees.png');
        this.load.image('redbubble', 'assets/particles/redbubble.png');
    }

    create ()
    {
        this.environmentSky = this.add.tileSprite(0, 0, 1280, 444, 'ms3-sky').setTileScale(1.5).setOrigin(0).setVisible(false);
        this.environmentTrees = this.add.tileSprite(0, 400, 1280, 320, 'ms3-trees').setOrigin(0).setVisible(false);
        this.redbubble = this.add.image(640, 128, 'redbubble').setScale(2);

        this.environmentCompositeTexture = this.textures.addDynamicTexture('environmentComposite', 1280, 720);
        this.environmentCompositeImage = this.add.image(0, 0, 'environmentComposite').setOrigin(0);

        this.spider = this.add.image(640, 360, 'spider').enableFilters();
        this.spiderLight = this.spider.filters.internal.addImageLight({
            environmentMap: 'environmentComposite',
            normalMap: 'spider_n',
            colorFactor: [ 2, 2, 2 ],
            modelRotationSource: this.spider
        });
    }

    update (time, delta)
    {
        this.environmentSky.tilePositionX = time / 60;
        this.environmentTrees.tilePositionX = time / 20;
        this.redbubble.setPosition(512 * Math.cos(time / 1000) + 640, 256 * Math.sin(time / 1000) + 360);
        this.environmentCompositeTexture.draw(this.environmentSky).draw(this.environmentTrees).draw(this.redbubble).render();

        this.spider.setRotation(0.2 * Math.sin(time/3000));
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
