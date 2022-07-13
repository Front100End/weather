import React, { useState, useEffect } from "react";
import styles from "../component/css/Home.module.scss";
import Menu from "../component/Menu";
import Main from "../component/Main";
import axios from "axios";
import { useSelector } from "react-redux";
import * as api from "../function/getOpenAPI";

const Home = (props) => {
  //redux store data(location variable)
  const mainLocationLat = useSelector((state) => state.mainLocation.lat);
  const mainLocationLon = useSelector((state) => state.mainLocation.lon);
  const mainLocationName = useSelector((state) => state.mainLocation.name);
  const localLocation = useSelector((state) => state.localLocation);

  const [loading, setLoading] = useState(true);
  const [menuClosed, setMenuClosed] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [localWeatherData, setLocalWeatherData] = useState([]);

  // const mainLocationFetch = async() => {
  //   const res = await api.getDatabase();

  // }

  const localfetch = () => {
    localLocation.forEach(async (current) => {
      try {
        let res = await api.getWeatherData(current.lat, current.lon);
        let addres = res.data;
        addres.name = current.name;
        setLocalWeatherData((prev) => [...prev, addres]);
      } catch (error) {
        console.log("error => " + error);
      }
    });
  };

  const getWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      let res = await api.getWeatherData(lat, lon);
      setWeatherData(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
    setLoading(false);
  };
  useEffect(() => {
    localfetch();
  }, []);

  useEffect(() => {
    getWeatherData(mainLocationLat, mainLocationLon);
    toggleBtn();
  }, [mainLocationLat, mainLocationLon]);

  // const localfetch = () => {
  //   localLocation.forEach((current) => {
  //     fetch(
  //       `${baseUrl}lat=${current.lat}&lon=${current.lon}&exclude=minutely&appid=${API_KEY}`
  //     )
  //       .then((res) => res.json())
  //       .then((json) => setLocalWeatherData((prev) => [...prev, json]));
  //   });
  // };
  // useEffect(() => {
  //   localfetch();
  // }, []);

  const tempRound = (props) => {
    let temp = Math.round(props - 273.15);
    return temp;
  };

  //menu open close
  const toggleBtn = (e) => {
    setMenuClosed((current) => !current);
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
          <h2 style={{ color: "white" }}>Loading</h2>
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
            tempRound={tempRound}
            menuState={menuClosed}
            loading={loading}
            localWeatherData={localWeatherData}
            mainLocationName={mainLocationName}
            currentTemp={weatherData.current}

            // locationName={weatherData.timezone}
            // temp={tempRound(weatherData.current.temp)}
            // weatherIcon={weatherData.current.weather[0].icon}
          ></Menu>
          <Main
            toggleBtn={toggleBtn}
            menuState={menuClosed}
            tempRound={tempRound}
            mainLocationName={mainLocationName}
            currentTemp={weatherData.current}
            todayTemp={weatherData.daily}
            hourlyTemp={weatherData.hourly}
            totalWeather={weatherData}
            loading={loading}
          ></Main>
        </div>
      )}
    </div>
  );
};

export default Home;
