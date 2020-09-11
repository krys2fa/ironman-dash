/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import config from '../Config/config';
import names from '../User/user';

export default class InputNameScene extends Phaser.Scene {
  constructor() {
    super('InputName');
  }

  preload() {
    this.load.html('name_form', 'assets/text/nameForm.html');
  }

  create() {
    const text = this.add.text(config.width / 2 - 100, 100, 'Enter your name:', {
      color: 'yellow',
      fontFamily: 'Arial',
      fontSize: '24px ',
    });
    const element = this.add
      .dom(config.width / 2 - 100, config.height / 2 + 50)
      .createFromCache('name_form');
    element.setPerspective(800);
    element.addListener('click');
    element.on('click', function confirmation(event) {
      if (event.target.name === 'confirmButton') {
        const inputUsername = this.getChildByName('username');
        if (inputUsername.value !== '') {
          names.setName(inputUsername.value);
          this.scene.scene.start('Title');
        } else {
          this.scene.tweens.add({
            targets: text,
            alpha: 0.1,
            duration: 200,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });
    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}
