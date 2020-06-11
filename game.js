
var config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		width: window.innerWidth,
		height: window.innerHeight,
		parent: 'game',
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	backgroundColor: '#fad645',
	scene: [Scene0, Scene1, Scene2, Scene3, Scene4, Scene5],
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
};
var game = new Phaser.Game(config);