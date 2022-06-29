import React, { useState } from "react";
import styles from "../component/css/Home.module.scss";

const Home = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.homeWrap}>
      {loading ? <div>Loading</div> : <div>진행중</div>}
    </div>
  );
};

export default Home;
