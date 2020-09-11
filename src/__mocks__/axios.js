export default {
  get: jest.fn(() => Promise.resolve({
    data: {
      user: 'John Doe',
      score: 42,
    },
  })),
};
