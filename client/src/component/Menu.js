import React, { useState, useEffect } from "react";
import Nav from "./Menu_Nav";
import Section from "./Menu_Section";
import Footer from "./Menu_Footer";
import styles from "./css/Menu.module.scss";
import { useSelector } from "react-redux";
import * as api from "../function/getOpenAPI";
import axios from "axios";

const Menu = (props) => {
  // const localLocation = useSelector((state) => state.localLocation);
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
  // useEffect(() => {
  //   localfetch();
  // }, [localLocation]);
  console.log(props.localWeatherData);

  return (
    <div className={styles.menuWrap}>
      <Nav></Nav>
      <Section
        localWeatherData={props.localWeatherData}
        tempRound={props.tempRound}
        currentTemp={props.currentTemp}
        mainLocationName={props.mainLocationName}
      ></Section>
      <Footer></Footer>
    </div>
  );
};

export default Menu;
