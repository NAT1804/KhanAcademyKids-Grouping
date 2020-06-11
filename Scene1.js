let horse = new Array('horse');
let posXHorse = [];
let posYHorse = [];
let penguin = new Array('penguin');
let posXPenguin = [];
let posYPenguin = [];
let totalObject = 5;
let numbersOfHorse;
let numbersOfPenguin;
let countHorseInStable = 0;
let countPenguinInIceHouse = 0;
let shakeHorseEnable = [];
let shakePenguinEnable = [];

class Scene1 extends Phaser.Scene {
	constructor() {
		super('screen1');
	}

	create() {
		// background color
		this.cameras.main.setBackgroundColor('#fffbe2');

		// home button
		this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
		this.soundBack = this.sound.add('back_button_sound');
		this.homeBtn.setInteractive({cursor:'pointer'});
		this.homeBtn.on('pointerdown', () => {
			this.soundBack.play();
			this.scene.start('screen0');
			music.stop();
		})

		// 2 group
		this.stable = this.add.image(window.innerWidth*0.22, window.innerHeight*0.1, 'stable').setOrigin(0, 0).setScale(0.7);
		this.iceHouse = this.add.image(window.innerWidth*0.55, window.innerHeight*0.12, 'ice_house').setOrigin(0, 0).setScale(0.7);
		
		//sound
		this.appearSound = this.sound.add('item_appear');
		this.correctSound = this.sound.add('correct_sound');
		this.correctChimeSound = this.sound.add('correct_chime_sound');

		// object
		numbersOfHorse = Phaser.Math.Between(1,totalObject-1);
		numbersOfPenguin = totalObject - numbersOfHorse;
		var factor = [0, 1, 2, 3, 4]; // coefficient
		this.shuffle(factor); // Location appears randomly
			
		for (let i=0 ; i<numbersOfHorse; ++i) {
			horse[i] = this.add.image(window.innerWidth*0.17+220*factor[i], window.innerHeight*0.63, 'horse').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXHorse[i] = window.innerWidth*0.17+220*factor[i];
			posYHorse[i] = window.innerHeight*0.63;
			shakeHorseEnable[i] = true;
			this.appearSound.play();
		}

		for (let i=0 ; i<numbersOfPenguin; ++i) {
			penguin[i] = this.add.image(window.innerWidth*0.17+220*factor[i+numbersOfHorse], window.innerHeight*0.63, 'penguin').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXPenguin[i] = window.innerWidth*0.17+220*factor[i+numbersOfHorse];
			posYPenguin[i] = window.innerHeight*0.63;
			shakePenguinEnable[i] = true;
			this.appearSound.play();
		}
		
		// tips bear
		var graphics = this.add.graphics();
		graphics.fillStyle(0xffffff, 1);
		graphics.fillCircle(window.innerWidth-20, window.innerHeight-20, 250);
		graphics.lineStyle(4, 0xf6f2d3, 1);
		graphics.strokeCircle(window.innerWidth-20, window.innerHeight-20, 250);
		this.tipsBear = this.add.image(window.innerWidth-120, window.innerHeight-185, 'tipsBear');

		// drag object
		this.input.on('pointerdown', this.startDrag, this);
	}

	startDrag(pointer, targets) {
		this.input.off('pointerdown', this.startDrag, this);
		this.dragObject = targets[0];
		this.input.on('pointermove', this.doDrag, this);
		this.input.on('pointerup', this.stopDrag, this);
	}

	doDrag(pointer) {
		if (this.dragObject != null) {
			this.dragObject.x = pointer.x-70;
			this.dragObject.y = pointer.y-70;
		}
	}

	stopDrag() {
		this.input.on('pointerdown', this.startDrag, this);
		this.input.off('pointermove', this.doDrag, this);
		this.input.off('pointerup', this.stopDrag, this);

		this.checkResult();
	}

	checkResult() {
		if (this.dragObject != null) {
			if (this.dragObject.x > window.innerWidth*0.22 && this.dragObject.x < window.innerWidth*0.22+283 
				&& this.dragObject.y > window.innerHeight*0.08 && this.dragObject.y < window.innerHeight*0.08+226) {
				for (let i=0; i<numbersOfHorse; ++i) {
					if (this.dragObject == horse[i]) {
						console.log('Status : correct');
						horse[i].setScale(0.45);
						horse[i].disableInteractive();
						this.dragObject.x = window.innerWidth*0.37 - countHorseInStable*100;
						this.dragObject.y = window.innerHeight*0.31;
						countHorseInStable++;
						shakeHorseEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfPenguin; ++i) {
					if (this.dragObject == penguin[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXPenguin[i] - posX);
						this.dragObject.y += (posYPenguin[i] - posY);
					}
				}
				console.log('Location : stable');
			}
			else if (this.dragObject.x > window.innerWidth*0.55 && this.dragObject.x < window.innerWidth*0.55+286 
				&& this.dragObject.y > window.innerHeight*0.1 && this.dragObject.y < window.innerHeight*0.1+204) {
				for (let i=0; i<numbersOfPenguin; ++i) {
					if (this.dragObject == penguin[i]) {
						console.log('Status : correct');
						penguin[i].setScale(0.45);
						penguin[i].disableInteractive();
						this.dragObject.x = window.innerWidth*0.53 + countPenguinInIceHouse*100;
						this.dragObject.y = window.innerHeight*0.31;
						countPenguinInIceHouse++;
						shakePenguinEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfHorse; ++i) {
					if (this.dragObject == horse[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXHorse[i] - posX);
						this.dragObject.y += (posYHorse - posY);
					}
				}
				console.log('Location : ice_house');
			}
			else {
				console.log('Location : nothing');
				var posX = this.dragObject.x;
				var posY = this.dragObject.y;
				for (let i=0; i<numbersOfHorse; ++i) {
					if (this.dragObject == horse[i]) {
						this.dragObject.x += (posXHorse[i] - posX);
						this.dragObject.y += (posYHorse[i] - posY);
					}
				}
				for (let i=0; i<numbersOfPenguin; ++i) {
					if (this.dragObject == penguin[i]) {
						this.dragObject.x += (posXPenguin[i] - posX);
						this.dragObject.y += (posYPenguin[i] - posY);
					}
				}
			}

			this.checkFinish();
		}    
	}

	shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
		  let j = Math.floor(Math.random() * (i + 1));
		  [array[i], array[j]] = [array[j], array[i]];
		}
	}

	reset() {
		horse = new Array('horse');
		posXHorse = [];
		posYHorse = [];
		penguin = new Array('penguin');
		posXPenguin = [];
		posYPenguin = [];
		totalObject = 5;
		numbersOfHorse;
		numbersOfPenguin;
		countHorseInStable = 0;
		countPenguinInIceHouse = 0;
		shakeHorseEnable = [];
		shakePenguinEnable = [];
	}

	checkFinish() {
		if ((countHorseInStable + countPenguinInIceHouse) == 5) {
			this.correctChimeSound.play();
			this.car = this.add.image(window.innerWidth*0.92, window.innerHeight*0.05, 'car').setOrigin(0, 0);
			this.changeScene = this.time.addEvent({
				delay: 2000,
				callback: () => {
					this.reset();
					this.scene.start('screen2');
				},
				loop: false
			})
		}
	}

	update() {
		
		for (let i=0; i<numbersOfHorse; ++i) {
			if (shakeHorseEnable[i]) {
				horse[i].rotation += ((Math.random()-0.5)/200);
			}
		}
		for (let i=0; i<numbersOfPenguin; ++i) {
			if (shakePenguinEnable[i]) {
				penguin[i].rotation += ((Math.random()-0.5)/200);
			}
		}
		
	}

}