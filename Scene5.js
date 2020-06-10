
class Scene5 extends Phaser.Scene {
    constructor() {
        super('screen5');
    }

    create() {
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.scene.start('screen0');
        })

        this.ark = this.add.image(200, 200, 'ark').setOrigin(0, 0);
    }

    update() {

    }

}