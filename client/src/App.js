import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./routes/Home";
import Search from "./routes/Search";
import LocalManagement from "./routes/LocalManagement";
import axios from "axios";
import * as api from "./function/getOpenAPI";
import weatherReducer, {
  setMainLocationData,
  changeMainLocation,
  setLocalLocationData,
} from "./module/weatherReducer";

function App() {
  const [localLocation, setLocalLocation] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getMainLocation = async () => {
    try {
      let localRes = await api.getLocalData();
      let addLocalRes = Array.from(localRes.data);
      let temp = addLocalRes.map(async (now) => {
        try {
          let res = await api.getWeatherData(now.lat, now.lon);
          res.data.name = now.name;
          res.data.id = now.id;
          dispatch(setLocalLocationData(res.data));
          setLocalLocation((current) => current.concat(res.data));
        } catch (err) {
          console.log(`error 발생 => ${err}`);
        }
      });

      let mainRes = await api.getMainData();
      let mainWeatherData = await api.getWeatherData(
        mainRes.data[0].lat,
        mainRes.data[0].lon
      );
      mainWeatherData.data.name = mainRes.data[0].name;
      mainWeatherData.data.id = mainRes.data[0].id;
      dispatch(setMainLocationData(mainWeatherData.data));
    } catch (err) {
      console.log(`error = ${err}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMainLocation();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <h2>set loading...</h2>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path={`/`} element={<Home />}></Route>
            <Route
              exact
              path={`/localmanagement`}
              element={<LocalManagement />}
            ></Route>
            <Route
              exact
              path={`/localmanagement/search`}
              element={<Search />}
            ></Route>
          </Routes>
        </BrowserRouter>
      )}
    </React.Fragment>
  );
}

export default App;
