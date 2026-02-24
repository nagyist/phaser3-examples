class Example extends Phaser.Scene
{
    stonesN;
    normalTools;
    normalTexture;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('stones', 'assets/normal-maps/stones.png');
        this.load.image('stones_n', 'assets/normal-maps/stones_n.png');
        this.load.image('environment', 'assets/skies/grass.jpg');
    }

    create ()
    {
        this.stonesN = this.add.image(0, 0, 'stones_n').setOrigin(0).setVisible(false).enableFilters();
        this.normalTools = this.stonesN.filters.internal.addNormalTools();
        this.normalTexture = this.textures.addDynamicTexture('stones_n_tooled', this.stonesN.width, this.stonesN.height);

        const stones = this.add.image(640, 360, 'stones').enableFilters();
        Phaser.Actions.FitToRegion(stones, 1);
        stones.filters.internal.addImageLight({
            environmentMap: 'environment',
            normalMap: 'stones_n_tooled'
        });
    }

    update (time, delta)
    {
        // Bend the surface normals to or away from the camera.
        this.normalTools.facingPower = 1.5 + Math.sin(time / 200);
        this.normalTexture.draw(this.stonesN).render();
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
