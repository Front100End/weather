import React, { useState, useEffect } from "react";
import styles from "../component/css/Home.module.scss";
import Menu from "../component/Menu";
import Main from "../component/Main";
import axios from "axios";
import { useSelector } from "react-redux";
import * as api from "../function/getOpenAPI";

const Home = (props) => {
  const [reRender, setReRender] = useState(1);
  const mainLocationData = useSelector((state) => state.mainLocationData[0]);
  const localLocationData = useSelector((state) => state.localLocationData);

  const [loading, setLoading] = useState(true);
  const [menuClosed, setMenuClosed] = useState(true);

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
      <div
        className={styles.container}
        style={menuClosed ? menuCloseStyle : menuOpenStyle}
      >
        <Menu
          toggleBtn={toggleBtn}
          tempRound={tempRound}
          menuState={menuClosed}
          loading={loading}
          localWeatherData={localLocationData}
          mainWeatherData={mainLocationData}
        ></Menu>
        <Main
          toggleBtn={toggleBtn}
          menuState={menuClosed}
          tempRound={tempRound}
          mainWeatherData={mainLocationData}
          loading={loading}
        ></Main>
      </div>
    </div>
  );
};

export default Home;
