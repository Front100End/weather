import React, { useState, useEffect } from "react";
import styles from "../component/css/Home.module.scss";
import Menu from "../component/Menu";
import Main from "../component/Main";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = (props) => {
  //API key .env
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const baseUrl = `https://api.openweathermap.org/data/2.5/onecall?`;

  //redux store data(location variable)
  const mainLocationLat = useSelector((state) => state.mainLocation.lat);
  const mainLocationLon = useSelector((state) => state.mainLocation.lat);
  const localLocation = useSelector((state) => state.localLocation);

  const [loading, setLoading] = useState(false);
  const [menuClosed, setMenuClosed] = useState(true);
  const [weatherData, setWeatherData] = useState([]);
  const [localWeatherData, setLocalWeatherData] = useState([]);
  const [dd, setdd] = useState([]);
  const [ee, setee] = useState([]);

  const getfetch = async (x, y) => {
    try {
      const res = await axios
        .get(`${baseUrl}lat=${x}&lon=${y}&exclude=minutely&appid=${API_KEY}`)
        .then((response) => {
          setWeatherData(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.log("find error =>", err);
    }
  };

  const localfetch = () => {
    localLocation.forEach((current) => {
      fetch(
        `${baseUrl}lat=${current.lat}&lon=${current.lon}&exclude=minutely&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((json) => setLocalWeatherData((prev) => [...prev, json]));
    });
  };
  // useEffect(() => {
  //   localfetch();
  // }, []);

  // useEffect(() => {
  //   getfetch(mainLocationLat, mainLocationLon);
  // }, [mainLocationLat, mainLocationLon]);

  const tempRound = (props) => {
    let temp = Math.round(props - 273.15);
    return temp;
  };

  //menu open close
  const toggleBtn = (e) => {
    setMenuClosed((current) => !current);
    console.log(menuClosed);
  };

  const menuOpenStyle = {
    left: `0%`,
    transition: "0.5s",
  };
  const menuCloseStyle = {
    left: "-80%",
    transition: "0.5s",
  };

  return (
    <div className={styles.homeWrap}>
      {loading ? (
        <div>
          <h2>Loading</h2>
        </div>
      ) : (
        <div
          className={styles.container}
          style={menuClosed ? menuCloseStyle : menuOpenStyle}
        >
          <Menu
            // localWeatherData={localWeatherData}
            // getfetch={getfetch}
            toggleBtn={toggleBtn}
            // locationName={weatherData.timezone}
            // temp={tempRound(weatherData.current.temp)}
            // weatherIcon={weatherData.current.weather[0].icon}
          ></Menu>
          <Main
            toggleBtn={toggleBtn}
            menuState={menuClosed}
            // locationName={weatherData.timezone}
            // hourly={weatherData.hourly}
            // weather={weatherData.current.weather[0].main}
            // weatherDesc={weatherData.current.weather[0].description}
            // weatherIcon={weatherData.current.weather[0].icon}
            // temp={tempRound(weatherData.current.temp)}
            // tempMax={tempRound(weatherData.daily[0].temp.max)}
            // tempMin={tempRound(weatherData.daily[0].temp.min)}
            // tempFeelsLike={tempRound(weatherData.current.feels_like)}
          ></Main>
        </div>
      )}
    </div>
  );
};

export default Home;
