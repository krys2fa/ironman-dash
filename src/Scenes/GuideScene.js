/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Guide');
  }

  create() {
    this.titleText = this.add.text(0, 0, 'IronMan Dash Instructions', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.jumpText = this.add.text(0, 0, 'Click your left mouse button to jump. \n\n\n\nIronman can make an extra jump while in the air.', {
      fontSize: '26px',
      fill: '#fff',
    });
    this.tipsText = this.add.text(0, 0, 'Pick up coins and avoid the blue fires in the process.', {
      fontSize: '26px',
      fill: '#fff',
    });
    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.titleText, this.zone);

    Phaser.Display.Align.In.Center(this.jumpText, this.zone);

    Phaser.Display.Align.In.Center(this.tipsText, this.zone);

    this.jumpText.setY(1000);

    this.tipsText.setY(1200);

    this.titleTween = this.tweens.add({
      targets: this.titleText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.jumpTween = this.tweens.add({
      targets: this.jumpText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.jumpTween.destroy;
      }.bind(this),
    });

    this.tipsText = this.tweens.add({
      targets: this.tipsText,
      y: -300,
      ease: 'Power1',
      duration: 10000,
      delay: 1000,
      onComplete: function () {
        this.tipsText.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}
