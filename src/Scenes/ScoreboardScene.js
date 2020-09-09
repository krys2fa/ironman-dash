/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import config from '../Config/config';
import scores from '../Scores/scores';

export default class ScoreboardScene extends Phaser.Scene {
  constructor() {
    super('Scoreboard');
  }

  create() {
    this.add.text(config.width / 2 + 100,
      20, 'Top Scores', {
        fontSize: '32px',
        fill: '#fff',
      });

    scores
      .getScores
      .then((response) => {
        const allScores = response.result;
        const topTen = allScores;
        let padding = 60;
        topTen.forEach((score) => {
          this.add.text(config.width / 2, 50 + padding, `${score.user}`, {
            fontSize: '32px',
            fill: '#fff',
          });
          this.add.text(config.width / 2 + 280, 50 + padding, `${score.score} points\n\n\n`, {
            fontSize: '32px',
            fill: '#fff',
          });
          padding += 50;
        });
      }).catch(() => {
        this.add.text(0, 0, 'Something went wrong ...', {
          fontSize: '32px',
          fill: '#fff',
        });
      });

    setTimeout(() => {
      this.scene.stop('Scoreboard');
      this.scene.start('Title');
    }, 3000);
  }
}
