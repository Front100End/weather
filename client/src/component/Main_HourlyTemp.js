import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import styles from "./css/Main.module.scss";

const Main_HourlyTemp = (props) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const ResizedComponent = () => {
    const resizeHandler = debounce(() => {
      if (window.innerWidth >= 700) {
        setWindowSize({
          width: "700px",
          height: window.innerHeight,
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      console.log(windowSize);
    }, 100);
    useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
  };
  ResizedComponent();

  let hourly = props.hourlyTemp.slice(1, 19);

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

  useEffect(() => {
    unixTimeTransform();
  }, []);
  return (
    <React.Fragment>
      <ul
        className={styles.mainHourlyWrap}
        style={{ width: `${windowSize.width * 0.9}px` }}
      >
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
    </React.Fragment>
  );
};

export default Main_HourlyTemp;
