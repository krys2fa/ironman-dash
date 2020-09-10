import mockAxios from 'axios';
import scores from '../Scores/scores';

describe('Axios', () => {
  it('calls axios and returns scores', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({}));
    const allScores = await scores.getScores;
    expect(allScores).toEqual({ user: 'John Doe', score: 42 });
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/vdA6Ul30OGvHcoiYupo5/scores',
    );
  });

});
