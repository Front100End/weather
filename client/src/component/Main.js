import React, { useEffect, useState } from "react";
import CurrentTemp from "./Main_CurrentTemp";
import Nav from "./Main_Nav";
import HourTemp from "./Main_HourlyTemp";
import { debounce } from "lodash";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./css/Main.module.scss";

const Main = (props) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const ResizedComponent = () => {
    const resizeHandler = debounce(() => {
      if (window.innerWidth >= 700) {
        setWindowSize({
          width: 700,
          height: window.innerHeight,
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }, 100);
    useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
  };
  ResizedComponent();

  console.log(windowSize);
  return (
    <div
      className={styles.mainWrap}
      style={{
        width: `${windowSize.width}px`,
        height: `${windowSize.height}px`,
      }}
    >
      {props.menuState ? (
        ""
      ) : (
        <aside
          className={styles.backBtn}
          onClick={(e) => props.toggleBtn()}
        ></aside>
      )}
      <Nav toggleBtn={props.toggleBtn} menuState={props.menuState}></Nav>

      <Swiper
        modules={[Pagination]}
        className="banner"
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        style={{ marginTop: "25%" }}
      >
        <SwiperSlide>
          <CurrentTemp
            tempRound={props.tempRound}
            loading={props.loading}
            mainWeatherData={props.mainWeatherData}
          ></CurrentTemp>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <HourTemp
              tempRound={props.tempRound}
              hourlyTemp={props.hourlyTemp}
              mainWeatherData={props.mainWeatherData}
            ></HourTemp>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className={styles.speechBubble}></div>
      {/* <section>
        <CurrentTemp
          tempRound={props.tempRound}
          loading={props.loading}
          mainWeatherData={props.mainWeatherData}
        ></CurrentTemp>
        <HourTemp
          tempRound={props.tempRound}
          hourlyTemp={props.hourlyTemp}
          mainWeatherData={props.mainWeatherData}
        ></HourTemp>
      </section> */}
    </div>
  );
};

export default Main;
