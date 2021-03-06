/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import config from '../Config/config';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.spritesheet('logo', 'assets/game/ironman.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.spritesheet('buildings', 'assets/game/buildings-layer.png', {
      frameWidth: 190,
      frameHeight: 120,
    });
    this.load.image('platform', 'assets/game/platform.png');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2 - 60, 'logo');
    this.add.text(config.width / 2, config.height / 2, 'Ironman Dash');
    this.scene.start('Preloader');
  }
}
