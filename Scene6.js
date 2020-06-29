class Scene6 extends Phaser.Scene {
    constructor() {
        super('endscreen');
    }

    create() {
        this.cameras.main.setBackgroundColor('#fffbe2');
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.soundBack = this.sound.add('back_button_sound');
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.soundBack.play();
            music.stop();
            this.scene.start('screen0');
        })

        this.byeText = this.add.text(window.innerWidth*0.27, window.innerHeight*0.45, 'You have completed the exercise!', {
            fontSize: 50,
            color: '#000000',
            fontFamily: 'PT Sans'
        })
    }
}