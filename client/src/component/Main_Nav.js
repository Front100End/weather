import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import styles from "./css/Main.module.scss";

const Main_Nav = (props) => {
  return (
    <div className={styles.mainNavWrap}>
      <span>
        <FontAwesomeIcon
          className={styles.burgerBtn}
          onClick={(e) => props.toggleBtn()}
          icon={faAlignJustify}
        />
      </span>
    </div>
  );
};

export default Main_Nav;
