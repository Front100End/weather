import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styles from "../component/css/Search.module.scss";

const Search = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");

  const getNaverData = async (searchKey) => {
    setData([]);
    setLoading(true);
    setLoadingText("Loading...");
    if (value === "") {
      return setLoadingText("검색어를 입력하시지 않았습니다.");
    } else {
      try {
        const response = await axios.get(
          "https://weather-info-korea.herokuapp.com/naversearch",
          {
            params: {
              searchKeyword: searchKey,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.log("find error =>", err);
      }
      if (data !== undefined || data.length !== 0) {
        setLoading(false);
      } else {
        alert("검색 정보가 없습니다.");
      }
    }
  };
  return (
    <div className={styles.searchWrap}>
      <form className={styles.searchArea}>
        <span>
          <FontAwesomeIcon
            className={styles.backBtn}
            icon={faAngleLeft}
            onClick={() => navigate(-1)}
          />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            getNaverData(value);
          }}
        >
          검색
        </button>
      </form>
      <div className={styles.searchingResult}>
        {loading ? (
          <span>{loadingText}</span>
        ) : (
          <div>
            {data.map((current, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  console.log({ current });
                }}
              >
                <h2>{current.roadAddress}</h2>
                <h3>x좌표 : {current.x}</h3>
                <h3>y좌표 : {current.y}</h3>
              </button>
            ))}
          </div>
        )}
      </div>
      <h4 className={styles.notice}>※검색어에 정확한 지명을 입력해주세요.</h4>
    </div>
  );
};

export default Search;
