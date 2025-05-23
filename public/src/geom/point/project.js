class Example extends Phaser.Scene
{
    angle = 0;
    projectedPoint;
    point2;
    point;
    graphics;

    create ()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x2266aa }, fillStyle: { color: 0xaa0000 } });

        this.point = new Phaser.Math.Vector2(250, 0);
        this.point2 = new Phaser.Math.Vector2(250, 0);

        this.projectedPoint = this.point2.clone().project(this.point);

        this.input.on('pointermove', pointer =>
        {

            this.point2.copy(pointer);

            this.point2.x -= 400;
            this.point2.y -= 300;
        });
    }

    update ()
    {
        this.graphics.clear();

        this.angle += 0.005;

        // vector starting at 0/0
        this.point.setTo(Math.cos(this.angle) * 250, Math.sin(this.angle) * 250);

        // drawn from the center (as if center was 0/0)
        this.graphics.lineBetween(400, 300, 400 + this.point.x, 300 + this.point.y);

        this.graphics.lineStyle(2, 0x00aa00);
        this.graphics.lineBetween(400, 300, 400 + this.point2.x, 300 + this.point2.y);

        this.projectedPoint = this.point2.clone().project(this.point);

        // move relative to center
        this.projectedPoint.x += 400;
        this.projectedPoint.y += 300;

        this.graphics.fillPointShape(this.projectedPoint, 15);

        this.graphics.lineStyle(1, 0xaa0000);
        this.graphics.lineBetween(this.point2.x + 400, this.point2.y + 300, this.projectedPoint.x, this.projectedPoint.y);
    }
}

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
