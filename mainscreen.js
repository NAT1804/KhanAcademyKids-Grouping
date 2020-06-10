class Scene1 extends Phaser.Scene {
    constructor() {
        super('mainscreen');
    }

    create() {
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.scene.start('startscreen');
        })

        this.horse = this.add.image(200, 200, 'horse').setOrigin(0, 0);
    }

    update() {

    }

}