class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('orb-n', 'assets/normal-maps/orb-256.png');

        // For viewing at any angle, a 360 degree panorama with 180 degree height is ideal.
        // You can acquire many such assets from Adobe Stock or other sources.
        this.load.image('environment', 'assets/panorama-360/KPNO-Drone-360-2-CC2-by-NOIRLab.jpg');
    }

    create ()
    {
        const background = this.add.gradient({
            start: { x: 0, y: 1 },
            shape: { x: 0, y: -1 },
            bands: {
                colorStart: 0x2d3440,
                colorEnd: 0x204070
            },
        }, 640, 360, 1280, 720);

        // Create an object as the base for a PanoramaBlur.
        const envBlurSource = this.add.image(0, 0, 'environment').setOrigin(0);
        const envW = envBlurSource.width;
        const envH = envBlurSource.height;
        const panoramaBlur = envBlurSource.enableFilters().filters.internal.addPanoramaBlur({
            samplesX: envW / 16, // Be careful: more samples are much more costly!
            samplexY: envH / 16,
            power: 2 // Emphasize sun over darker areas.
        });

        // Render panorama at blur 1...
        const envTexture1 = this.textures.addDynamicTexture('environment-blur-1', envW, envH);
        envTexture1.draw(envBlurSource).render();

        // ... and at blur 0.5...
        const envTexture2 = this.textures.addDynamicTexture('environment-blur-0.5', envW, envH);
        panoramaBlur.power = 1.5;
        panoramaBlur.radius = 0.5;
        envTexture2.draw(envBlurSource).render();

        // ... and at blur 0.25...
        const envTexture3 = this.textures.addDynamicTexture('environment-blur-0.25', envW, envH);
        panoramaBlur.power = 1.25;
        panoramaBlur.radius = 0.25;
        envTexture3.draw(envBlurSource).render();

        // ... and at blur 0.125...
        const envTexture4 = this.textures.addDynamicTexture('environment-blur-0.125', envW, envH);
        panoramaBlur.power = 1.125;
        panoramaBlur.radius = 0.125;
        envTexture4.draw(envBlurSource).render();

        // ... and at blur 0.0625...
        const envTexture5 = this.textures.addDynamicTexture('environment-blur-0.0625', envW, envH);
        panoramaBlur.power = 1.0625;
        panoramaBlur.radius = 0.0625;
        envTexture5.draw(envBlurSource).render();

        // Remove blur source because blurs are costly per-frame.
        envBlurSource.destroy();

        // Display textures as clickable icons.
        this.add.text(320, 32, 'Click a blur level').setOrigin(0.5);
        const image0 = this.add.image(160, 200, 'environment').setScale(0.2);
        const image1 = this.add.image(160, 400, 'environment-blur-0.125').setScale(0.2);
        const image2 = this.add.image(160, 600, 'environment-blur-0.5').setScale(0.2);
        const image3 = this.add.image(480, 200, 'environment-blur-0.0625').setScale(0.2);
        const image4 = this.add.image(480, 400, 'environment-blur-0.25').setScale(0.2);
        const image5 = this.add.image(480, 600, 'environment-blur-1').setScale(0.2);

        // Draw an orb for reuse.
        const rect = this.add.rectangle(0, 0, 512, 512, 0xffffff);
        rect.enableFilters().filters.internal.addMask('orb-n');
        const orbTexture = this.textures.addDynamicTexture('orb', 512, 512);
        orbTexture.draw(rect, 256, 256).render();
        rect.destroy();

        // Light an orb with the selected texture.
        const orb = this.add.image(960, 360, 'orb');
        this.orbLightImage = orb.enableFilters().filters.internal.addImageLight({
            environmentMap: 'environment',
            normalMap: 'orb-n'
        });

        // Allow texture swapping.
        const setClick = (sprite, texture) => {
            sprite.setInteractive().on('pointerdown', () => {
                this.orbLightImage.setEnvironmentMap(texture);
            });
        }
        setClick(image0, 'environment');
        setClick(image1, 'environment-blur-0.125');
        setClick(image2, 'environment-blur-0.5');
        setClick(image3, 'environment-blur-0.0625');
        setClick(image4, 'environment-blur-0.25');
        setClick(image5, 'environment-blur-1');
    }

    update (time, delta)
    {
        this.orbLightImage.viewMatrix
        .identity() // Reset matrix
        .rotateY(time / 5000); // Look left/right
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
