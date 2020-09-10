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

describe('Sort results', () => {
  it('returns sorted scores in descending order', async () => {
    const results = [{
      user: 'Peter Parker',
      score: 35,
    },
    {
      user: 'Wonder Woman',
      score: 50,
    },
    ];
    expect(scores.sortResults(results)).toEqual([
      { score: 50, user: 'Wonder Woman' },
      { score: 35, user: 'Peter Parker' },
    ]);
  });

  it('does not return sorted scores in ascending order', async () => {
    const results = [
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
    ];
    expect(scores.sortResults(results)).not.toEqual([
      { score: 35, user: 'Peter Parker' },
      { score: 50, user: 'Wonder Woman' },
    ]);
  });
});
