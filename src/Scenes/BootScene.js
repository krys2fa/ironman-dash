import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.spritesheet('logo', 'assets/game/ironman.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet('coin', 'assets/game/coin.png', {
      frameWidth: 48,
      frameHeight: 43,
    });

    this.load.spritesheet('mountain', 'assets/game/mountain.png', {
      frameWidth: 512,
      frameHeight: 512,
    });
    this.load.image('platform', 'assets/game/platform.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
