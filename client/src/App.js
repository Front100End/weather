import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Home from "./routes/Home";
import Search from "./routes/Search";
import axios from "axios";
import * as api from "./function/getOpenAPI";

function App() {
  const initState = {
    mainLocation: { name: "경기도 안산시", lat: 37.3236, lon: 126.8219 },
    localLocation: [
      {
        name: "서울특별시",
        lat: 37.5683,
        lon: 126.9778,
      },
      {
        name: "부산광역시",
        lat: 35.1028,
        lon: 129.0403,
      },
    ],
  };

  function reducer(state = initState, action) {
    const tempState = { ...initState };
    switch (action.type) {
      case "changeMainLocation": {
        return {
          tempState,
          mainLocation: {
            lat: action.lat,
            lon: action.lon,
          },
        };
      }
      case "addLocalData": {
        return {
          tempState,
          localLocation: [...{ lat: action.lat, lon: action.lon }],
        };
      }
      default:
        return state;
    }
  }
  const store = createStore(reducer);

  const getDatabase = async () => {
    try {
      const res = await api.getDatabase();
      console.log(res.data);
    } catch (err) {
      console.log("find error =>", err);
    }
  };

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path={`/`} element={<Home />}></Route>
          <Route exact path={`/search`} element={<Search />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
