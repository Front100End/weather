import React from "react";
import styles from "./css/Main.module.scss";
import CurrentTemp from "./Main_CurrentTemp";
import Nav from "./Main_Nav";

const Main = (props) => {
  return (
    <div className={styles.mainWrap}>
      <Nav
        toggleBtn={props.toggleBtn}
        menuState={props.menuState}
        innerWidth={props.innerWidth}
        innerHeight={props.innerHeight}
      ></Nav>
      <CurrentTemp
        tempRound={props.tempRound}
        innerWidth={props.innerWidth}
        innerHeight={props.innerHeight}
        locationName={props.locationName}
        tempMax={props.tempMax}
        tempMin={props.tempMin}
        temp={props.temp}
        tempFeelsLike={props.tempFeelsLike}
        weather={props.weather}
        weatherDesc={props.weatherDesc}
        weatherIcon={props.weatherIcon}
      ></CurrentTemp>
    </div>
  );
};

export default Main;
