var sceneConfig = {
	key: 'load',
	pack: {
		files: [{
			type: 'plugin',
			key: 'rexwebfontloaderplugin',
			url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
			start: true
		}]
	}
};

class LoadData extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    preload() {
        // font
		// this.plugins.get('rexwebfontloaderplugin').addToScene(this);
		// var configFont = {
		//     google: {
		//         families: ['PT Sans', 'Noto Sans']
		//     }
		// };
        //this.load.rexWebFont(configFont);
        
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
        this.load.audio('incorrect_sound', 'assets/sounds/incorrect.mp3');
        this.load.audio('user_select', 'assets/sounds/user_select.mp3');
        this.load.audio('primary1', 'assets/sounds/primary_1.mp3');

        // image in start screen
        this.load.image('home_button', 'assets/images/home_button.png');
        this.load.image('car', 'assets/images/car.png');
        this.load.image('logo', 'assets/images/logo.png');
        this.load.spritesheet('startbutton', 'assets/images/startbutton.png', {
            frameWidth: 325,
            frameHeight: 55
        });
        this.load.image('tipsBear', 'assets/images/tips_bear/tips_bear2.png');

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
        this.scene.start('screen0');
    }
}