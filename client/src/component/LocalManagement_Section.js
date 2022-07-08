import React, { useEffect, useState } from "react";
import styles from "./css/LocalManagement.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const LocalManagement_Section = (props) => {
  const [day, setDay] = useState();
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const [timeAMPM, setTimeAMPM] = useState("오전");
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();

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

  useEffect(() => {
    dayFetch();
    timeFetch();
    console.log(props.weatherData);
    console.log(props.localWeatherData);
    console.log(props.mainLocationName);
  }, []);
  //   const date = new Date();
  //   const currentTime = `${date.getMonth()}월${date.getDay()}일 ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className={styles.localManagementSectionWrap}>
      <h3 className={styles.oftenTitle}>
        <em>즐겨찾는 지역</em>
        <span>
          <FontAwesomeIcon icon={faCircleInfo} />
        </span>
      </h3>
      <ul className={styles.oftenLocalArea}>
        <li>
          <address>{props.mainLocationName}</address>
          <p>
            {month}월{date}일 {day} {timeAMPM} {time.hours}:{time.minutes}
          </p>
        </li>
        <li>
          <div>
            <img
              src={props.weatherIconRender(
                props.weatherData.current.weather[0].icon
              )}
              alt="main weather icon error"
            />
            <div>
              <p>{props.tempRound(props.weatherData.current.temp)}°</p>
              <span>
                {props.tempRound(props.weatherData.daily[0].temp.max)}°
              </span>
              <span>/</span>
              <span>
                {props.tempRound(props.weatherData.daily[0].temp.min)}°
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LocalManagement_Section;
