import React, { useState } from "react";
import styles from "./css/Main.module.scss";
import CurrentTemp from "./Main_CurrentTemp";
import Nav from "./Main_Nav";
import axios from "axios";
import { Link } from "react-router-dom";

const Main = (props) => {
  const [weather, setWeather] = useState("");
  const [naver, setNaver] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [loading, setLoading] = useState(false);

  const getDatabase = async () => {
    try {
      const res = await axios.get(
        "https://weather-info-korea.herokuapp.com/database"
      );
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  // .get("https://weather-info-korea.herokuapp.com/weatherinfo")
  // const getWeatherData = async () => {
  //   const x = 126.8;
  //   const y = 38.8;

  //   try {
  //     await axios
  //       .get(`http://localhost:5000/weatherinfo/:x=${x}:y=${y}`)
  //       .then((response) => {
  //         console.log(response.data.current.temp);
  //         setWeather(response.data.current.temp);
  //       });
  //   } catch (err) {
  //     console.log("find error =>", err);
  //   }
  // };
  // {

  const getWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      let res = await axios.get(
        "https://weather-info-korea.herokuapp.com/weatherinfo",
        {
          params: {
            x: lat,
            y: lon,
          },
        }
      );
      setWeather(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
    setLoading(false);
  };
  // .get("https://weather-info-korea.herokuapp.com/naversearch")
  // const getNaverData = async (searchKey) => {
  //   try {
  //     await axios
  //       .get("http://localhost:5000/naversearch", {
  //         params: {
  //           searchKeyword: searchKey,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         setNaver(response.data);
  //       });
  //   } catch (err) {
  //     console.log("find error =>", err);
  //   }
  // };
  return (
    <div className={styles.mainWrap}>
      <div className={styles.db}>
        <button onClick={getDatabase}>DB</button>
      </div>
      <div className={styles.weather}>
        <input
          type="text"
          onChange={(e) => {
            setLat(e.target.value);
          }}
          placeholder="x값"
        />
        <input
          type="text"
          onChange={(e) => {
            setLon(e.target.value);
          }}
          placeholder="y값"
        />

        <button
          onClick={(e) => {
            getWeatherData(lat, lon);
          }}
        >
          weatherinfo
        </button>
      </div>

      <Link to={{ pathname: `/search` }}>naversearching</Link>

      <Nav
        toggleBtn={props.toggleBtn}
        // menuState={props.menuState}
        // innerWidth={props.innerWidth}
        // innerHeight={props.innerHeight}
      ></Nav>
      <CurrentTemp
      // tempRound={props.tempRound}
      // innerWidth={props.innerWidth}
      // innerHeight={props.innerHeight}
      // locationName={props.locationName}
      // tempMax={props.tempMax}
      // tempMin={props.tempMin}
      // temp={props.temp}
      // tempFeelsLike={props.tempFeelsLike}
      // weather={props.weather}
      // weatherDesc={props.weatherDesc}
      // weatherIcon={props.weatherIcon}
      ></CurrentTemp>
    </div>
  );
};

export default Main;
