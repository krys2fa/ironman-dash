import Phaser from 'phaser';
import zuluBattleGear from '../assets/zulu-battle-gear.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('logo', zuluBattleGear);
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
