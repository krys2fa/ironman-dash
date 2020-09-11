const names = (() => {
  const setName = (name = 'Anonymous') => {
    localStorage.setItem('name', name);
  };

  const getName = () => localStorage.getItem('name');

  return { getName, setName };
})();

export default names;
