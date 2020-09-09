/* eslint-disable no-alert */

const names = (() => {
  const setName = (name = 'Anonymous') => {
    localStorage.setItem('name', name);
    // console.log(localStorage.getItem('name'));
    // console.log(JSON.parse(localStorage.getItem('name')));
  };

  const getName = () => localStorage.getItem('name');

  // getName() || setName();

  // const printName = () => getName();
  // this.nameField.text = `Welcome ${getName()}!`;

  const inputName = () => {
    const newName = prompt('Please enter your name', `${getName()}`) || getName();
    if (newName) {
      setName(newName);
      printName();
    }
  };

  return { inputName, getName };
})();

export default names;
