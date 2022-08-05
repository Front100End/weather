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
import { speechBubble } from "../function/catSpeechSet";
import { backgroundSelect } from "../function/backgroundSet";

const Main = (props) => {
  const [speechCurrent, setSpeechCurrent] = useState("");
  const [speech, setSpeech] = useState("");
  const [advice, setAdvice] = useState("");
  const [background, setBackground] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [fallSomething, setFallSomething] = useState(false);

  const ResizedComponent = () => {
    const resizeHandler = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
  };
  ResizedComponent();
  const speechCurrentSetFunction = (description) => {
    setSpeechCurrent(description);
  };

  const speechSetFunction = (description) => {
    setSpeech(description);
  };

  const adviceSetFunction = (description) => {
    setAdvice(description);
  };

  const backgroundSetFunction = (weather) => {
    setBackground(weather);
  };
  const fallSomethingFunction = () => {
    setFallSomething((current) => !current);
  };

  const windowSizeAlert = () => {
    if (windowSize.width > 1000) {
      alert(
        "이 서비스는 현재 모바일만을 지원하고 있어요.\n ctrl+Shift+C (개발자모드) 및 새로고침을 이용해 \n 모바일 기기로 전환해주세요.\n 더욱 발전하는 Weather 서비스가 되겠습니다."
      );
    }
  };

  useEffect(() => {
    speechBubble(
      props.mainWeatherData,
      speechCurrentSetFunction,
      speechSetFunction,
      adviceSetFunction
    );
    backgroundSelect(
      backgroundSetFunction,
      fallSomethingFunction,
      props.mainWeatherData
    );
  }, [props.mainWeatherData]);

  useEffect(() => {
    windowSizeAlert();
  }, []);

  return (
    <div
      className={styles.mainWrap}
      style={{
        width: `${windowSize.width}px`,
        height: `${windowSize.height}px`,
        backgroundImage: `url(${background})`,
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
      <div className={styles.sliderWrapper}>
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
              fallSomething={fallSomething}
            ></CurrentTemp>
          </SwiperSlide>
          <SwiperSlide>
            <HourTemp
              tempRound={props.tempRound}
              mainWeatherData={props.mainWeatherData}
            ></HourTemp>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.speechBubble} key={Math.random()}>
        <li>
          <p>주인님!</p>
        </li>
        <li>
          <span>{speechCurrent}</span>
        </li>

        <li>
          <em>{speech}</em>
        </li>
        <li>
          <span>{advice}</span>
        </li>
      </div>
    </div>
  );
};

export default Main;
