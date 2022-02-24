const fs = require("fs");
const { json } = require("body-parser");
const express = require("express");
const app = express();

const port = 8000;
app.get("/", (req, res) => {
  res.send("Home Page");
});
const data = JSON.parse(fs.readFileSync(`${__dirname}/data/test-data.json`));
//Midleware to get data at json
app.use(json());

// Already registered
app.post("/Login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const tour = data.find((el) => el.name === name && el.password === password);
  console.log(tour);
  if (tour) {
    res.status(200).json({
      status: "success",
      message: "You are logged In",
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Wrong Password",
    });
  }
});

//New registration
app.post("/signup", (req, res) => {
  const newId = data[data.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  data.push(newTour);
  fs.writeFile(
    `${__dirname}/data/test-data.json`,
    JSON.stringify(data),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          User: newTour,
        },
      });
    }
  );
});

//server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
