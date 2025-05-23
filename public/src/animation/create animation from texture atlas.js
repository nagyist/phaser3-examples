class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.atlas('sea', 'assets/animations/seacreatures_json.png', 'assets/animations/seacreatures_json.json');

        //  Just a few images to use in our underwater scene
        this.load.image('undersea', 'assets/pics/undersea.jpg');
        this.load.image('coral', 'assets/pics/seabed.png');
    }

    create ()
    {
        this.add.image(400, 300, 'undersea');

        //  Create the Animations
        //  These are stored globally, and can be used by any Sprite

        //  In the texture atlas the jellyfish uses the frame names blueJellyfish0000 to blueJellyfish0032
        //  So we can use the handy generateFrameNames function to create this for us (and so on)
        this.anims.create({ key: 'jellyfish', frames: this.anims.generateFrameNames('sea', { prefix: 'blueJellyfish', end: 32, zeroPad: 4 }), repeat: -1 });
        this.anims.create({ key: 'crab', frames: this.anims.generateFrameNames('sea', { prefix: 'crab1', end: 25, zeroPad: 4 }), repeat: -1 });
        this.anims.create({ key: 'octopus', frames: this.anims.generateFrameNames('sea', { prefix: 'octopus', end: 24, zeroPad: 4 }), repeat: -1 });
        this.anims.create({ key: 'purpleFish', frames: this.anims.generateFrameNames('sea', { prefix: 'purpleFish', end: 20, zeroPad: 4 }), repeat: -1 });
        this.anims.create({ key: 'stingray', frames: this.anims.generateFrameNames('sea', { prefix: 'stingray', end: 23, zeroPad: 4 }), repeat: -1 });

        const jellyfish = this.add.sprite(400, 300, 'seacreatures').play('jellyfish');
        const bigCrab = this.add.sprite(550, 480, 'seacreatures').setOrigin(0).play('crab');
        const smallCrab = this.add.sprite(730, 515, 'seacreatures').setScale(0.5).setOrigin(0).play('crab');
        const octopus = this.add.sprite(100, 100, 'seacreatures').play('octopus');
        const fish = this.add.sprite(600, 200, 'seacreatures').play('purpleFish');
        const ray = this.add.sprite(100, 300, 'seacreatures').play('stingray');

        this.add.image(0, 466, 'coral').setOrigin(0);
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
