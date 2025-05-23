// #module
import BendRotationWaves from './assets/rendernodes/FilterBendRotationWaves.js';

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('volcano', 'assets/pics/rick-and-morty-by-sawuinhaff-da64e7y.png');
        this.load.image('hotdog', 'assets/sprites/hotdog.png');
    }

    create ()
    {
        this.add.image(400, 300, 'volcano');
        this.add.image(400, 300, 'hotdog').setScrollFactor(0);

        this.cameras.main.filters.external.add(new BendRotationWaves.Controller(this.cameras.main));

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    }

    update (t, delta)
    {
        this.controls.update(delta);
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 512,
    height: 512,
    backgroundColor: '#000000',
    scene: Example,
    renderNodes: {
        FilterBendRotationWaves: BendRotationWaves.Filter
    }
};

const game = new Phaser.Game(config);
