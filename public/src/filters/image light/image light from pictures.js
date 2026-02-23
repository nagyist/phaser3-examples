class Example extends Phaser.Scene
{
    background;
    backgroundLight;
    spider;
    spiderLight;
    environmentIndex;
    environmentPreview;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('stones', 'assets/normal-maps/stones.png');
        this.load.image('stones_n', 'assets/normal-maps/stones_n.png');
        this.load.image('spider', 'assets/normal-maps/spider.png');
        this.load.image('spider_n', 'assets/normal-maps/spider_n.png');

        // A series of images to provide light to the scene.
        // Only the NOIRLab image is a true panorama,
        // but the others all work great with a default view.
        this.load.image('environment1', 'assets/pics/town-wreck.jpg');
        this.load.image('environment2', 'assets/pics/turkey-1985086.jpg');
        this.load.image('environment3', 'assets/pics/undersea.jpg');
        this.load.image('environment4', 'assets/skies/chrome.png');
        this.load.image('environment5', 'assets/skies/fire.png');
        this.load.image('environment6', 'assets/skies/spookysky.jpg');
        this.load.image('environment7', 'assets/panorama-360/KPNO-Drone-360-2-CC2-by-NOIRLab.jpg');
    }

    create ()
    {
        this.background = this.add.image(640, 360, 'stones').enableFilters().setScale(1.5);
        this.backgroundLight = this.background.filters.internal.addImageLight({
            environmentMap: 'environment3',
            normalMap: 'stones_n',
            colorFactor: [ 1.5, 1.5, 1.5 ]
        });

        this.spider = this.add.image(320, 480, 'spider').enableFilters().setRotation(1).setScale(0.5);
        this.spiderLight = this.spider.filters.internal.addImageLight({
            environmentMap: 'environment3',
            normalMap: 'spider_n',
            colorFactor: [ 2, 2, 2 ],
            modelRotationSource: this.spider
        });

        this.add.text(640, 48, 'Click to change light image', { fontSize: 24 }).setOrigin(0.5);

        this.environmentPreview = this.add.image(1100, 600, 'environment3').setScale(0.2);

        this.environmentIndex = 3;

        this.input.on('pointerdown', () => {
            this.environmentIndex++;
            if (this.environmentIndex > 7) { this.environmentIndex = 1; }
            const texture = `environment${this.environmentIndex}`;
            this.backgroundLight.setEnvironmentMap(texture);
            this.spiderLight.setEnvironmentMap(texture);
            this.environmentPreview.setTexture(texture);
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
