var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: {
        preload: preload,
        create: create,
        update: update,
        pack: {
            files: [
                { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/3.8.95/SpinePluginDebug.js', sceneKey: 'spine' }
            ]
        }
    }
};

var controls;

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('logo', 'assets/sprites/phaser.png');

    this.load.setPath('assets/spine/3.8/spineboy');

    this.load.spine('boy', 'spineboy-pro.json', 'spineboy-pro.atlas', true);
}

function create ()
{
    this.add.image(0, 0, 'logo').setOrigin(0);

    var spineBoy3 = this.add.spine(650, 300, 'boy', 'death', true);

    spineBoy3.setScale(0.4).setFlipX(true);

    var spineBoy2 = this.add.spine(100, 300, 'boy', 'shoot', true);

    spineBoy2.setScale(0.4);

    var spineBoy = this.add.spine(350, 600, 'boy', 'run', true);

    spineBoy.setScale(0.7);

    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.5,
        drag: 0.01,
        maxSpeed: 1.2
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
}

function update (time, delta)
{
    controls.update(delta);
}
