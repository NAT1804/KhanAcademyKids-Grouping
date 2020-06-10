

class Scene0 extends Phaser.Scene {
    constructor() {
        super('startscreen');
    }

    preload() {
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('home_button', 'assets/images/home_button.png');
        this.load.image('car', 'assets/images/home_button.png');

        // image in screen 1
        this.load.image('horse', 'assets/images/horse2.png');
        this.load.image('stable', 'assets/images/stable.png');
        this.load.image('penguin', 'assets/images/penguin.png');
        this.load.image('ice_house', 'assets/images/ice_house.png');

        // image in screen 2
        this.load.image('ratel', 'assets/images/ratel.png');
        this.load.image('hen', 'assets/images/hen.png');
        this.load.image('fence', 'assets/images/fence.png');
        this.load.image('basket', 'assets/images/basket.png');

        // image in screen 3
        this.load.image('umbrella', 'assets/images/umbrella.png');
        this.load.image('sea', 'assets/images/sea.png');
        this.load.image('droplets', 'assets/images/droplets.png');
        this.load.image('boat', 'assets/images/boat.png');

        // image in screen 4
        this.load.image('tent', 'assets/images/tent.png');
        this.load.image('sand', 'assets/images/sand.png');
        this.load.image('bucket', 'assets/images/bucket.png');
        this.load.image('bear', 'assets/images/bear.png');

        // image in screen 5
        this.load.image('ark', 'assets/images/ark.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('mailbox', 'assets/images/mailbox.png');
        this.load.image('letters', 'assets/images/letters.png');

    }

    create() {
        this.header = this.add.text(this.cameras.main.centerX-150, this.cameras.main.centerY, 'Follow 2 Rules', {
            fontSize: 30,
            color: '#000000'
        })

        this.input.on('pointerdown', () => {
            this.scene.start('mainscreen');
        })
    }

}