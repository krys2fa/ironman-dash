/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  // parent: 'phaser-example',
  width: 1334,
  height: 750,
  physics: {
    default: 'arcade',
  },
  backgroundColor: 0x0c88c7,
  parent: 'phaser-container',
  dom: {
    createContainer: true,
  },
};
