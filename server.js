const express = require("express");
const app = express();
const getCityName = require("./queries/google");
const getCurrentWeatherFromCoordinates = require("./queries/current");
const getWeatherForecastFromCoordinates = require("./queries/forecast");

const port = process.env.PORT || 4000;

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.post("/getCityName", function (request, result) {
  getCityName(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.post("/getCurrentWeatherFromCoordinates", function (request, result){
  getCurrentWeatherFromCoordinates(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.post("/getWeatherForecastFromCoordinates", function (request, result){
  getWeatherForecastFromCoordinates(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.get("/", function (request, result) {
  result.send("Welcome to BikeOrCar API server");
});
