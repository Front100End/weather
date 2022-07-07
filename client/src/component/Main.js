import React, { useEffect, useState } from "react";
import styles from "./css/Main.module.scss";
import CurrentTemp from "./Main_CurrentTemp";
import Nav from "./Main_Nav";
import HourTemp from "./Main_HourlyTemp";
import axios from "axios";
import { Link } from "react-router-dom";
import * as api from "../function/getOpenAPI";
import { useSelector } from "react-redux";

const Main = (props) => {
  // const [weatherData, setWeatherData] = useState("");
  // const [naver, setNaver] = useState("");
  // const [searchKey, setSearchKey] = useState("");
  // const [loading, setLoading] = useState(false);

  // const mainLocationlat = useSelector((state) => state.mainLocation.lat);
  // const mainLocationlon = useSelector((state) => state.mainLocation.lon);

  // const getDatabase = async () => {
  //   try {
  //     const res = await api.getDatabase();
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log("find error =>", err);
  //   }
  // };
  // const getWeatherData = async (lat, lon) => {
  //   setLoading(true);
  //   try {
  //     let res = await api.getWeatherData(lat, lon);
  //     setWeatherData(res.data);

  //     console.log(res.data);
  //   } catch (err) {
  //     console.log("find error =>", err);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   console.log(props.currentTemp);
  //   console.log(props.todayTemp);
  //   console.log(props.hourlyTemp);
  // }, []);

  // const getWeatherData = async (lat, lon) => {
  //   setLoading(true);
  //   try {
  //     let res = await axios.get(
  //       "https://weather-info-korea.herokuapp.com/weatherinfo",
  //       {
  //         params: {
  //           x: lat,
  //           y: lon,
  //         },
  //       }
  //     );
  //     setWeather(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log("find error =>", err);
  //   }
  //   setLoading(false);
  // };
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
      {/* <Link to={{ pathname: `/search` }}>naversearching</Link> */}

      <Nav toggleBtn={props.toggleBtn} menuState={props.menuState}></Nav>
      <CurrentTemp
        tempRound={props.tempRound}
        mainLocationName={props.mainLocationName}
        currentTemp={props.currentTemp}
        todayTemp={props.todayTemp}
        totalWeather={props.totalWeather}
        loading={props.loading}
      ></CurrentTemp>
      <HourTemp
        tempRound={props.tempRound}
        hourlyTemp={props.hourlyTemp}
      ></HourTemp>
    </div>
  );
};

export default Main;
