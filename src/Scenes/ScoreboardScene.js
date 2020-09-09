/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import config from '../Config/config';
// import scores from '../Scores/scores';

export default class ScoreboardScene extends Phaser.Scene {
  constructor() {
    super('Scoreboard');
  }

  create() {
    // const top_scores = scores.getScores;
    this.scoresText = this.add.text(0, 0, 'Top Ten', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.scoresText, this.zone);

    this.scoresTween = this.tweens.add({
      targets: this.scoresText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });
  }
}
