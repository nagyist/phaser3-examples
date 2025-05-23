var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#cc9999',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('brush', 'assets/sprites/brush2.png');
}

function create ()
{
    var rt = this.add.renderTexture(0, 0, 800, 600);

    var brush = this.textures.getFrame('brush');

    var hsv = Phaser.Display.Color.HSVColorWheel();
    var i = 0;

    this.input.on('pointermove', function (pointer) {

        if (pointer.isDown)
        {
            var points = pointer.getInterpolatedPosition(30);
            var first = false;

            points.forEach(function (p) {

                if (!first)
                {
                    color = 0x000000;
                    first = true;
                }
                else
                {
                    color = hsv[i].color;
                }

                rt.draw(brush, p.x - 16, p.y - 16, 1, color);

            });

            i++;

            if (i === 360)
            {
                i = 0;
            }
        }

    }, this);

    this.input.on('pointerdown', function (pointer) {

        rt.draw(brush, pointer.x - 16, pointer.y - 16, 1, hsv[i].color);

        i++;

        if (i === 360)
        {
            i = 0;
        }

    }, this);

}
