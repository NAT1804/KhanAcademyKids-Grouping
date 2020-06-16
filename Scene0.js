var musicCofig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

var music;

class Scene0 extends Phaser.Scene {
    constructor() {
        super('screen0');
    }

    create() {
        // image in screen
        this.logo = this.add.image(0, 0, 'logo').setOrigin(0, 0);
        this.stable = this.add.image(window.innerWidth*0.22, window.innerHeight*0.1, 'stable').setOrigin(0, 0);
        this.iceHouse = this.add.image(window.innerWidth*0.55, window.innerHeight*0.12, 'ice_house').setOrigin(0, 0);
        for (let i=0 ; i<3; ++i) {
            this.penguin = this.add.image(window.innerWidth*0.17+220*i, window.innerHeight*0.63, 'penguin').setOrigin(0, 0);
        }
        this.horse = this.add.image(window.innerWidth*0.17+210*3, window.innerHeight*0.63, 'horse').setOrigin(0, 0);
        this.penguin = this.add.image(window.innerWidth*0.17+220*4, window.innerHeight*0.63, 'penguin').setOrigin(0, 0);

        // music
        let rdMusic = Phaser.Math.Between(1, 15);
        music = this.sound.add('music'+rdMusic);
        music.play(musicCofig);

        // start button
        this.userSelect = this.sound.add('user_select');
        this.startbutton = this.add.sprite(window.innerWidth*0.407, window.innerHeight*0.542, 'startbutton').setOrigin(0, 0).setInteractive({cursor:'pointer'});
        this.startbutton.on('pointerover', () => {
            this.startbutton.setFrame(1);
        })
        this.startbutton.on('pointerout', () => {
            this.startbutton.setFrame(0);
        })
        this.startbutton.on('pointerdown', () => {
            this.userSelect.play();
            this.scene.start('screen1');
        })

        // header
        this.header = this.add.text(window.innerWidth*0.41, window.innerHeight*0.54, 'Follow 2 Rules', {
            fontSize: 50,
            color: '#000000',
            //fontFamily: 'PT Sans'
        })
    }

}