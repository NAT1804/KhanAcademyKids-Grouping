let hen = new Array('hen');
let posXHen = [];
let posYHen = [];
let ratel = new Array('ratel');
let posXRatel = [];
let posYRatel = [];
var totalObject = 5;
let numbersOfHen = 0; // init var
let numbersOfRatel = 0; // init var
let countHenInBasket = 0;
let countRatelInFence = 0;
let shakeHenEnable = [];
let shakeRatelEnable = [];
let spinHenEnable = [];
let spinRatelEnable = [];

class Scene2 extends Phaser.Scene {
    constructor() {
        super('screen2');
    }

    create() {
        // background color
        this.cameras.main.setBackgroundColor('#acdfe3');

        //home button
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.soundBack = this.sound.add('back_button_sound');
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.soundBack.play();
            music.stop();
            this.scene.start('screen0');
        })

        // 2 group
		this.basket = this.add.image(window.innerWidth*0.22, window.innerHeight*0.1, 'basket').setOrigin(0, 0).setScale(0.7);
		this.fence = this.add.image(window.innerWidth*0.55, window.innerHeight*0.22, 'fence').setOrigin(0, 0).setScale(0.7);
		
		//sound
		this.appearSound = this.sound.add('item_appear');
		this.correctSound = this.sound.add('correct_sound');
		this.correctChimeSound = this.sound.add('correct_chime_sound');
		this.incorrectSound = this.sound.add('incorrect_sound');
		this.audioRequest = this.sound.add('audio_request2');
		this.awesomeSound = this.sound.add('awesome');
		this.goodJobSound = this.sound.add('goodjob');
		this.greatJobSound = this.sound.add('greatjob');
		this.tryAgainSound = this.sound.add('tryagain');
		this.oppsSound = this.sound.add('oopsSound');

		// object
		numbersOfHen = Phaser.Math.Between(1,totalObject-1);
		numbersOfRatel = totalObject - numbersOfHen;
		var factor = [0, 1, 2, 3, 4]; // coefficient
		this.shuffle(factor); // Location appears randomly
			
		for (let i=0 ; i<numbersOfHen; ++i) {
			hen[i] = this.add.image(window.innerWidth*0.17+220*factor[i], window.innerHeight*0.63, 'hen').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXHen[i] = window.innerWidth*0.17+220*factor[i];
			posYHen[i] = window.innerHeight*0.63;
			shakeHenEnable[i] = true;
			spinHenEnable[i] = false;
			//this.appearSound.play();
		}

		for (let i=0 ; i<numbersOfRatel; ++i) {
			ratel[i] = this.add.image(window.innerWidth*0.17+220*factor[i+numbersOfHen], window.innerHeight*0.63, 'ratel').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXRatel[i] = window.innerWidth*0.17+220*factor[i+numbersOfHen];
			posYRatel[i] = window.innerHeight*0.63;
			shakeRatelEnable[i] = true;
			spinRatelEnable[i] = false;
			//this.appearSound.play();
		}

        // tips bear
        var graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(window.innerWidth-20, window.innerHeight-20, 250);
        graphics.lineStyle(3, 0xf6f2d3, 1);
        graphics.strokeCircle(window.innerWidth-20, window.innerHeight-20, 250);
        this.tipsBear = this.add.image(window.innerWidth-120, window.innerHeight-190, 'tipsBear');

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
			if (this.dragObject.x > window.innerWidth*0.22 && this.dragObject.x < window.innerWidth*0.22+232 
				&& this.dragObject.y > window.innerHeight*0.08 && this.dragObject.y < window.innerHeight*0.08+283) {
				for (let i=0; i<numbersOfHen; ++i) {
					if (this.dragObject == hen[i]) {
						console.log('Status : correct');
						hen[i].setScale(0.45);
						hen[i].disableInteractive();
						if (i % 2 == 0) {
							spinHenEnable[i] = true;
						}
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								this.dragObject.x = window.innerWidth*0.4 - countHenInBasket*100;
								this.dragObject.y = window.innerHeight*0.36;
								spinHenEnable[i] = false;
								
							},
							loop: false
						})
						countHenInBasket++;
						shakeHenEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfRatel; ++i) {
					if (this.dragObject == ratel[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXRatel[i] - posX);
						this.dragObject.y += (posYRatel[i] - posY);
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
						this.time.addEvent({
							delay: 1000,
							callback: () => {
								this.audioRequest.play();
							}
						})
					}
				}
				console.log('Location : basket');
			}
			else if (this.dragObject.x > window.innerWidth*0.55 && this.dragObject.x < window.innerWidth*0.55+283 
				&& this.dragObject.y > window.innerHeight*0.2 && this.dragObject.y < window.innerHeight*0.2+183) {
				for (let i=0; i<numbersOfRatel; ++i) {
					if (this.dragObject == ratel[i]) {
						console.log('Status : correct');
						ratel[i].setScale(0.45);
						ratel[i].disableInteractive();
						if (i % 2 == 0) {
							spinRatelEnable[i] = true;
						}
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								this.dragObject.x = window.innerWidth*0.46 + countRatelInFence*100;
								this.dragObject.y = window.innerHeight*0.38;
								spinRatelEnable[i] = false;
								
							},
							loop: false
						})
						countRatelInFence++;
						shakeRatelEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfHen; ++i) {
					if (this.dragObject == hen[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXHen[i] - posX);
						this.dragObject.y += (posYHen[i] - posY);
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
						this.time.addEvent({
							delay: 1000,
							callback: () => {
								this.audioRequest.play();
							}
						})
					}
				}
				console.log('Location : fence');
			}
			else {
				console.log('Location : nothing');
				var posX = this.dragObject.x;
				var posY = this.dragObject.y;
				for (let i=0; i<numbersOfHen; ++i) {
					if (this.dragObject == hen[i]) {
						this.dragObject.x += (posXHen[i] - posX);
						this.dragObject.y += (posYHen[i] - posY);
					}
				}
				for (let i=0; i<numbersOfRatel; ++i) {
					if (this.dragObject == ratel[i]) {
						this.dragObject.x += (posXRatel[i] - posX);
						this.dragObject.y += (posYRatel[i] - posY);
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
		hen = new Array('hen');
		posXHen = [];
		posYHen = [];
		ratel = new Array('ratel');
		posXRatel = [];
		posYRatel = [];
		totalObject = 5;
		numbersOfHen = 0;
		numbersOfRatel = 0;
		countHenInBasket = 0;
		countRatelInFence = 0;
		shakeHenEnable = [];
		shakeRatelEnable = [];
		spinHenEnable = [];
		spinRatelEnable = [];
	}

	checkFinish() {
		if ((countHenInBasket + countRatelInFence) == 5) {
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
			this.car = this.add.image(window.innerWidth*0.92, window.innerHeight*0.05, 'car').setOrigin(0, 0);
			this.changeScene = this.time.addEvent({
				delay: 2500,
				callback: () => {
					this.reset();
					this.scene.start('screen3');
				},
				loop: false
			})
		}
	}

    update() {
        for (let i=0; i<numbersOfHen; ++i) {
			if (shakeHenEnable[i]) {
				hen[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinHenEnable[i]) {
				hen[i].rotation += 0.1;
			}
		}
		for (let i=0; i<numbersOfRatel; ++i) {
			if (shakeRatelEnable[i]) {
				ratel[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinRatelEnable[i]) {
				ratel[i].rotation += 0.1;
			}
		}
    }

}