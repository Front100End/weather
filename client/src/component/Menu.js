import React from "react";
import Nav from "./Menu_Nav";
import Section from "./Menu_Section";
import Footer from "./Menu_Footer";
import styles from "./css/Menu.module.scss";

const Menu = (props) => {
  return (
    <div className={styles.menuWrap}>
      <Nav></Nav>
      <Section
        toggleBtn={props.toggleBtn}
        menuState={props.menuClosed}
        mainWeatherData={props.mainWeatherData}
        localWeatherData={props.localWeatherData}
        tempRound={props.tempRound}
      ></Section>
      <Footer></Footer>
    </div>
  );
};

export default Menu;
