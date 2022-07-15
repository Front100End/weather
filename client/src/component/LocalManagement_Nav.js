import React, { useState } from "react";
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
  const [optionOpen, setOptionOpen] = useState(false);
  return (
    <ul className={styles.navWrap}>
      <li className={styles.leftContents}>
        <span>
          <FontAwesomeIcon
            className={styles.backBtn}
            icon={faAngleLeft}
            onClick={(e) => {
              if (optionOpen == true) {
                setOptionOpen((current) => !current);
                console.log("왜 안하구가?");
              } else {
                navigate(-1);
              }
            }}
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
            onClick={(e) => setOptionOpen((current) => !current)}
          />
        </em>
        {optionOpen ? (
          <button
            onClick={(e) => {
              props.changeClickState();
              setOptionOpen((current) => !current);
            }}
          >
            편집
          </button>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
};

export default LocalManagement_Nav;
