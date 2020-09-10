/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';
import axios, * as others from 'axios';
import names from '../User/user';

const scores = (() => {
  const gameId = 'vdA6Ul30OGvHcoiYupo5';
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

  // get scores
  const getScores = (async () => {
    const endpoint = `${baseUrl}games/${gameId}/scores`;
    const response = await axios.get(endpoint);
    return response.data;
  })();

  // post new score
  const postScore = async (user, score) => {
    const endpoint = `${baseUrl}games/${gameId}/scores/`;

    const response = await axios({
      method: 'post',
      url: endpoint,
      data: {
        user,
        score,
      },
    });
    return response.data;
  };

  // process scores after game is over
  const processScores = (score) => {
    let result;
    const user = names.getName();
    if (user) {
      result = postScore(user, score);
    }

    return result;
  };

  const sortResults = (scores) => scores.sort((a, b) => (a.score > b.score ? -1 : 1)).slice(0, 10);


  return {
    getScores,
    processScores,
    sortResults,
    postScore,
  };
})();


export default scores;
