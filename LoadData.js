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
        this.load.pack('pack1', 'data.json');

        this.load.image('tipsBear', 'assets/images/tips_bear/tips_bear2.png');
    }   

    create() {
        this.scene.start('screen0');
    }
}