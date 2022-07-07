import axios from "axios";

// export const getDatabase = () => axios.get("http://localhost:5000/database");
// export const getWeatherData = (lat, lon) =>
//   axios.get("http://localhost:5000/weatherinfo", {
//     params: {
//       x: lat,
//       y: lon,
//     },
//   });

export const getDatabase = () =>
  axios.get("https://weather-info-korea.herokuapp.com/database");
export const getWeatherData = (lat, lon) =>
  axios.get("https://weather-info-korea.herokuapp.com/weatherinfo", {
    params: {
      x: lat,
      y: lon,
    },
  });
