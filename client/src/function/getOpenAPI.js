import axios from "axios";

// export const getDatabase = () => axios.get("http://localhost:5000/database");
// export const postDatabase = (name, lat, lon) =>
//   axios.post("http://localhost:5000/database", {
//     name: name,
//     lat: lat,
//     lon: lon,
//   });
// export const putDatabase = (name, lat, lon, id) =>
//   axios.put("http://localhost:5000/database", {
//     name: name,
//     lat: lat,
//     lon: lon,
//     id: id,
//   });
// export const deleteDatabase = (id) =>
//   axios.delete(`http://localhost:5000/database/${id}`);

// export const getWeatherData = (lat, lon) =>
//   axios.get("http://localhost:5000/weatherinfo", {
//     params: {
//       x: lat,
//       y: lon,
//     },
//   });

export const getDatabase = () =>
  axios.get("https://weather-info-korea.herokuapp.com/database");
export const postDatabase = (name, lat, lon) =>
  axios.post("https://weather-info-korea.herokuapp.com/database", {
    name: name,
    lat: lat,
    lon: lon,
  });
export const putDatabase = (name, lat, lon, id) =>
  axios.put("https://weather-info-korea.herokuapp.com/database", {
    name: name,
    lat: lat,
    lon: lon,
    id: id,
  });
export const deleteDatabase = (id) =>
  axios.delete(`https://weather-info-korea.herokuapp.com/database/${id}`);

export const getWeatherData = (lat, lon) =>
  axios.get("https://weather-info-korea.herokuapp.com/weatherinfo", {
    params: {
      x: lat,
      y: lon,
    },
  });

// export const getDatabase = () =>
//   axios.get("https://weather-info-korea.herokuapp.com/database");
// export const getWeatherData = (lat, lon) =>
//   axios.get("https://weather-info-korea.herokuapp.com/weatherinfo", {
//     params: {
//       x: lat,
//       y: lon,
//     },
//   });
