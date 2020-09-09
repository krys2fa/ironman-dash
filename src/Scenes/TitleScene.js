import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import names from '../User/user';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const inputNameButton = this.add.text(
      config.width / 2 - 180,
      config.height / 2 - 280,
      'Click here to input/change your name.\n\n Only games with names will be saved!',
      { fill: 'yellow' },
    );
    inputNameButton.setInteractive();
    inputNameButton.on('pointerdown', () => {
      names.inputName();
    });

    this.add.image(config.width / 2, config.height / 2 - 170, 'logo');
    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game',
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
    );

    // Guide
    this.instructionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Guide',
      'Guide',
    );

    // Leaderboard
    this.leaderBoardButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Scores',
      'Scoreboard',
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
