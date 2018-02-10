const wundergroundId = process.env.wundergroundId;
const fetch = require("node-fetch");

function getWeatherForecastFromCoordinates(latitude, longitude){
  return fetch(`https://api.wunderground.com/api/${wundergroundId}/hourly10day/lang:FR/q/${latitude},${longitude}.json`)
  .then(response => response.json())
  .then(returnedData => returnedData.hourly_forecast)
  .catch(error => {
    console.warn("Error while getting forecasts from Wunderground : " + error);
  });
}

 module.exports = getWeatherForecastFromCoordinates;
