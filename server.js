const express = require("express");
const app = express();
const getCityName = require("./queries/google");
const getCurrentWeatherFromCoordinates = require("./queries/current");
const getWeatherForecastFromCoordinates = require("./queries/forecast");

const port = process.env.PORT || 4000;

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

const whitelist = ["https://localhost:3000", "http://localhost:3000", "https://bikeorcar-develop.herokuapp.com/", "http://bikeorcar-develop.herokuapp.com/", "https://bikeorcar.herokuapp.com/", "http://bikeorcar.herokuapp.com/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}:

app.use(function(request, result, next) {
  result.header("Access-Control-Allow-Origin", whitelist); // Put an origin here, * means everything which is bad.
  result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Needed by ExpressJS
  next();
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.post("/getCityName", cors(corsOptions), function (request, result) {
  getCityName(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.post("/getCurrentWeatherFromCoordinates", cors(corsOptions), function (request, result){
  getCurrentWeatherFromCoordinates(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.post("/getWeatherForecastFromCoordinates", cors(corsOptions), function (request, result){
  getWeatherForecastFromCoordinates(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.get("/", function (request, result) {
  result.send("Welcome to BikeOrCar API server");
});
