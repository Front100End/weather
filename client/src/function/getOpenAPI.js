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

export const getMainData = () =>
  axios.get("https://nalssidanyang.herokuapp.com/maindata");
export const postMainData = (name, lat, lon) =>
  axios.post("https://nalssidanyang.herokuapp.com/maindata", {
    name: name,
    lat: lat,
    lon: lon,
  });
export const putMainData = (name, lat, lon, id) =>
  axios.put("https://nalssidanyang.herokuapp.com/maindata", {
    name: name,
    lat: lat,
    lon: lon,
    id: id,
  });
export const deleteMainData = (id) =>
  axios.delete(`https://nalssidanyang.herokuapp.com/maindata/${id}`);

export const getWeatherData = (lat, lon) =>
  axios.get("https://nalssidanyang.herokuapp.com/weatherinfo", {
    params: {
      x: lat,
      y: lon,
    },
  });

export const getLocalData = () =>
  axios.get("https://nalssidanyang.herokuapp.com/localdata");
export const postLocalData = (name, lat, lon) =>
  axios.post("https://nalssidanyang.herokuapp.com/localdata", {
    name: name,
    lat: lat,
    lon: lon,
  });
export const putLocalData = (name, lat, lon, id) =>
  axios.put("https://nalssidanyang.herokuapp.com/localdata", {
    name: name,
    lat: lat,
    lon: lon,
    id: id,
  });
export const deleteLocalData = (id) =>
  axios.delete(`https://nalssidanyang.herokuapp.com/localdata/${id}`);

// -----------------------------heroku
