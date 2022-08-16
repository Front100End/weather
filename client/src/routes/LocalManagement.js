import React, { useState } from "react";
import styles from "../component/css/LocalManagement.module.scss";
import Nav from "../component/LocalManagement_Nav";
import Section from "../component/LocalManagement_Section";
import { useSelector } from "react-redux";

const Local_Management = (props) => {
  const mainWeatherData = useSelector((state) => state.mainLocationData[0]);
  const localWeatherData = useSelector((state) => state.localLocationData);
  const [longClick, setLongClick] = useState(false);
  const changeClickState = () => {
    setLongClick((current) => !current);
  };

  const tempRound = (props) => {
    let temp = Math.round(props - 273.15);
    return temp;
  };
  const weatherIconRender = (currentIcon) => {
    let icon = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    return icon;
  };

  return (
    <div className={styles.localManagementWrap}>
      <React.Fragment>
        <Nav longClick={longClick} changeClickState={changeClickState}></Nav>
        <Section
          weatherData={mainWeatherData}
          localWeatherData={localWeatherData}
          mainLocationName={mainWeatherData.name}
          weatherIconRender={weatherIconRender}
          tempRound={tempRound}
          longClick={longClick}
          changeClickState={changeClickState}
        ></Section>
      </React.Fragment>
    </div>
  );
};

export default Local_Management;
