var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#cdcdcd',
    scene: {
        preload: preload,
        create: create,
        update: update,
        pack: {
            files: [
                { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/spine4.1/SpinePluginDebug.js', sceneKey: 'spine' }
            ]
        }
    }
};

var controls;

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
    this.load.image('logo', 'assets/sprites/phaser.png');

    this.load.setPath('assets/spine/4.1/spineboy');

    this.load.spine('boy', 'spineboy-pro.json', 'spineboy-pma.atlas', true);
}

function create ()
{
    this.add.image(0, 0, 'logo').setOrigin(0);

    var spineBoy = this.add.spine(400, 600, 'boy', 'idle', true);

    spineBoy.drawDebug = true;

    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.8,
        drag: 0.01,
        maxSpeed: 1.4
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
}

function update (time, delta)
{
    controls.update(delta);
}
