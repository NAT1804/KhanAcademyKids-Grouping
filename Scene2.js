
class Scene2 extends Phaser.Scene {
    constructor() {
        super('screen2');
    }

    create() {
        this.cameras.main.setBackgroundColor('#acdfe3');
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.scene.start('screen0');
        })

        this.ratel = this.add.image(200, 200, 'ratel').setOrigin(0, 0);


        this.input.on('pointerdown', () => {
            this.scene.start('screen3');
            console.log('change');
        })
    }

    update() {

    }

}