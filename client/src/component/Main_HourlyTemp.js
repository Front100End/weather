import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import styles from "./css/Main.module.scss";

const Main_HourlyTemp = (props) => {
  const [hourly, setHourly] = useState([]);

  useEffect(() => {
    let temp = props.mainWeatherData.hourly;
    setHourly(temp.slice(1, 12));
  }, [props.mainWeatherData]);

  const unixTimeTransform = (dt) => {
    let UnixTime = new Date(dt * 1000);
    let AMPM = "";

    let hour = UnixTime.getHours();

    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (hour < 12) {
      AMPM = "오전";
    }
    if (hour >= 12) {
      AMPM = "오후";
    }
    return `${AMPM} ${hour}`;
  };
  const weatherIconRender = (currentIcon) => {
    let icon = `https://openweathermap.org/img/wn/${currentIcon}.png`;
    return icon;
  };

  return (
    <div>
      <ul className={styles.mainHourlyWrap}>
        {hourly.map((current, idx) => {
          return (
            <li key={idx}>
              <span>{unixTimeTransform(current.dt)}시</span>
              <img
                src={weatherIconRender(current.weather[0].icon)}
                alt="1hour weatherIcon error"
              />
              <em>{props.tempRound(current.temp)}°</em>
              <p>{Math.round(current.pop * 10) * 10}%</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Main_HourlyTemp;
