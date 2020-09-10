/* eslint-disable func-names */

import Phaser from 'phaser';
import Model from './Model';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import GuideScene from './Scenes/GuideScene';
import ScoreboardScene from './Scenes/ScoreboardScene';
import CreditsScene from './Scenes/CreditsScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    // const model = new Model();
    // this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Guides', GuideScene);
    this.scene.add('Scoreboard', ScoreboardScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

function resize() {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = config.width / config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  } else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
}

window.onload = function () {
  window.game = new Game();

  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};
