import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./css/Menu.module.scss";
import * as api from "../function/getOpenAPI";
import { changeMainLocation } from "../module/weatherReducer";

const Menu_Section = (props) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.menuSectionWrap}>
      <section className={styles.oftenLocalWrap}>
        <div className={styles.oftenLocalTitle}>
          <div>
            <FontAwesomeIcon className={styles.starIcon} icon={faStar} />
            <span>즐겨찾는 지역</span>
          </div>
          <FontAwesomeIcon
            className={styles.questionIcon}
            icon={faCircleQuestion}
          />
        </div>
        <div>
          <h4 className={styles.oftenLocalArea}>
            {props.mainWeatherData.name}
          </h4>
          <span>{props.tempRound(props.mainWeatherData.current.temp)}°</span>
        </div>
      </section>

      <section>
        <div className={styles.localTitle}>
          <FontAwesomeIcon
            className={styles.locationIcon}
            icon={faLocationDot}
          />
          <span>다른지역</span>
        </div>

        {props.localWeatherData.map((current, idx) => {
          return (
            <button
              key={idx}
              className={styles.localWrap}
              onClick={() => {
                api.putMainData(current.name, current.lat, current.lon, 1);
                dispatch(changeMainLocation(current));
                props.toggleBtn();
              }}
            >
              <h4>{current.name}</h4>
              <div className={styles.weatherWrap}>
                {props.tempRound(current.current.temp)}°
              </div>
            </button>
          );
        })}

        <Link
          className={styles.localSettingBtn}
          to={{
            pathname: `/localmanagement`,
          }}
        >
          지역관리
        </Link>
      </section>
    </div>
  );
};

export default Menu_Section;
