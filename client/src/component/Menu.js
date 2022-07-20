import React, { useState, useEffect } from "react";
import Nav from "./Menu_Nav";
import Section from "./Menu_Section";
import Footer from "./Menu_Footer";
import styles from "./css/Menu.module.scss";
import { useSelector } from "react-redux";
import * as api from "../function/getOpenAPI";
import axios from "axios";

const Menu = (props) => {
  return (
    <div className={styles.menuWrap}>
      <Nav></Nav>
      <Section
        mainWeatherData={props.mainWeatherData}
        localWeatherData={props.localWeatherData}
        tempRound={props.tempRound}
      ></Section>
      <Footer></Footer>
    </div>
  );
};

export default Menu;
