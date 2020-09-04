import Phaser from 'phaser';
import zuluBattleGear from '../assets/zulu-battle-gear.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('image', zuluBattleGear);
  }

  create() {
    this.scene.start('Preloader');
  }
}
