import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // this.load.spritesheet('logo', 'assets/game/ironman.png', {
    //   frameWidth: 32,
    //   frameHeight: 48,
    // });
  }

  create() {
    // this.add.image(400, 300, 'logo');
    // this.add.text(350, 350, 'Ironman Dash');
  }
}
