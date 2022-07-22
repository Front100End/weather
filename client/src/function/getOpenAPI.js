import axios from "axios";

// export const getMainData = () => axios.get("http://localhost:5000/maindata");
// export const postMainData = (name, lat, lon) =>
//   axios.post("http://localhost:5000/maindata", {
//     name: name,
//     lat: lat,
//     lon: lon,
//   });
// export const putMainData = (name, lat, lon, id) =>
//   axios.put("http://localhost:5000/maindata", {
//     name: name,
//     lat: lat,
//     lon: lon,
//     id: id,
//   });
// export const deleteMainData = (id) =>
//   axios.delete(`http://localhost:5000/maindata/${id}`);

// export const getWeatherData = (lat, lon) =>
//   axios.get("http://localhost:5000/weatherinfo", {
//     params: {
//       x: lat,
//       y: lon,
//     },
//   });

// export const getLocalData = () => axios.get("http://localhost:5000/localdata");
// export const postLocalData = (name, lat, lon) =>
//   axios.post("http://localhost:5000/localdata", {
//     name: name,
//     lat: lat,
//     lon: lon,
//   });
// export const putLocalData = (name, lat, lon, id) =>
//   axios.put("http://localhost:5000/localdata", {
//     name: name,
//     lat: lat,
//     lon: lon,
//     id: id,
//   });
// export const deleteLocalData = (id) =>
//   axios.delete(`http://localhost:5000/localdata/${id}`);

// -----------------------local--------------------

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

export const getlocalData = () =>
  axios.get("https://weather-info-korea.herokuapp.com/localdata");
export const postlocalData = (name, lat, lon) =>
  axios.post("https://weather-info-korea.herokuapp.com/localdata", {
    name: name,
    lat: lat,
    lon: lon,
  });
export const putlocalData = (name, lat, lon, id) =>
  axios.put("https://weather-info-korea.herokuapp.com/localdata", {
    name: name,
    lat: lat,
    lon: lon,
    id: id,
  });
export const deletelocalData = (id) =>
  axios.delete(`https://weather-info-korea.herokuapp.com/localdata/${id}`);

// -----------------------------heroku

// export const getDatabase = () =>
//   axios.get("https://weather-info-korea.herokuapp.com/database");
// export const postDatabase = (name, lat, lon) =>
//   axios.post("https://weather-info-korea.herokuapp.com/database", {
//     name: name,
//     lat: lat,
//     lon: lon,
//   });
// export const putDatabase = (name, lat, lon, id) =>
//   axios.put("https://weather-info-korea.herokuapp.com/database", {
//     name: name,
//     lat: lat,
//     lon: lon,
//     id: id,
//   });
// export const deleteDatabase = (id) =>
//   axios.delete(`https://weather-info-korea.herokuapp.com/database/${id}`);

// export const getWeatherData = (lat, lon) =>
//   axios.get("https://weather-info-korea.herokuapp.com/weatherinfo", {
//     params: {
//       x: lat,
//       y: lon,
//     },
//   });
