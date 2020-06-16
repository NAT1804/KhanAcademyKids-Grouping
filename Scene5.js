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
		this.primarySound = this.sound.add('primary1');

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
        this.tipsBear = this.add.image(window.innerWidth-120, window.innerHeight-190, 'tipsBear');

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
			if (this.dragObject.x > window.innerWidth*0.22 && this.dragObject.x < window.innerWidth*0.22+284 
				&& this.dragObject.y > window.innerHeight*0.08 && this.dragObject.y < window.innerHeight*0.08+277) {
				for (let i=0; i<numbersOfCoin; ++i) {
					if (this.dragObject == coin[i]) {
						console.log('Status : correct');
						coin[i].setScale(0.45);
						coin[i].disableInteractive();
						if (i % 2 == 0) {
							spinCoinEnable[i] = true;
						}
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								this.dragObject.x = window.innerWidth*0.43 - countCoinInArk*110;
								this.dragObject.y = window.innerHeight*0.37;
								spinCoinEnable[i] = false;
								
							},
							loop: false
						})
						countCoinInArk++;
						shakeCoinEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfLetters; ++i) {
					if (this.dragObject == letters[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXLetters[i] - posX);
						this.dragObject.y += (posYLetters[i] - posY);
						this.incorrectSound.play();
						this.primarySound.play();
					}
				}
				console.log('Location : ark');
			}
			else if (this.dragObject.x > window.innerWidth*0.55 && this.dragObject.x < window.innerWidth*0.55+243 
				&& this.dragObject.y > window.innerHeight*0.1 && this.dragObject.y < window.innerHeight*0.1+282) {
				for (let i=0; i<numbersOfLetters; ++i) {
					if (this.dragObject == letters[i]) {
						console.log('Status : correct');
						letters[i].setScale(0.45);
						letters[i].disableInteractive();
						if (i % 2 == 0) {
							spinLettersEnable[i] = true;
						}
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								this.dragObject.x = window.innerWidth*0.47 + countLettersInMailbox*110;
								this.dragObject.y = window.innerHeight*0.37;
								spinLettersEnable[i] = false;
								
							},
							loop: false
						})
						countLettersInMailbox++;
						shakeLettersEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfCoin; ++i) {
					if (this.dragObject == coin[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXCoin[i] - posX);
						this.dragObject.y += (posYCoin[i] - posY);
						this.incorrectSound.play();
						this.primarySound.play();
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
						this.dragObject.x += (posXCoin[i] - posX);
						this.dragObject.y += (posYCoin[i] - posY);
					}
				}
				for (let i=0; i<numbersOfLetters; ++i) {
					if (this.dragObject == letters[i]) {
						this.dragObject.x += (posXLetters[i] - posX);
						this.dragObject.y += (posYLetters[i] - posY);
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
	}

	checkFinish() {
		if ((countCoinInArk + countLettersInMailbox) == 5) {
			this.correctChimeSound.play();
			this.car = this.add.image(window.innerWidth*0.92, window.innerHeight*0.05, 'car').setOrigin(0, 0);
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