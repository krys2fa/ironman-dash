/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';
import names from '../User/user';

const scores = (() => {
  const gameId = 'vdA6Ul30OGvHcoiYupo5';
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

  // create game
  // const getScores = async () => {
  //   try {
  //     const response = await fetch(`${baseUrl}games/${gameId}/scores/`, {
  //       mode: 'cors',
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const axios = require('axios');

  // get scores

  const getScores = (async () => {
    const endpoint = `${baseUrl}games/${gameId}/scores`;
    const response = await axios.get(endpoint);
    return response.data;
  })();


  // post new score

  // process scores after game is over
  const processScores = (score) => {
    const name = names.getName();
    const scoreObj = { user: name, score };
    console.log('processScores -> scoreObj', scoreObj);
    return scoreObj;
    // console.log(`Score is ${score}`);
    // console.log(`Name is ${name}`);
  };


  return {
    getScores,
    processScores,
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
