var horse = new Array('horse');
var penguin = new Array('penguin');
var totalObject = 5;
var numbersOfHorse;
var numbersOfPenguin;

class Scene1 extends Phaser.Scene {
    constructor() {
        super('screen1');
    }

    create() {
        // background color
        this.cameras.main.setBackgroundColor('#fffbe2');

        // home button
        this.homeBtn = this.add.image(0, 0, 'home_button').setOrigin(0, 0);
        this.homeBtn.setInteractive({cursor:'pointer'});
        this.homeBtn.on('pointerdown', () => {
            this.scene.start('screen0');
        })

        // 2 group
        this.stable = this.add.image(window.innerWidth*0.22, window.innerHeight*0.1, 'stable').setOrigin(0, 0).setScale(0.7);
        this.iceHouse = this.add.image(window.innerWidth*0.55, window.innerHeight*0.12, 'ice_house').setOrigin(0, 0).setScale(0.7);
        
        // object
        numbersOfHorse = Phaser.Math.Between(1,totalObject-1);
        numbersOfPenguin = totalObject - numbersOfHorse;
        var factor = [0, 1, 2, 3, 4]; // coefficient
        this.shuffle(factor); // Location appears randomly
        for (let i=0 ; i<numbersOfHorse; ++i) {
            horse[i] = this.add.image(window.innerWidth*0.17+220*factor[i], window.innerHeight*0.63, 'horse').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
            
        }
        for (let i=0 ; i<numbersOfPenguin; ++i) {
            penguin[i] = this.add.image(window.innerWidth*0.17+220*factor[i+numbersOfHorse], window.innerHeight*0.63, 'penguin').setOrigin(0, 0).setScale(0.7).setInteractive({cursor:'pointer'});
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
        
        if (this.dragObject.x > window.innerWidth*0.23 && this.dragObject.x < window.innerWidth*0.23+283 && this.dragObject.y > window.innerHeight*0.1 && this.dragObject.y < window.innerHeight*0.1+226) {
            for (let i=0; i<numbersOfHorse; ++i) {
                if (this.dragObject == horse[i]) {
                    console.log('Status : correct');
                    horse[i].rotation = 0;
                }
            }
            for (let i=0; i<numbersOfPenguin; ++i) {
                if (this.dragObject == penguin[i]) {
                    console.log('Status : wrong');
                }
            }
            console.log('Location : stable');
        }
        else if (this.dragObject.x > window.innerWidth*0.88 && this.dragObject.x < window.innerWidth*0.88+286 && this.dragObject.y > window.innerHeight*0.12 && this.dragObject.y < window.innerHeight*0.12+204) {
            for (let i=0; i<numbersOfPenguin; ++i) {
                if (this.dragObject == penguin[i]) {
                    console.log('Status : correct');
                    penguin[i].rotation = 0;
                }
            }
            for (let i=0; i<numbersOfHorse; ++i) {
                if (this.dragObject == horse[i]) {
                    console.log('Status : wrong');
                }
            }
            console.log('Location : ice_house');
        }
        else {
            console.log('Location : nothing');
        }
        
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

    update() {
        for (let i=0; i<numbersOfHorse; ++i) {
            horse[i].rotation += ((Math.random()-0.5)/200);
        }
        for (let i=0; i<numbersOfPenguin; ++i) {
            penguin[i].rotation += ((Math.random()-0.5)/200);
        }
    }

}