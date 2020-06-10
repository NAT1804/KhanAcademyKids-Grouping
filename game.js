
var config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		width: window.innerWidth,
		height: window.innerHeight,
		parent: 'game',
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	backgroundColor: '#fffbe2',
	scene: [Scene0, Scene1],
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
};
var game = new Phaser.Game(config);