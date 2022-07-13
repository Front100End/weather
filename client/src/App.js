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
  addTemp,
  changeMainLocation,
} from "./module/weatherReducer";

function App() {
  // const devTools =
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__();

  // const store = createStore(weatherReducer, devTools);

  const [mainLocation, setMainLocation] = useState();
  const [mainData, setMainData] = useState();
  const dispatch = useDispatch();

  const getMainLocation = async () => {
    try {
      let res = await api.getDatabase();
      console.log(res.data);
      let dataRes = await api
        .getWeatherData(res.data[0].lat, res.data[0].lon)
        .then((response) => {
          console.log(response.data);
          dispatch(addTemp(response.data));
        });
    } catch (err) {
      console.log(`error = ${err}`);
    }
  };

  useEffect(() => {
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
    <BrowserRouter>
      {/* <Provider store={store}> */}
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
      {/* </Provider> */}
    </BrowserRouter>
  );
}

export default App;
