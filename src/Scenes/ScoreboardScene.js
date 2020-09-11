/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import config from '../Config/config';
import scores from '../Scores/scores';
import Button from '../Objects/Button';

export default class ScoreboardScene extends Phaser.Scene {
  constructor() {
    super('Scoreboard');
  }

  create() {
    this.add.text(config.width / 2 - 100,
      20, 'Top Ten Scores', {
        fontSize: '32px',
        fill: '#fff',
      });

    this.loader = this.add.text(config.width / 2, 60, 'Loading ...', {
      fontSize: '32px',
      fill: '#fff',
    });

    scores
      .getScores()
      .then((response) => {
        this.loader.destroy();
        const allScores = response.result;
        const topTen = scores.sortResults(allScores);
        let padding = 60;
        topTen.forEach((score) => {
          this.add.text(config.width / 2 - 250, 50 + padding, `${score.user}`, {
            fontSize: '32px',
            fill: '#fff',
          });
          this.add.text(
            config.width / 2 + 120,
            50 + padding,
            `${score.score} points\n\n\n`,
            {
              fontSize: '32px',
              fill: '#fff',
            },
          );
          padding += 50;
        });
      }).catch(() => {
        this.add.text(0, 0, 'Something went wrong ...', {
          fontSize: '32px',
          fill: '#fff',
        });
      });

    this.menuButton = new Button(
      this,
      config.width / 2 + 300,
      40,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title',
    );
  }
}
