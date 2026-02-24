class Example extends Phaser.Scene
{
    create ()
    {
        this.add.text(640, 50, 'Original gradient').setOrigin(0.5);
        const gradient1 = this.add.gradient({
            bands: {
                colorStart: 0xff0000,
                colorEnd: 0xff0001,
                colorSpace: 2
            }
        }, 640, 150, 1280, 128);

        this.add.text(640, 250, 'Quantized gradient').setOrigin(0.5);
        const gradient2 = this.add.gradient({
            bands: {
                colorStart: 0xff0000,
                colorEnd: 0xff0001,
                colorSpace: 2
            }
        }, 640, 350, 1280, 128);
        gradient2.enableFilters().filters.internal.addQuantize({
            steps: [ 8, 2, 2, 2 ],
            mode: 1 // HSVA
        });

        this.add.text(640, 450, 'Quantized gradient with dither').setOrigin(0.5);
        const gradient3 = this.add.gradient({
            bands: {
                colorStart: 0xff0000,
                colorEnd: 0xff0001,
                colorSpace: 2
            }
        }, 640, 550, 1280, 128);
        gradient3.enableFilters().filters.internal.addQuantize({
            steps: [ 8, 2, 2, 2 ],
            mode: 1, // HSVA
            dither: true
        });
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
