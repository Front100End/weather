import React, { useState, useEffect } from "react";
import styles from "./css/Main.module.scss";

const Main_CurrentTemp = (props) => {
  const [day, setDay] = useState();
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  const [timeAMPM, setTimeAMPM] = useState("오전");
  useEffect(() => {
    dayFetch();
    timeFetch();
    weatherIconRender();
  }, []);

  const dayFetch = () => {
    let time = new Date();
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    let currentDayLabel = week[time.getDay()];
    setDay(currentDayLabel);
  };
  const timeFetch = () => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    setTime({ hours: hours, minutes: minutes < 10 ? "0" + minutes : minutes });
    if (hours < 12) {
      setTimeAMPM("오전");
    }
    if (hours >= 12) {
      setTimeAMPM("오후");
    }
  };
  const weatherIconRender = (currentIcon) => {
    let icon = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    return icon;
  };
  return (
    <React.Fragment>
      <div
        className={styles.mainCurrentWrap}
        style={props.fallSomething ? { color: "#fff" } : {}}
      >
        <div className={styles.container}>
          <div className={styles.info}>
            <h2 className={styles.maintemp}>
              {props.tempRound(props.mainWeatherData.current.temp)}°
            </h2>
            <p className={styles.locationName}>{props.mainWeatherData.name}</p>

            <div className={styles.tempWrap}>
              <span className={styles.tempMin}>
                {props.tempRound(props.mainWeatherData.daily[0].temp.min)}° /
              </span>
              <span className={styles.tempMax}>
                {props.tempRound(props.mainWeatherData.daily[0].temp.max)}°
              </span>
              <span className={styles.sensibleTemp}>
                체감온도{" "}
                {props.tempRound(props.mainWeatherData.current.feels_like)}°
              </span>
            </div>

            <div className={styles.dateWrap}>
              <span className={styles.date}>{day},</span>
              <span className={styles.time}>
                {timeAMPM}
                {time.hours}:{time.minutes}
              </span>
            </div>
          </div>
          <img
            src={weatherIconRender(
              props.mainWeatherData.current.weather[0].icon
            )}
            alt="weatherIcon error"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main_CurrentTemp;
