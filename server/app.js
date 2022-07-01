const express = require("express");
const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

require("dotenv").config();
const axios = require("axios");
const { response } = require("express");

// outer API Key
const weather_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// outer API baseUrl
const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/onecall?`;

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

// app.get("/weatherinfo", (req, res) => {
//   const res = async () => {
//     const x = 35.1333;
//     const y = 129.05;
//     try {
//       await axios
//         .get(
//           `${weatherBaseUrl}lat=${x}&lon=${y}&exclude=minutely&appid=${weather_API_KEY}`
//         )
//         .then((response) => {
//           console.log(response.data);
//         });
//     } catch (err) {
//       console.log("find error =>", err);
//     }
//   };
// });

app.listen(PORT, () => {
  console.log("server is running");
});
