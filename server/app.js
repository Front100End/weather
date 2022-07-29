const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const axios = require("axios");

require("dotenv").config();

// const cors = require("cors");

// const whitelist = ["http://localhost:3000"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not Allowed Origin!"));
//     }
//   },
// };
// app.use(cors(corsOptions));

const { response } = require("express");

let connection;
let pool;
let promisePool;

// outer API Key
// const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
// const naverSearch_API_KEY_ID = process.env.REACT_APP_X_NCP_APIGW_API_KEY_ID;
// const naverSearch_API_KEY = process.env.REACT_APP_X_NCP_APIGW_API_KEY;

// outer API baseUrl
const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/onecall`;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

// ------------database mysql -------------

// app.get("/maindata", async (req, res) => {
//   try {
//     const [rows, fields] = await connection.execute(
//       "SELECT * FROM mainlocation"
//     );
//     res.send(rows);
//   } catch (err) {
//     console.log("err = ", err);
//   }
// });
// app.post("/maindata", async (req, res) => {
//   try {
//     const { name, lat, lon } = req.body;
//     const [rows, fields] = await connection.execute(
//       `INSERT INTO mainlocation(name,lat,lon) VALUES(?,?,?)`,
//       [name, lat, lon]
//     );
//     res.send("post값이 정상적으로 추가 되었습니다.");
//   } catch (err) {
//     console.log("err = ", err);
//   }
// });

// app.put("/maindata", async (req, res) => {
//   try {
//     const { name, lat, lon, id } = req.body;
//     const [rows, fields] = await connection.execute(
//       `UPDATE mainlocation SET name=?,lat=?,lon=? WHERE id =?`,
//       [name, lat, lon, id]
//     );
//     res.send("put값이 정상적으로 업데이트 되었습니다.");
//   } catch (err) {
//     console.log("err = ", err);
//   }
// });

// app.delete("/maindata/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const [rows, fields] = await connection.execute(
//       `DELETE FROM mainlocation WHERE id=?`,
//       [id]
//     );
//     res.send("delete 성공");
//   } catch (err) {
//     console.log((error = err));
//   }
// });

// app.get("/localdata", async (req, res) => {
//   try {
//     const [rows, fields] = await connection.execute(
//       "SELECT * FROM locallocation"
//     );
//     res.send(rows);
//   } catch (err) {
//     console.log("err = ", err);
//   }
// });
// app.post("/localdata", async (req, res) => {
//   try {
//     const { name, lat, lon } = req.body;
//     const [rows, fields] = await promisePool..execute(
//       `INSERT INTO locallocation(name,lat,lon) VALUES(?,?,?)`,
//       [name, lat, lon]
//     );
//     res.send(rows);
//   } catch (err) {
//     console.log("err = ", err);
//   }
// });

// app.put("/localdata", async (req, res) => {
//   try {
//     const { name, lat, lon, id } = req.body;
//     const [rows, fields] = await connection.execute(
//       `UPDATE locallocation SET name=?,lat=?,lon=? WHERE id =?`,
//       [name, lat, lon, id]
//     );
//     res.send("put값이 정상적으로 업데이트 되었습니다.");
//   } catch (err) {
//     console.log("err =", err);
//   }
// });

// app.delete("/localdata/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const [rows, fields] = await connection.execute(
//       `DELETE FROM locallocation WHERE id=?`,
//       [id]
//     );
//     res.send("delete 성공");
//   } catch (err) {
//     console.log((error = err));
//   }
// });

app.get("/maindata", async (req, res) => {
  const sql = "SELECT * FROM mainlocation";
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              result,
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});
app.post("/maindata", async (req, res) => {
  const { name, lat, lon } = req.body;
  const sql = `INSERT INTO mainlocation(name,lat,lon) VALUES(?,?,?)`;
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, [name, lat, lon], (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              message: "post값이 정상적으로 추가 되었습니다.",
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});

app.put("/maindata", async (req, res) => {
  const { name, lat, lon, id } = req.body;
  const sql = `UPDATE mainlocation SET name=?,lat=?,lon=? WHERE id =?`;
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, [name, lat, lon, id], (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              message: "put값이 정상적으로 업데이트 되었습니다.",
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});

app.delete("/maindata/:id", async (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM mainlocation WHERE id=?`;
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, [id], (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              message: "delete 성공",
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});

app.get("/localdata", async (req, res) => {
  const sql = "SELECT * FROM locallocation";
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              result,
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});
app.post("/localdata", async (req, res) => {
  const { name, lat, lon } = req.body;
  const sql = `INSERT INTO locallocation(name,lat,lon) VALUES(?,?,?)`;
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, [name, lat, lon], (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              result,
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});

app.put("/localdata", async (req, res) => {
  const { name, lat, lon, id } = req.body;
  const sql = `UPDATE locallocation SET name=?,lat=?,lon=? WHERE id =?`;
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, [name, lat, lon, id], (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              message: "put값이 정상적으로 업데이트 되었습니다.",
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});

app.delete("/localdata/:id", async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM locallocation WHERE id=?`;
  try {
    pool.getConnection((err, connection) => {
      // Connection 연결
      if (err) throw err;
      connection.query(sql, [id], (err, result, fields) => {
        // Query문 전송
        if (err) {
          console.error("connection_pool GET Error / " + err);
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.status(200).send({
              success: true,
              message: "delete 성공",
            });
          }
        }
      });
      pool.releaseConnection(connection); // Connectino Pool 반환
    });
  } catch (err) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
});

// --------------open API--------------

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

// app.get("/weatherinfo", (req, res) => {
//   const x = req.query.x;
//   const y = req.query.y;
//   axios
//     .get(
//       `${weatherBaseUrl}?lat=${x}&lon=${y}&exclude=minutely&appid=${weatherApiKey}`
//     )
//     .then((response) => {
//       res.send(response.data);
//     });
// });

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

// app.get("/naversearch", (req, res) => {
//   const value = req.query.searchKeyword;
//   axios
//     .get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`, {
//       params: {
//         query: value,
//         display: 5,
//       },
//       headers: {
//         "X-NCP-APIGW-API-KEY-ID": `${naverSearch_API_KEY_ID}`,
//         "X-NCP-APIGW-API-KEY": `${naverSearch_API_KEY}`,
//       },
//     })
//     .then((response) => {
//       res.send(response.data.addresses);
//     });
// });

// --------------open API--------------

// app.listen(PORT, async () => {
//   connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "weatherinfo",
//     password: `${process.env.REACT_APP_LOCAL_DB_PASSWORD}`,
//   });
//   console.log("server is running");
// });

// app.listen(PORT, async () => {
//   connection = await mysql.createConnection({
//     host: `${process.env.REACT_APP_HEROKU_HOST}`,
//     user: `${process.env.REACT_APP_HEROKU_USER}`,
//     database: `${process.env.REACT_APP_HEROKU_DB}`,
//     password: `${process.env.REACT_APP_HEROKU_PASSWORD}`,
//   });

//   console.log("server is running");
// });
app.listen(PORT, async () => {
  // connection = await mysql.createConnection({
  // host: `${process.env.REACT_APP_HEROKU_HOST}`,
  // user: `${process.env.REACT_APP_HEROKU_USER}`,
  // database: `${process.env.REACT_APP_HEROKU_DB}`,
  // password: `${process.env.REACT_APP_HEROKU_PASSWORD}`,
  // });
  pool = await mysql.createPool({
    host: `${process.env.REACT_APP_HEROKU_HOST}`,
    user: `${process.env.REACT_APP_HEROKU_USER}`,
    database: `${process.env.REACT_APP_HEROKU_DB}`,
    password: `${process.env.REACT_APP_HEROKU_PASSWORD}`,
    connectionLimit: 10,
  });
  console.log("server is running");
});
