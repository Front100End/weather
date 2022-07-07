import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./css/Menu.module.scss";

const Menu_Section = (props) => {
  const dispatch = useDispatch();
  const changeMainLocation = (lat, lon) => ({
    type: "changeMainLocation",
    lat: lat,
    lon: lon,
  });
  useEffect(() => {
    console.log(props.localWeatherData);
  }, []);
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
        <p className={styles.oftenLocalArea}>경기도 안산시청</p>
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
              onClick={() =>
                dispatch(changeMainLocation(current.lat, current.lon))
              }
            >
              <h3>{current.name}</h3>
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
        {/* <button className={styles.localSettingBtn}>지역 관리</button> */}
      </section>
    </div>
  );
};

export default Menu_Section;
