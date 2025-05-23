class Example extends Phaser.Scene
{
    controls;

    constructor ()
    {
        super({
            pack: {
                files: [
                    { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/3.8.95/SpinePluginDebug.js', sceneKey: 'spine' }
                ]
            }
        });
    }
    
    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('logo', 'assets/sprites/phaser.png');
        this.load.setPath('assets/spine/3.8/spineboy');
        this.load.spine('boy', 'spineboy-ess.json', 'spineboy-ess.atlas', false);
    }

    create ()
    {
        this.add.image(0, 0, 'logo').setOrigin(0);

        let container = this.add.container();

        // let container = this.add.spineContainer();

        this.add.image(500, 0, 'logo').setOrigin(0);

        let boy1 = this.add.spine(120, 400, 'boy', 'idle', true).setScale(0.5);
        let boy2 = this.add.spine(400, 400, 'boy', 'idle', true).setScale(0.5);

        container.add([ boy1, boy2 ]);

        // boy1.visible = false;
        boy2.visible = false;
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: Example
};

const game = new Phaser.Game(config);
