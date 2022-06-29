import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Home from "./routes/Home";

const initState = {
  mainLocation: { lat: 35.1333, lon: 129.05 },
  localList: [
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
    case "locationChange": {
      return {
        tempState,
        mainLocation: {
          lat: action.lat,
          lon: action.lon,
        },
      };
    }
    default:
      return state;
  }
}

const store = createStore(reducer);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={`/`} element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
