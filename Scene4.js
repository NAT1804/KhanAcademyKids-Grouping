let bear = new Array('bear');
let posXBear = [];
let posYBear = [];
let bucket = new Array('bucket');
let posXBucket = [];
let posYBucket = [];
var totalObject = 5;
let numbersOfBear = 0;
let numbersOfBucket = 0;
let countBearInTent = 0;
let countBucketInSand = 0;
let shakeBearEnable = [];
let shakeBucketEnable = [];
let spinBearEnable = [];
let spinBucketEnable = [];

class Scene4 extends Phaser.Scene {
    constructor() {
        super('screen4');
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
		this.tent = this.add.image(window.innerWidth*0.22, window.innerHeight*0.1, 'tent').setOrigin(0, 0).setScale(0.7);
		this.sand = this.add.image(window.innerWidth*0.57, window.innerHeight*0.24, 'sand').setOrigin(0, 0).setScale(0.7);
		
		//sound
		this.appearSound = this.sound.add('item_appear');
		this.correctSound = this.sound.add('correct_sound');
		this.correctChimeSound = this.sound.add('correct_chime_sound');
		this.incorrectSound = this.sound.add('incorrect_sound');
		this.primarySound = this.sound.add('primary1');

		// object
		numbersOfBear = Phaser.Math.Between(1,totalObject-1);
		numbersOfBucket = totalObject - numbersOfBear;
		var factor = [0, 1, 2, 3, 4]; // coefficient
		this.shuffle(factor); // Location appears randomly
			
		for (let i=0 ; i<numbersOfBear; ++i) {
			bear[i] = this.add.image(window.innerWidth*0.17+220*factor[i], window.innerHeight*0.63, 'bear').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXBear[i] = window.innerWidth*0.17+220*factor[i];
			posYBear[i] = window.innerHeight*0.63;
			shakeBearEnable[i] = true;
			spinBearEnable[i] = false;
			//this.appearSound.play();
		}

		for (let i=0 ; i<numbersOfBucket; ++i) {
			bucket[i] = this.add.image(window.innerWidth*0.17+220*factor[i+numbersOfBear], window.innerHeight*0.63, 'bucket').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
			posXBucket[i] = window.innerWidth*0.17+220*factor[i+numbersOfBear];
			posYBucket[i] = window.innerHeight*0.63;
			shakeBucketEnable[i] = true;
			spinBucketEnable[i] = false;
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
			if (this.dragObject.x > window.innerWidth*0.22 && this.dragObject.x < window.innerWidth*0.22+427 
				&& this.dragObject.y > window.innerHeight*0.08 && this.dragObject.y < window.innerHeight*0.08+261) {
				for (let i=0; i<numbersOfBear; ++i) {
					if (this.dragObject == bear[i]) {
						console.log('Status : correct');
						bear[i].setScale(0.45);
						bear[i].disableInteractive();
						if (i % 2 == 0) {
							spinBearEnable[i] = true;
						}
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								this.dragObject.x = window.innerWidth*0.47 - countBearInTent*90;
								this.dragObject.y = window.innerHeight*0.33;
								spinBearEnable[i] = false;
								
							},
							loop: false
						})
						countBearInTent++;
						shakeBearEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfBucket; ++i) {
					if (this.dragObject == bucket[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXBucket[i] - posX);
						this.dragObject.y += (posYBucket[i] - posY);
						this.incorrectSound.play();
						this.primarySound.play();
					}
				}
				console.log('Location : tent');
			}
			else if (this.dragObject.x > window.innerWidth*0.57 && this.dragObject.x < window.innerWidth*0.57+284 
				&& this.dragObject.y > window.innerHeight*0.22 && this.dragObject.y < window.innerHeight*0.22+166) {
				for (let i=0; i<numbersOfBucket; ++i) {
					if (this.dragObject == bucket[i]) {
						console.log('Status : correct');
						bucket[i].setScale(0.45);
						bucket[i].disableInteractive();
						if (i % 2 == 0) {
							spinBucketEnable[i] = true;
						}
						this.spinObject = this.time.addEvent({
							delay: 1050,
							callback: () => {
								this.dragObject.x = window.innerWidth*0.49 + countBucketInSand*90;
								this.dragObject.y = window.innerHeight*0.35;
								spinBucketEnable[i] = false;
								
							},
							loop: false
						})
						countBucketInSand++;
						shakeBucketEnable[i] = false;
						this.correctSound.play();
					}
				}
				for (let i=0; i<numbersOfBear; ++i) {
					if (this.dragObject == bear[i]) {
						console.log('Status : wrong');
						var posX = this.dragObject.x;
						var posY = this.dragObject.y;
						this.dragObject.x += (posXBear[i] - posX);
						this.dragObject.y += (posYBear[i] - posY);
						this.incorrectSound.play();
						this.primarySound.play();
					}
				}
				console.log('Location : ice_house');
			}
			else {
				console.log('Location : nothing');
				var posX = this.dragObject.x;
				var posY = this.dragObject.y;
				for (let i=0; i<numbersOfBear; ++i) {
					if (this.dragObject == bear[i]) {
						this.dragObject.x += (posXBear[i] - posX);
						this.dragObject.y += (posYBear[i] - posY);
					}
				}
				for (let i=0; i<numbersOfBucket; ++i) {
					if (this.dragObject == bucket[i]) {
						this.dragObject.x += (posXBucket[i] - posX);
						this.dragObject.y += (posYBucket[i] - posY);
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
		bear = new Array('bear');
		posXBear = [];
		posYBear = [];
		bucket = new Array('bucket');
		posXBucket = [];
		posYBucket = [];
		totalObject = 5;
		numbersOfBear = 0;
		numbersOfBucket = 0;
		countBearInTent = 0;
		countBucketInSand = 0;
		shakeBearEnable = [];
		shakeBucketEnable = [];
		spinBearEnable = [];
		spinBucketEnable = [];
	}

	checkFinish() {
		if ((countBearInTent + countBucketInSand) == 5) {
			this.correctChimeSound.play();
			this.car = this.add.image(window.innerWidth*0.92, window.innerHeight*0.05, 'car').setOrigin(0, 0);
			this.changeScene = this.time.addEvent({
				delay: 2500,
				callback: () => {
					this.reset();
					this.scene.start('screen5');
				},
				loop: false
			})
		}
	}

	update() {
		
		for (let i=0; i<numbersOfBear; ++i) {
			if (shakeBearEnable[i]) {
				bear[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinBearEnable[i]) {
				bear[i].rotation += 0.1;
			}
		}
		for (let i=0; i<numbersOfBucket; ++i) {
			if (shakeBucketEnable[i]) {
				bucket[i].rotation += ((Math.random()-0.5)/200);
			}
			if (spinBucketEnable[i]) {
				bucket[i].rotation += 0.1;
			}
		}
		
	}

}