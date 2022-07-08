import React from "react";
import styles from "./css/LocalManagement.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPlus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

const LocalManagement_Nav = (props) => {
  const navigate = useNavigate();
  return (
    <ul className={styles.navWrap}>
      <li className={styles.leftContents}>
        <span>
          <FontAwesomeIcon
            className={styles.backBtn}
            icon={faAngleLeft}
            onClick={() => navigate(-1)}
          />
        </span>
        <h3>지역관리</h3>
      </li>
      <li className={styles.rightContents}>
        <span>
          <Link to={{ pathname: `/localmanagement/search` }}>
            <FontAwesomeIcon className={styles.addBtn} icon={faPlus} />
          </Link>
        </span>
        <em>
          <FontAwesomeIcon
            className={styles.menuBtn}
            icon={faEllipsisVertical}
          />
        </em>
      </li>
    </ul>
  );
};

export default LocalManagement_Nav;
