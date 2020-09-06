import Phaser from 'phaser';
import config from '../Config/config';
import gameOptions from '../Config/game';

// export default class GameScene extends Phaser.Scene {
//   constructor() {
//     super('Game');
//   }

//   preload() {
//     // this.load.spritesheet('logo', 'assets/game/ironman.png', {
//     //   frameWidth: 32,
//     //   frameHeight: 48,
//     // });
//   }

//   create() {
//     // this.add.image(400, 300, 'logo');
//     // this.add.text(350, 350, 'Ironman Dash');
//   }
// }


// playGame scene
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.spritesheet('ironman', 'assets/game/ironman.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, 'sky');
    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width, x position and y position
    this.addPlatform(config.width, config.width / 2,
      config.height * gameOptions.platformVerticalLimit[1]);

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition,
      config.height * 0.7, 'player');
    this.player.setGravityY(gameOptions.playerGravity);

    // setting player animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('ironman', {
        start: 8,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, function () {
      // play "run" animation if the player is on a platform
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, posY, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0],
        gameOptions.platformSpeedRange[1]) * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]);
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump() {
    if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      // stops animation
      this.player.anims.stop();
    }
  }

  update() {
    // game over
    if (this.player.y > config.height) {
      this.scene.start('PlayGame');
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1]);
      const platformRandomHeight = gameOptions.platformHeighScale
        * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      // console.log(rightmostPlatformHeight);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = config.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}
