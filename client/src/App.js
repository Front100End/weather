import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Home from "./routes/Home";
import axios from "axios";

function App() {
  //API ket .env
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const baseUrl = `https://api.openweathermap.org/data/2.5/onecall?`;

  const getfetch = async (x, y) => {
    let variable;
    try {
      const res = await axios
        .get(`${baseUrl}lat=${x}&lon=${y}&exclude=minutely&appid=${API_KEY}`)
        .then((response) => {
          variable = response.data;
        });
      return variable;
    } catch (err) {
      console.log("find error =>", err);
    }
  };

  const initState = {
    mainLocation: { lat: 35.1333, lon: 129.05 },
    localLocation: [
      {
        lat: 37.5683,
        lon: 126.9778,
      },
      {
        lat: 32.1028,
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

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path={`/`} element={<Home />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
