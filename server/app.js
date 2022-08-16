let pool;
const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/onecall`;

const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const { response } = require("express");
const axios = require("axios");

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

// ------------database mysql -------------

app.get("/maindata", async (req, res) => {
  try {
    let connection = await pool.getConnection(async (conn) => conn);
    let [rows] = await connection.query("SELECT * FROM mainlocation");
    res.send(rows);
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});

app.post("/maindata", async (req, res) => {
  const { name, lat, lon } = req.body;

  try {
    let connection = await pool.getConnection(async (conn) => conn);
    let [rows] = await connection.query("SELECT * FROM mainlocation");
    res.send("post값이 정상적으로 추가 되었습니다.");
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});

app.put("/maindata", async (req, res) => {
  const { name, lat, lon, id } = req.body;
  try {
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    let [rows] = await connection.query(
      "UPDATE mainlocation SET name=?,lat=?,lon=? WHERE id =?",
      [name, lat, lon, id]
    );
    res.send("mainlocal put값이 정상적으로 업데이트 되었습니다.");
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});

app.delete("/maindata/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    let [rows] = await connection.query("DELETE FROM mainlocation WHERE id=?", [
      id,
    ]);
    res.send("mainlocal delete성공");
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});

app.get("/localdata", async (req, res) => {
  try {
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    let [rows] = await connection.query("SELECT * FROM locallocation");
    res.send(rows);
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});
app.post("/localdata", async (req, res) => {
  const { name, lat, lon } = req.body;
  try {
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    let [rows] = await connection.query(
      "INSERT INTO locallocation(name,lat,lon) VALUES(?,?,?)",
      [name, lat, lon]
    );
    res.send(rows);
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});

app.put("/localdata", async (req, res) => {
  const { name, lat, lon, id } = req.body;
  try {
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    let [rows] = await connection.query(
      "UPDATE locallocation SET name=?,lat=?,lon=? WHERE id =?",
      [name, lat, lon, id]
    );
    res.send("local put값이 정상적으로 업데이트 되었습니다.");
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});

app.delete("/localdata/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    let [rows] = await connection.query(
      "DELETE FROM locallocation WHERE id=?",
      [id]
    );
    res.send("localdata delete성공");
    connection.release();
  } catch (err) {
    console.log("err : ", err);
  }
});

// --------------open API--------------

//OpenWeatherMAP
app.get("/weatherinfo", (req, res) => {
  const x = req.query.x;
  const y = req.query.y;
  axios
    .get(
      `${weatherBaseUrl}?lat=${x}&lon=${y}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    .then((response) => {
      res.send(response.data);
    });
});

//NaverSearch
app.get("/naversearch", (req, res) => {
  const value = req.query.searchKeyword;
  axios
    .get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`, {
      params: {
        query: value,
        display: 5,
      },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY_ID}`,
        "X-NCP-APIGW-API-KEY": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY}`,
      },
    })
    .then((response) => {
      res.send(response.data.addresses);
    });
});

// --------------open API--------------

app.listen(PORT, async () => {
  pool = await mysql.createPool({
    host: `${process.env.REACT_APP_HEROKU_HOST}`,
    user: `${process.env.REACT_APP_HEROKU_USER}`,
    database: `${process.env.REACT_APP_HEROKU_DB}`,
    password: `${process.env.REACT_APP_HEROKU_PASSWORD}`,
    connectionLimit: 10,
  });
  console.log("server is running");
});
