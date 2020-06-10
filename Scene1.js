
class Scene1 extends Phaser.Scene {
    constructor() {
        super('screen1');
    }

    create() {
        //this.cameras.main.setBackgroundColor('#acdfe3');
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.scene.start('screen0');
        })

        this.horse = this.add.image(200, 200, 'horse').setOrigin(0, 0);


        this.input.on('pointerdown', () => {
            this.scene.start('screen2');
            console.log('change');
        })
    }

    update() {

    }

}