/* eslint-disable func-names */
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
    // setting player animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('ironman', {
        start: 8,
        end: 11,
      }),
      frameRate: 15,
      repeat: -1,
    });

    // setting coin animation

    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });
    // group with all active buildings.
    this.buildingsGroup = this.add.group();

    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // platform pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // group with all active coins.
    this.coinGroup = this.add.group({
      // once a coin is removed, it's added to the pool
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    // coin pool
    this.coinPool = this.add.group({
      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    // adding a buildings
    this.addBuildings();

    // keeping track of added platforms
    this.addedPlatforms = 0;

    // number of consecutive jumps made by the player so far
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width, x position and y position
    this.addPlatform(
      config.width,
      config.width / 2,
      config.height * gameOptions.platformVerticalLimit[1],
    );

    // adding the player;
    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      config.height * 0.7,
      'ironman',
    );
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    // setting collisions between the player and the platform group
    this.physics.add.collider(
      this.player,
      this.platformGroup,
      function () {
        // play "run" animation if the player is on a platform
        if (!this.player.anims.isPlaying) {
          this.player.anims.play('run');
        }
      },
      null,
      this,
    );

    // setting collisions between the player and the coin group
    this.physics.add.overlap(
      this.player,
      this.coinGroup,
      function (player, coin) {
        this.tweens.add({
          targets: coin,
          y: coin.y - 100,
          alpha: 0,
          duration: 800,
          ease: 'Cubic.easeOut',
          callbackScope: this,
          onComplete() {
            this.coinGroup.killAndHide(coin);
            this.coinGroup.remove(coin);
          },
        });
      },
      null,
      this,
    );

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }

  // adding buildings
  addBuildings() {
    const rightmostBuildings = this.getRightmostBuildings();
    if (rightmostBuildings < config.width * 2) {
      const buildings = this.physics.add.sprite(
        rightmostBuildings + Phaser.Math.Between(100, 350),
        config.height + Phaser.Math.Between(0, 100),
        'buildings',
      );
      buildings.setOrigin(0.5, 1);
      buildings.body.setVelocityX(gameOptions.buildingsSpeed * -1);
      this.buildingsGroup.add(buildings);
      if (Phaser.Math.Between(0, 1)) {
        buildings.setDepth(1);
      }
      buildings.setFrame(Phaser.Math.Between(0, 3));
      this.addBuildings();
    }
  }

  // getting rightmost buildings x position
  getRightmostBuildings() {
    let rightmostBuildings = -200;
    this.buildingsGroup.getChildren().forEach((buildings) => {
      rightmostBuildings = Math.max(rightmostBuildings, buildings.x);
    });
    return rightmostBuildings;
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1],
        ) * -1,
      );
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1],
    );

    // is there a coin over the platform?
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play('rotate');
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }
    }
  }

  // the player jumps when on the ground, or once in the air as long as there
  // are jumps left and the first jump was on the ground
  jump() {
    if (
      this.player.body.touching.down
      || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
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
      this.scene.start('Game');
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

    // recycling coins
    this.coinGroup.getChildren().forEach(function (coin) {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    // recycling mountains
    this.buildingsGroup.getChildren().forEach(function (buildings) {
      if (buildings.x < -buildings.displayWidth) {
        const rightmostBuildings = this.getRightmostBuildings();
        buildings.x = rightmostBuildings + Phaser.Math.Between(100, 350);
        buildings.y = config.height + Phaser.Math.Between(0, 100);
        buildings.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          buildings.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1],
      );
      const platformRandomHeight = gameOptions.platformHeighScale
        * Phaser.Math.Between(
          gameOptions.platformHeightRange[0],
          gameOptions.platformHeightRange[1],
        );
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = config.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap,
        minPlatformHeight,
        maxPlatformHeight,
      );
      this.addPlatform(
        nextPlatformWidth,
        config.width + nextPlatformWidth / 2,
        nextPlatformHeight,
      );
    }
  }
}
