import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(config.width / 2, 50, 'Options', {
      fontSize: 40,
    });
    this.musicButton = this.add.image(config.width / 2, 200, 'checkedBox');
    this.musicText = this.add.text(
      config.width / 2 + 30,
      190,
      'Music Enabled',
      {
        fontSize: 24,
      },
    );

    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.updateAudio();

    this.menuButton = new Button(
      this,
      config.width / 2 + 85,
      500,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title',
    );
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }

}
