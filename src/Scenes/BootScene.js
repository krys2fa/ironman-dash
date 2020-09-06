import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('sky', 'assets/game/sky.png');
    this.load.spritesheet('logo', 'assets/game/ironman.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image('platform', 'assets/game/platform.png');
  }

  create() {
    // this.add.image(400, 300, 'logo');
    // this.add.text(350, 350, 'Ironman Dash');
    this.scene.start('Preloader');
  }
}
