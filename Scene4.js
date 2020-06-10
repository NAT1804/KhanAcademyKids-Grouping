
class Scene4 extends Phaser.Scene {
    constructor() {
        super('screen4');
    }

    create() {
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.scene.start('screen0');
        })

        this.tent = this.add.image(200, 200, 'tent').setOrigin(0, 0);

        this.input.on('pointerdown', () => {
            this.scene.start('screen5');
            console.log('change');
        })
    }

    update() {

    }

}