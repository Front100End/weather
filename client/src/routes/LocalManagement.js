import React, { useState, useEffect } from "react";
import styles from "../component/css/LocalManagement.module.scss";
import Nav from "../component/LocalManagement_Nav";
import Section from "../component/LocalManagement_Section";
import axios from "axios";
import { useSelector } from "react-redux";
import * as api from "../function/getOpenAPI";

const Local_Management = (props) => {
  const mainLocationLat = useSelector((state) => state.mainLocationData[0].lat);
  const mainLocationLon = useSelector((state) => state.mainLocationData[0].lon);
  const mainLocationName = useSelector(
    (state) => state.mainLocationData[0].name
  );
  const mainWeatherData = useSelector((state) => state.mainLocationData[0]);
  const localWeatherData = useSelector((state) => state.localLocationData);

  // const [loading, setLoading] = useState(true);
  // const [weatherData, setWeatherData] = useState([]);
  // const [localWeatherData, setLocalWeatherData] = useState([]);

  // const localfetch = () => {
  //   localLocation.forEach(async (current) => {
  //     try {
  //       let res = await api.getWeatherData(current.lat, current.lon);
  //       let addres = res.data;
  //       addres.name = current.name;
  //       setLocalWeatherData((prev) => [...prev, addres]);
  //     } catch (error) {
  //       console.log("error => " + error);
  //     }
  //   });
  // };

  // const getWeatherData = async (lat, lon) => {
  //   setLoading(true);
  //   try {
  //     let res = await api.getWeatherData(lat, lon);
  //     setWeatherData(res.data);
  //   } catch (err) {
  //     console.log("find error =>", err);
  //   }
  //   setLoading(false);
  // };

  const tempRound = (props) => {
    let temp = Math.round(props - 273.15);
    return temp;
  };
  const weatherIconRender = (currentIcon) => {
    let icon = `https://openweathermap.org/img/wn/${currentIcon}.png`;
    return icon;
  };

  // useEffect(() => {
  //   localfetch();
  // }, []);

  // useEffect(() => {
  //   getWeatherData(mainLocationLat, mainLocationLon);
  // }, [mainLocationLat, mainLocationLon]);
  return (
    <div className={styles.localManagementWrap}>
      {/* {loading ? (
        <div>Is Loading...</div>
      ) : ( */}
      <React.Fragment>
        <Nav></Nav>
        <Section
          weatherData={mainWeatherData}
          localWeatherData={localWeatherData}
          mainLocationName={mainWeatherData.name}
          weatherIconRender={weatherIconRender}
          tempRound={tempRound}
        ></Section>
      </React.Fragment>
      {/* )} */}
    </div>
  );
};

export default Local_Management;
