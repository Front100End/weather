import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
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
  // const devTools =
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__();

  // const store = createStore(weatherReducer, devTools);

  const [mainLocation, setMainLocation] = useState();
  const [mainData, setMainData] = useState();
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

  // const getlocalLocation = async () => {
  //   try {
  // let localRes = await api.getlocalData();
  // let addLocalRes = localRes.data;
  // addLocalRes.forEach(async (current, idx) => {
  //   try {
  //     let res = await api.getWeatherData(current.lat, current.lon);
  //     let addres = res.data;
  //     addres.name = current.name;
  //     console.log(addres);
  //     console.log(`${idx}번째 addres입니다`);
  //     dispatch(setLocalLocationData(addres));

  //     // setLocalLocation((prev) => [...prev, addres]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setLoading(false);
  // });
  //   } catch (err) {
  //     console.log(`err발생 = ${err}`);
  //   }
  // };

  useEffect(() => {
    // getlocalLocation();
    getMainLocation();

    // getWeatherData(mainLocation.lat, mainLocation.lon);
    // dispatch(changeMainLocation);
  }, []);

  // const initState = {
  //   mainLocation: { name: "경기도 안산시", lat: 37.3236, lon: 126.8219 },
  //   localLocation: [
  //     {
  //       name: "서울특별시",
  //       lat: 37.5683,
  //       lon: 126.9778,
  //     },
  //     {
  //       name: "부산광역시",
  //       lat: 35.1028,
  //       lon: 129.0403,
  //     },
  //   ],
  // };

  // function reducer(state = initState, action) {
  //   let tempState = { ...initState };
  //   switch (action.type) {
  //     case "changeMainLocation": {
  //       return {
  //         tempState,
  //         mainLocation: {
  //           name: action.name,
  //           lat: action.lat,
  //           lon: action.lon,
  //         },
  //       };
  //     }
  //     case "addLocalData": {
  //       return {
  //         tempState,
  //         localLocation: [
  //           ...{ name: action.name, lat: action.lat, lon: action.lon },
  //         ],
  //       };
  //     }
  //     default:
  //       return state;
  //   }
  // }

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
