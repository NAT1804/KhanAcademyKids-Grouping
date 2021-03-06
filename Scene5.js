let coin = new Array('coin');
let posXCoin = [];
let posYCoin = [];
let letters = new Array('letters');
let posXLetters = [];
let posYLetters = [];
var totalObject = 5;
let numbersOfCoin = 0;
let numbersOfLetters = 0;
let countCoinInArk = 0;
let countLettersInMailbox = 0;
let shakeCoinEnable = [];
let shakeLettersEnable = [];
let spinCoinEnable = [];
let spinLettersEnable = [];
// let countObject = 0;

class Scene5 extends Phaser.Scene {
    constructor() {
        super('screen5');
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

        // 2 group
		this.ark = this.add.image(window.innerWidth*0.22, window.innerHeight*0.1, 'ark').setOrigin(0, 0).setScale(0.7);
		this.mailbox = this.add.image(window.innerWidth*0.55, window.innerHeight*0.12, 'mailbox').setOrigin(0, 0).setScale(0.7);
		
		//sound
		this.appearSound = this.sound.add('item_appear');
		this.correctSound = this.sound.add('correct_sound');
		this.correctChimeSound = this.sound.add('correct_chime_sound');
		this.incorrectSound = this.sound.add('incorrect_sound');
		this.audioRequest = this.sound.add('audio_request5');
		this.awesomeSound = this.sound.add('awesome');
		this.goodJobSound = this.sound.add('goodjob');
		this.greatJobSound = this.sound.add('greatjob');
		this.tryAgainSound = this.sound.add('tryagain');
		this.oppsSound = this.sound.add('oopsSound');

		// object
		numbersOfCoin = Phaser.Math.Between(1,totalObject-1);
		numbersOfLetters = totalObject - numbersOfCoin;
		var factor = [0, 1, 2, 3, 4]; // coefficient
		this.shuffle(factor); // Location appears randomly
			
		for (let i=0 ; i<numbersOfCoin; ++i) {
			coin[i] = this.add.image(window.innerWidth*0.17+220*factor[i], window.innerHeight*0.63, 'coin').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXCoin[i] = window.innerWidth*0.17+220*factor[i];
			posYCoin[i] = window.innerHeight*0.63;
			shakeCoinEnable[i] = true;
			spinCoinEnable[i] = false;
			//this.appearSound.play();
		}

		for (let i=0 ; i<numbersOfLetters; ++i) {
			letters[i] = this.add.image(window.innerWidth*0.17+220*factor[i+numbersOfCoin], window.innerHeight*0.63, 'letters').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXLetters[i] = window.innerWidth*0.17+220*factor[i+numbersOfCoin];
			posYLetters[i] = window.innerHeight*0.63;
			shakeLettersEnable[i] = true;
			spinLettersEnable[i] = false;
			//this.appearSound.play();
		}

        var graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(window.innerWidth-20, window.innerHeight-20, 250);
        graphics.lineStyle(3, 0xf6f2d3, 1);
        graphics.strokeCircle(window.innerWidth-20, window.innerHeight-20, 250);
		this.tipsBear1 = this.add.image(window.innerWidth-120, window.innerHeight-185, 'tipsBear');
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
			if (this.dragObject.x > window.innerWidth*0.22-50 && this.dragObject.x < window.innerWidth*0.22+284+50 
				&& this.dragObject.y > window.innerHeight*0.08-50 && this.dragObject.y < window.innerHeight*0.08+277+50) {
				for (let i=0; i<numbersOfCoin; ++i) {
					if (this.dragObject == coin[i]) {
						console.log('Status : correct');
						coin[i].setScale(0.45);
						coin[i].disableInteractive();
						if (i % 2 == 0) {
							spinCoinEnable[i] = true;
						}
						this.tweens.add({
							targets: this.dragObject,
							x: window.innerWidth*0.28 + countCoinInArk*110,
							y: window.innerHeight*0.37,
							ease: 'Power0',
							duration: 500
						})
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								spinCoinEnable[i] = false;	
							},
							loop: false
						})
						this.tipsBear.play('right');
						countCoinInArk++;
						if (countCoinInArk == 3) countCoinInArk = -1;
						countObject++;
						shakeCoinEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfLetters; ++i) {
					if (this.dragObject == letters[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXLetters[i] - posX),
							y: this.dragObject.y + (posYLetters[i] - posY),
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
							delay: 100,
							callback: () => {
								this.tipsBear.play('talk');
								this.audioRequest.play();
							}
						})
					}
				}
				console.log('Location : ark');
			}
			else if (this.dragObject.x > window.innerWidth*0.55-50 && this.dragObject.x < window.innerWidth*0.55+243+50 
				&& this.dragObject.y > window.innerHeight*0.1-50 && this.dragObject.y < window.innerHeight*0.1+282+50) {
				for (let i=0; i<numbersOfLetters; ++i) {
					if (this.dragObject == letters[i]) {
						console.log('Status : correct');
						letters[i].setScale(0.45);
						letters[i].disableInteractive();
						if (i % 2 == 0) {
							spinLettersEnable[i] = true;
						}
						this.tweens.add({
							targets: this.dragObject,
							x: window.innerWidth*0.62 + countLettersInMailbox*110,
							y: window.innerHeight*0.37,
							ease: 'Power0',
							duration: 500
						})
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								spinLettersEnable[i] = false;	
							},
							loop: false
						})
						this.tipsBear.play('right');
						countLettersInMailbox++;
						if (countLettersInMailbox == 3) countLettersInMailbox = -1;
						countObject++;
						shakeLettersEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfCoin; ++i) {
					if (this.dragObject == coin[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXCoin[i] - posX),
							y: this.dragObject.y + (posYCoin[i] - posY),
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
				console.log('Location : mailbox');
			}
			else {
				console.log('Location : nothing');
				var posX = this.dragObject.x;
				var posY = this.dragObject.y;
				for (let i=0; i<numbersOfCoin; ++i) {
					if (this.dragObject == coin[i]) {
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXCoin[i] - posX),
							y: this.dragObject.y + (posYCoin[i] - posY),
							ease: 'Power0',
							duration: 1000
						})
					}
				}
				for (let i=0; i<numbersOfLetters; ++i) {
					if (this.dragObject == letters[i]) {
						this.tweens.add({
							targets: this.dragObject,
							x: this.dragObject.x + (posXLetters[i] - posX),
							y: this.dragObject.y + (posYLetters[i] - posY),
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
		coin = new Array('coin');
		posXCoin = [];
		posYCoin = [];
		letters = new Array('letters');
		posXLetters = [];
		posYLetters = [];
		totalObject = 5;
		numbersOfCoin = 0;
		numbersOfLetters = 0;
		countCoinInArk = 0;
		countLettersInMailbox = 0;
		shakeCoinEnable = [];
		shakeLettersEnable = [];
		spinCoinEnable = [];
		spinLettersEnable = [];
		countObject = 0;
		countFault = 0;
	}

	checkFinish() {
		if (countObject == totalObject) {
			this.correctChimeSound.play();
			let rdCorrectSound = Phaser.Math.Between(0, 2);
			switch(countFault) {
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
				delay: 500,
				duration: 1000
			})
			this.changeScene = this.time.addEvent({
				delay: 2500,
				callback: () => {
					this.reset();
					this.scene.start('endscreen');
				},
				loop: false
			})
		}
	}

	update() {
		
		for (let i=0; i<numbersOfCoin; ++i) {
			if (shakeCoinEnable[i]) {
				coin[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinCoinEnable[i]) {
				coin[i].rotation += 0.1;
			}
		}
		for (let i=0; i<numbersOfLetters; ++i) {
			if (shakeLettersEnable[i]) {
				letters[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinLettersEnable[i]) {
				letters[i].rotation += 0.1;
			}
		}
		
	}

}