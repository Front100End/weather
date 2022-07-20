import React, { useEffect, useState } from "react";
import CurrentTemp from "./Main_CurrentTemp";
import Nav from "./Main_Nav";
import HourTemp from "./Main_HourlyTemp";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import styles from "./css/Main.module.scss";

const Main = (props) => {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <div className={styles.mainWrap}>
      {props.menuState ? (
        ""
      ) : (
        <aside
          className={styles.backBtn}
          onClick={(e) => props.toggleBtn()}
        ></aside>
      )}
      <Nav toggleBtn={props.toggleBtn} menuState={props.menuState}></Nav>
      {/* <Swiper
        scrollbar={{ draggable: true }}
        centeredSlides={true}
        slidesPerView="auto"
        onSwiper={(swiper) => console.log(swiper)}
        navigation
        pagination={{ clickable: true }}
        style={{ width: "80%", margin: "0 auto" }}
      >
        <SwiperSlide>
          <CurrentTemp
            tempRound={props.tempRound}
            loading={props.loading}
            mainWeatherData={props.mainWeatherData}
          ></CurrentTemp>
        </SwiperSlide>
        <SwiperSlide>
          <HourTemp
            tempRound={props.tempRound}
            hourlyTemp={props.hourlyTemp}
            mainWeatherData={props.mainWeatherData}
          ></HourTemp>
        </SwiperSlide>
      </Swiper> */}
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
    </div>
  );
};

export default Main;
