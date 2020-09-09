/* eslint-disable no-alert */

const names = (() => {
  const setName = (name = 'Anonymous') => {
    localStorage.setItem('name', name);
  };

  const getName = () => localStorage.getItem('name');

  const inputName = () => {
    const newName = prompt('Please enter your name', `${getName()}`) || getName();
    if (newName) {
      setName(newName);
    }
  };

  return { inputName, getName };
})();

export default names;
