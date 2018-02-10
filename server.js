const express = require("express");
const app = express();
var cors = require('cors')

const getCityName = require("./queries/google");
const getCurrentWeatherFromCoordinates = require("./queries/current");
const getWeatherForecastFromCoordinates = require("./queries/forecast");

const port = process.env.PORT || 4000;

app.options('*', cors()) // include before other routes

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

const whitelist = ["https://localhost:3000/", "http://localhost:3000/", "https://bikeorcar-develop.herokuapp.com/", "http://bikeorcar-develop.herokuapp.com/", "https://bikeorcar.herokuapp.com/", "http://bikeorcar.herokuapp.com/"];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
};

app.use(function(request, result, next) {
  result.header("Access-Control-Allow-Origin", "*"); // Put an origin here, * means everything which is bad.
  result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Needed by ExpressJS
  next();
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.post("/getCityName", cors(corsOptionsDelegate), function (request, result) {
  getCityName(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.post("/getCurrentWeatherFromCoordinates", cors(corsOptionsDelegate), function (request, result){
  getCurrentWeatherFromCoordinates(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.post("/getWeatherForecastFromCoordinates", cors(corsOptionsDelegate), function (request, result){
  getWeatherForecastFromCoordinates(request.body.latitude, request.body.longitude)
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.get("/", function (request, result) {
  result.send("Welcome to BikeOrCar API server");
});
