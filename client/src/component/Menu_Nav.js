import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import styles from "./css/Menu.module.scss";

const Menu_Nav = (props) => {
  return (
    <div className={styles.menuNavWrap}>
      <FontAwesomeIcon className={styles.gear} icon={faGear} />
    </div>
  );
};

export default Menu_Nav;
