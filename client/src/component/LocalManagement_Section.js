import React, { useEffect, useState } from "react";
import styles from "./css/LocalManagement.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCheck,
  faTrashCan,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../function/getOpenAPI";

import {
  changeMainLocation,
  deleteLocalcationData,
} from "../module/weatherReducer";

import LongPressable from "react-longpressable";

const LocalManagement_Section = (props) => {
  const [day, setDay] = useState();
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const [timeAMPM, setTimeAMPM] = useState("오전");
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteArray, setDeleteArray] = useState([]);

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

  const onLongPress = (e) => {
    console.log("Long pressed.");
    props.changeClickState();
    setDeleteArray([]);
  };
  const onShortPress = (current) => {
    if (deleteArray.includes(current.id)) {
      setDeleteArray(deleteArray.filter((item) => item !== current.id));
    } else {
      setDeleteArray((deleteList) => [...deleteList, current.id]);
    }
  };
  const deleteData = async (List) => {
    console.log("delete시작");
    console.log(List);
    List.forEach((current) => api.deletelocalData(current));
    List.forEach((current) => dispatch(deleteLocalcationData(current)));
  };
  // const onToggleLongClick = (e) => setLongClick((current) => !current);

  useEffect(() => {
    dayFetch();
    timeFetch();
  }, []);
  //   const date = new Date();
  //   const currentTime = `${date.getMonth()}월${date.getDay()}일 ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className={styles.localManagementSectionWrap}>
      <h3 className={styles.Title}>
        <em>즐겨찾는 지역</em>
        <span>
          <FontAwesomeIcon icon={faCircleInfo} />
        </span>
      </h3>
      <ul className={styles.LocalArea}>
        <li className={styles.localName}>
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
      <h3 className={styles.Title}>다른 지역</h3>

      <div>
        {props.localWeatherData.map((current, idx) => {
          return (
            <LongPressable
              onShortPress={
                (e) => onShortPress(current)
                // dispatch(changeMainLocation(current));
                // navigate(-1);
              }
              onLongPress={(e) => {
                onLongPress();
              }}
              lonPressTime={700}
              key={idx}
            >
              <form>
                <label htmlFor={current.idx}>
                  <ul className={styles.LocalArea}>
                    {props.longClick ? (
                      <li>
                        <input
                          type="checkbox"
                          name="deleteList"
                          id={current.idx}
                          className={styles.deleteCheckBox}
                        />
                        <label htmlFor={current.idx} />
                      </li>
                    ) : (
                      ""
                    )}
                    <li className={styles.localName}>
                      <address>{current.name}</address>
                      <p>
                        {month}월{date}일 {day} {timeAMPM} {time.hours}:
                        {time.minutes}
                      </p>
                    </li>
                    <li>
                      {props.longClick ? (
                        ""
                      ) : (
                        <div>
                          <img
                            src={props.weatherIconRender(
                              current.current.weather[0].icon
                            )}
                            alt="main weather icon error"
                          />
                          <div>
                            <p>{props.tempRound(current.current.temp)}°</p>
                            <span>
                              {props.tempRound(current.daily[0].temp.max)}°
                            </span>
                            <span>/</span>
                            <span>
                              {props.tempRound(current.daily[0].temp.min)}°
                            </span>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                </label>
              </form>
            </LongPressable>
          );
        })}
      </div>
      <footer className={styles.deleteArea} style={{ animation: "none" }}>
        <div>
          <p>제공: OpenWeatherMap</p>
        </div>
        <div>
          <p>
            {month}월{date}일 {day} {timeAMPM} {time.hours}:{time.minutes}{" "}
            업데이트
            <span>
              <FontAwesomeIcon
                icon={faArrowsRotate}
                onClick={(e) => setRefresh((current) => !current)}
              />
            </span>
          </p>
        </div>
      </footer>
      {props.longClick ? (
        <footer className={styles.deleteArea}>
          <div>
            <em>
              <FontAwesomeIcon icon={faCheck} />
            </em>
            <span>즐겨찾기 설정</span>
          </div>
          <div onClick={(e) => deleteData(deleteArray)}>
            <em>
              <FontAwesomeIcon icon={faTrashCan} />
            </em>
            <span>삭제</span>
          </div>
        </footer>
      ) : (
        ""
      )}
    </div>
  );
};

export default LocalManagement_Section;
