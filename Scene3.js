
class Scene3 extends Phaser.Scene {
    constructor() {
        super('screen3');
    }

    create() {
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.scene.start('screen0');
        })

        this.boat = this.add.image(200, 200, 'boat').setOrigin(0, 0);

        this.input.on('pointerdown', () => {
            this.scene.start('screen4');
            console.log('change');
        })
    }

    update() {

    }

}