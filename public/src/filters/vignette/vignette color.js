class Example extends Phaser.Scene
{
    image;
    vignette;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('anime-market', 'assets/pics/anime-market.png');
    }

    create ()
    {
        this.image = this.add.image(400, 300, 'anime-market').setScale(2);

        this.vignette = this.cameras.main.filters.external.addVignette(0.5, 0.37, 1, 0.25);
        this.vignette.color.setTo(127, 255, 255);
    }

    update (time, delta)
    {
        this.image.x = 16 * Math.sin(time / 765) + 640;
        this.image.y = 16 * Math.sin(time / 1000) + 512;
        this.image.rotation = 0.005 * Math.sin(time / 881);
        this.vignette.strength = 0.1 + 0.05 * Math.sin(time / 384);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: Example
};

let game = new Phaser.Game(config);
