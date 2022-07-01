const express = require("express");
const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const database = [
  { id: 1, title: "data1" },
  { id: 2, title: "data2" },
  { id: 3, title: "data3" },
];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.get("/database", (req, res) => {
  res.send(database);
});
app.get("/database/:id", (req, res) => {
  const id = req.params.id;
  const data = database.find((el) => el.id === Number(id));
  res.send(data);
});

app.post("/add-database", (req, res) => {
  const title = req.body.title;
  database.push({
    id: database.length + 1,
    title,
  });

  res.send("post값이 정상적으로 추가 되었습니다.");
});

app.listen(PORT, () => {
  console.log("server is running");
});
