/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';
import names from '../User/user';

const scores = (() => {
  const gameId = 'vdA6Ul30OGvHcoiYupo5';
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

  const axios = require('axios');

  // get scores
  const getScores = (async () => {
    const endpoint = `${baseUrl}games/${gameId}/scores`;
    const response = await axios.get(endpoint);
    return response.data;
  })();

  // post new score
  const postScore = async (user, score) => {
    const endpoint = `${baseUrl}games/${gameId}/scores/`;
    const body = JSON.stringify({ user, score });
    const options = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(endpoint, body, { headers: options });
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
  };
})();


export default scores;


// const processData = (data) => {
//   const { icon, description } = data.weather[0];
//   const { temp, humidity, pressure } = data.main;
//   const { name, wind, sys } = data;
//   const dataObject = {
//     name,
//     temp,
//     icon,
//     description,
//     pressure,
//     humidity,
//     wind,
//     sys,
//   };
//   return dataObject;
// };

// const getWeatherDetails = async (event) => {
//   event.preventDefault();
//   const units = getPreferredUnits(event, currentUnit);
//   const city = getCity().value;

//   try {
//     const response = await fetch(
//       `${baseUrl}${city}&units=${units}&appid=${apiKey}`,
//       {
//         mode: 'cors',
//       }
//     );
//     const data = await response.json();
//     const result = processData(data);
//     currentUnit = units;
//     clearErrors();
//     updateWeatherDetails(result, units);
//   } catch (error) {
//     displayError(error);
//   }
// };
