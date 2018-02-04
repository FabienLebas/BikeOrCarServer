const express = require("express");
const app = express();

const getCityName = require("./queries/google");

const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.post("/getCityName", function (request, result) {
  getCityName("50.6793842", "3.1836387")
    .then(object => {
      result.json(JSON.stringify(object));
    })
});

app.get("/", function (request, result) {
  result.send("Welcome to BikeOrCar API server");
});
