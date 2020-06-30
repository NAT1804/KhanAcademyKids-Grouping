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
		this.plugins.get('rexwebfontloaderplugin').addToScene(this);
		var configFont = {
		    google: {
		        families: ['PT Sans', 'Noto Sans']
		    }
		};
        this.load.rexWebFont(configFont);

        // load data
        this.load.pack('data', 'data.json');

        // this.load.image('tipsBear', 'assets/images/tips_bear/tips_bear2.png');
        
        // this.load.spritesheet('car2', 'assets/images/spritecar.png', {
        //     frameWidth: 108,
        //     frameHeight: 84
        // })

        // this.load.spritesheet('beartalk', 'assets/images/tips_bear/beartalk.png', {
        //     frameWidth: 200,
        //     frameHeight: 386
        // })

        // this.load.spritesheet('bearright', 'assets/images/tips_bear/bearright.png', {
        //     frameWidth: 200,
        //     frameHeight: 386
        // })

        // this.load.spritesheet('bearwrong', 'assets/images/tips_bear/bearwrong.png', {
        //     frameWidth: 200,
        //     frameHeight: 386
        // })

    }   

    create() {
        this.scene.start('screen0');
    }
}