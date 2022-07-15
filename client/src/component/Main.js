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
  const getDatabase = async () => {
    try {
      let res = await api.getDatabase();
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  const postDatabase = async () => {
    try {
      let res = await api.postDatabase("경기도 안산시", 38.2342, 128.123);
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  const putDatabase = async () => {
    try {
      let res = await api.putDatabase("경기도 수원시", 37.2342, 128.123, 5);
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  const deleteDatabase = async () => {
    try {
      let res = await api.deleteDatabase(54);
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };

  const getlocalData = async () => {
    try {
      let res = await api.getlocalData();
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  const postlocalData = async () => {
    try {
      let res = await api.postlocalData("경기도 안산시", 38.2342, 128.123);
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  const putlocalData = async () => {
    try {
      let res = await api.putlocalData("경기도 수원시", 37.2342, 128.123, 5);
      console.log(res);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  const deletelocalData = async () => {
    try {
      let res = await api.deletelocalData(15);
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };
  return (
    <div className={styles.mainWrap}>
      {props.menuState ? (
        ""
      ) : (
        <aside
          className={styles.backBtn}
          onClick={(e) => props.toggleBtn()}
        ></aside>
      )}
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
      <button onClick={(e) => getDatabase()}>get버튼</button>
      <button onClick={(e) => postDatabase()}>post버튼</button>
      <button onClick={(e) => putDatabase()}>put버튼</button>
      <button onClick={(e) => deleteDatabase()}>delete버튼</button>
      <br></br>
      <button onClick={(e) => getlocalData()}>localget버튼</button>
      <button onClick={(e) => postlocalData()}>localpost버튼</button>
      <button onClick={(e) => putlocalData()}>localput버튼</button>
      <button onClick={(e) => deletelocalData()}>localdelete버튼</button>
    </div>
  );
};

export default Main;
