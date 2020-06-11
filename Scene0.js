var sceneConfig = {
	key: 'screen0',
	pack: {
		files: [{
			type: 'plugin',
			key: 'rexwebfontloaderplugin',
			url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
			start: true
		}]
	}
};

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
        super(sceneConfig);
    }

    preload() {
        // font
		this.plugins.get('rexwebfontloaderplugin').addToScene(this);
		var configFont = {
		    google: {
		        families: ['PT Sans', 'Noto Sans']
		    }
		};
        this.load.rexWebFont(configFont);
        
        // sound 
        this.load.audio('back_button_sound', 'assets/sounds/back_button.mp3');
        this.load.audio('item_appear', 'assets/sounds/ItemAppear.mp3');
        this.load.audio('correct_sound', 'assets/sounds/correct.mp3');
        this.load.audio('correct_chime_sound', 'assets/sounds/correct_chime.mp3');
        this.load.audio('music1', 'assets/sounds/music_bingo.mp3');
        this.load.audio('music2', 'assets/sounds/music_comingroundthemoutain.mp3');
        this.load.audio('music3', 'assets/sounds/music_downbybay.mp3');
        this.load.audio('music4', 'assets/sounds/music_headshoulders.mp3');
        this.load.audio('music5', 'assets/sounds/music_hickorydickory.mp3');
        this.load.audio('music6', 'assets/sounds/music_ifyouarehappy.mp3');
        this.load.audio('music7', 'assets/sounds/music_muffinman.mp3');
        this.load.audio('music8', 'assets/sounds/music_mullberrybush.mp3');
        this.load.audio('music9', 'assets/sounds/music_mybonnie.mp3');
        this.load.audio('music10', 'assets/sounds/music_railroad.mp3');
        this.load.audio('music11', 'assets/sounds/music_sixlittleducks.mp3');
        this.load.audio('music12', 'assets/sounds/music_skiptomylou.mp3');
        this.load.audio('music13', 'assets/sounds/music_thisoldman.mp3');
        this.load.audio('music14', 'assets/sounds/music_threeblindmice.mp3');
        this.load.audio('music15', 'assets/sounds/music_yankeedoodle.mp3');

        // image in start screen
        this.load.image('home_button', 'assets/images/home_button.png');
        this.load.image('car', 'assets/images/car.png');
        this.load.image('logo', 'assets/images/logo.png');
        this.load.spritesheet('startbutton', 'assets/images/startbutton.png', {
            frameWidth: 325,
            frameHeight: 55
        });
        this.load.image('tipsBear', 'assets/images/tips_bear2.png');

        // image in screen 1
        this.load.image('horse', 'assets/images/horse2.png');
        this.load.image('stable', 'assets/images/stable.png');
        this.load.image('penguin', 'assets/images/penguin.png');
        this.load.image('ice_house', 'assets/images/ice_house.png');

        // image in screen 2
        this.load.image('ratel', 'assets/images/ratel.png');
        this.load.image('hen', 'assets/images/hen.png');
        this.load.image('fence', 'assets/images/fence.png');
        this.load.image('basket', 'assets/images/basket.png');

        // image in screen 3
        this.load.image('umbrella', 'assets/images/umbrella.png');
        this.load.image('sea', 'assets/images/sea.png');
        this.load.image('droplets', 'assets/images/droplets.png');
        this.load.image('boat', 'assets/images/boat.png');

        // image in screen 4
        this.load.image('tent', 'assets/images/tent.png');
        this.load.image('sand', 'assets/images/sand.png');
        this.load.image('bucket', 'assets/images/bucket.png');
        this.load.image('bear', 'assets/images/bear.png');

        // image in screen 5
        this.load.image('ark', 'assets/images/ark.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('mailbox', 'assets/images/mailbox.png');
        this.load.image('letters', 'assets/images/letters.png');

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
        this.startbutton = this.add.sprite(window.innerWidth*0.407, window.innerHeight*0.542, 'startbutton').setOrigin(0, 0).setInteractive({cursor:'pointer'});
        this.startbutton.on('pointerover', () => {
            this.startbutton.setFrame(1);
        })
        this.startbutton.on('pointerout', () => {
            this.startbutton.setFrame(0);
        })
        this.startbutton.on('pointerdown', () => {
            this.scene.start('screen1');
        })

        // header
        this.header = this.add.text(window.innerWidth*0.41, window.innerHeight*0.54, 'Follow 2 Rules', {
            fontSize: 50,
            color: '#000000',
            fontFamily: 'PT Sans'
        })
    }

}