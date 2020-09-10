/* eslint-disable no-underscore-dangle */
import names from '../User/user';
import 'jest-localstorage-mock';
// jest.mock('../User/user', () => function {
//   getName() {
//     return [{ name: 'Anonymous' }];
//   }
// });

// test()

describe('LocalStorage', () => {
  test('should save the name to localStorage', () => {
    const KEY = 'name';
    const VALUE = 'Admin';
    names.setName('Admin');
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
    expect(localStorage.__STORE__[KEY]).toBe(VALUE);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  test('should not save a different name to localStorage', () => {
    const KEY = 'name';
    const CORRECT_VALUE = 'Admin';
    const WRONG_VALUE = 'Guest';
    names.setName('Admin');
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, CORRECT_VALUE);
    expect(localStorage.setItem).not.toHaveBeenLastCalledWith(KEY, WRONG_VALUE);
    expect(localStorage.__STORE__[KEY]).toBe(CORRECT_VALUE);
    expect(localStorage.__STORE__[KEY]).not.toBe(WRONG_VALUE);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });
});
