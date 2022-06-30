import React from "react";
import styles from "./css/Main.module.scss";

const Main_Nav = (props) => {
  return (
    <div className={styles.mainNavWrap}>
      <button onClick={props.toggleBtn}></button>
    </div>
  );
};

export default Main_Nav;
