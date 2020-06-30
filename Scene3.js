let droplets = new Array('droplets');
let posXDroplets = [];
let posYDroplets = [];
let boat = new Array('boat');
let posXBoat = [];
let posYBoat = [];
var totalObject = 5;
let numbersOfDroplets = 0;
let numbersOfBoat = 0;
let countDropletsInUmbrella = 0;
let countBoatInSea = 0;
let shakeDropletsEnable = [];
let shakeBoatEnable = [];
let spinDropletsEnable = [];
let spinBoatEnable = [];

class Scene3 extends Phaser.Scene {
    constructor() {
        super('screen3');
    }

    create() {
        this.cameras.main.setBackgroundColor('#fffbe2');
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.soundBack = this.sound.add('back_button_sound');
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            music.stop();
            this.tipsBear.soundBack.play();
            this.scene.start('screen0');
        })

        // 2 group
		this.umbrella = this.add.image(window.innerWidth*0.22, window.innerHeight*0.1, 'umbrella').setOrigin(0, 0).setScale(0.7);
		this.sea = this.add.image(window.innerWidth*0.55, window.innerHeight*0.26, 'sea').setOrigin(0, 0).setScale(0.7);
		
		//sound
		this.appearSound = this.sound.add('item_appear');
		this.correctSound = this.sound.add('correct_sound');
		this.correctChimeSound = this.sound.add('correct_chime_sound');
		this.incorrectSound = this.sound.add('incorrect_sound');
		this.audioRequest = this.sound.add('audio_request3');
		this.awesomeSound = this.sound.add('awesome');
		this.goodJobSound = this.sound.add('goodjob');
		this.greatJobSound = this.sound.add('greatjob');
		this.tryAgainSound = this.sound.add('tryagain');
		this.oppsSound = this.sound.add('oopsSound');

		// object
		numbersOfDroplets = Phaser.Math.Between(1,totalObject-1);
		numbersOfBoat = totalObject - numbersOfDroplets;
		var factor = [0, 1, 2, 3, 4]; // coefficient
		this.shuffle(factor); // Location appears randomly
			
		for (let i=0 ; i<numbersOfDroplets; ++i) {
			droplets[i] = this.add.image(window.innerWidth*0.17+220*factor[i], window.innerHeight*0.63, 'droplets').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXDroplets[i] = window.innerWidth*0.17+220*factor[i];
			posYDroplets[i] = window.innerHeight*0.63;
			shakeDropletsEnable[i] = true;
			spinDropletsEnable[i] = false;
			//this.appearSound.play();
		}

		for (let i=0 ; i<numbersOfBoat; ++i) {
			boat[i] = this.add.image(window.innerWidth*0.17+220*factor[i+numbersOfDroplets], window.innerHeight*0.69, 'boat').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXBoat[i] = window.innerWidth*0.17+220*factor[i+numbersOfDroplets];
			posYBoat[i] = window.innerHeight*0.69;
			shakeBoatEnable[i] = true;
			spinBoatEnable[i] = false;
			//this.appearSound.play();
		}

        var graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(window.innerWidth-20, window.innerHeight-20, 250);
        graphics.lineStyle(3, 0xf6f2d3, 1);
        graphics.strokeCircle(window.innerWidth-20, window.innerHeight-20, 250);
		this.tipsBear1 = this.add.image(window.innerWidth-120, window.innerHeight-190, 'tipsBear');
		this.anims.create({
			key: 'talk',
			frames: this.anims.generateFrameNumbers('beartalk'),
			frameRate: 3,
			repeat: 0
		})
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('bearright'),
			frameRate: 4,
			repeat: 0
		})
		this.anims.create({
			key: 'wrong',
			frames: this.anims.generateFrameNumbers('bearwrong'),
			frameRate: 4,
			repeat: 0
		})
		this.tipsBear = this.add.sprite(window.innerWidth-120, window.innerHeight-185, 'beartalk').play('talk');

		// audio request
		this.audioRequest.play();

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
			if (this.dragObject.x > window.innerWidth*0.22 && this.dragObject.x < window.innerWidth*0.22+261 
				&& this.dragObject.y > window.innerHeight*0.08 && this.dragObject.y < window.innerHeight*0.08+283) {
				for (let i=0; i<numbersOfDroplets; ++i) {
					if (this.dragObject == droplets[i]) {
						console.log('Status : correct');
						droplets[i].setScale(0.45);
						droplets[i].disableInteractive();
						if (i % 2 == 0) {
							spinDropletsEnable[i] = true;
						}
						this.tweens.add({
							targets: this.dragObject,
							x: window.innerWidth*0.38 - countDropletsInUmbrella*100,
							y: window.innerHeight*0.33,
							ease: 'Power0',
							duration: 500
						})
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								spinDropletsEnable[i] = false;
								
							},
							loop: false
						})
						this.tipsBear.play('right');
						countDropletsInUmbrella++;
						shakeDropletsEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfBoat; ++i) {
					if (this.dragObject == boat[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXBoat[i] - posX),
							y: this.dragObject.y + (posYBoat[i] - posY),
							ease: 'Power0',
							duration: 1000
						})
						this.incorrectSound.play();
						let rdWrongSound = Phaser.Math.Between(0, 1);
						switch(rdWrongSound) {
							case 0:
								this.oppsSound.play();
								break;
							case 1:
								this.tryAgainSound.play();
								break;
						}
						this.tipsBear.play('wrong');
						this.time.addEvent({
							delay: 1000,
							callback: () => {
								this.tipsBear.play('talk');
								this.audioRequest.play();
							}
						})
					}
				}
				console.log('Location : umbrella');
			}
			else if (this.dragObject.x > window.innerWidth*0.55 && this.dragObject.x < window.innerWidth*0.55+340 
				&& this.dragObject.y > window.innerHeight*0.24 && this.dragObject.y < window.innerHeight*0.24+193) {
				for (let i=0; i<numbersOfBoat; ++i) {
					if (this.dragObject == boat[i]) {
						console.log('Status : correct');
						boat[i].setScale(0.45);
						boat[i].disableInteractive();
						if (i % 2 == 0) {
							spinBoatEnable[i] = true;
						}
						this.tweens.add({
							targets: this.dragObject,
							x: window.innerWidth*0.5 + countBoatInSea*100,
							y: window.innerHeight*0.42,
							ease: 'Power0',
							duration: 500
						})
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								spinBoatEnable[i] = false;	
							},
							loop: false
						})
						this.tipsBear.play('right');
						countBoatInSea++;
						shakeBoatEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfDroplets; ++i) {
					if (this.dragObject == droplets[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXDroplets[i] - posX),
							y: this.dragObject.y + (posYDroplets[i] - posY),
							ease: 'Power0',
							duration: 1000
						})
						this.incorrectSound.play();
						let rdWrongSound = Phaser.Math.Between(0, 1);
						switch(rdWrongSound) {
							case 0:
								this.oppsSound.play();
								break;
							case 1:
								this.tryAgainSound.play();
								break;
						}
						this.tipsBear.play('wrong');
						this.time.addEvent({
							delay: 1000,
							callback: () => {
								this.tipsBear.play('talk');
								this.audioRequest.play();
							}
						})
					}
				}
				console.log('Location : sea');
			}
			else {
				console.log('Location : nothing');
				var posX = this.dragObject.x;
				var posY = this.dragObject.y;
				for (let i=0; i<numbersOfDroplets; ++i) {
					if (this.dragObject == droplets[i]) {
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXDroplets[i] - posX),
							y: this.dragObject.y + (posYDroplets[i] - posY),
							ease: 'Power0',
							duration: 1000
						})
					}
				}
				for (let i=0; i<numbersOfBoat; ++i) {
					if (this.dragObject == boat[i]) {
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXBoat[i] - posX),
							y: this.dragObject.y + (posYBoat[i] - posY),
							ease: 'Power0',
							duration: 1000
						})
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
		droplets = new Array('droplets');
		posXDroplets = [];
		posYDroplets = [];
		boat = new Array('boat');
		posXBoat = [];
		posYBoat = [];
		totalObject = 5;
		numbersOfDroplets = 0;
		numbersOfBoat = 0;
		countDropletsInUmbrella = 0;
		countBoatInSea = 0;
		shakeDropletsEnable = [];
		shakeBoatEnable = [];
		spinDropletsEnable = [];
		spinBoatEnable = [];
	}

	checkFinish() {
		if ((countDropletsInUmbrella + countBoatInSea) == 5) {
			this.correctChimeSound.play();
			let rdCorrectSound = Phaser.Math.Between(0, 2);
			switch(rdCorrectSound) {
				case 0: 
					this.awesomeSound.play();
					break;
				case 1:
					this.goodJobSound.play();
					break;
				case 2:
					this.greatJobSound.play();
					break;
			}
			this.anims.create({
				key: 'runcar',
				frames: this.anims.generateFrameNumbers('car2'),
				frameRate: 5,
				repeat: 0
			})
			this.car = this.add.sprite(window.innerWidth*0.9, window.innerHeight*0.05, 'car2').setOrigin(0, 0);
			this.car.play('runcar');

			this.tween = this.tweens.add({
				targets: this.car,
				x: window.innerWidth*1.1,
				ease: 'Power1',
				delay: 800,
				duration: 1000
			})
			this.changeScene = this.time.addEvent({
				delay: 2500,
				callback: () => {
					this.reset();
					this.scene.start('screen4');
				},
				loop: false
			})
		}
	}

	update() {
		
		for (let i=0; i<numbersOfDroplets; ++i) {
			if (shakeDropletsEnable[i]) {
				droplets[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinDropletsEnable[i]) {
				droplets[i].rotation += 0.1;
			}
		}
		for (let i=0; i<numbersOfBoat; ++i) {
			if (shakeBoatEnable[i]) {
				boat[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinBoatEnable[i]) {
				boat[i].rotation += 0.1;
			}
		}
		
	}

}