import React from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import DailyForecast from "./components/DailyForecast";
import CurrentForecast from "./components/CurrentForecast";


import store from "./store";
import { Provider } from "react-redux";
const dotenv = require('dotenv').config()

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Searchbar />
        <DailyForecast />
        <CurrentForecast />
      </div>
    </Provider>
  );
}

export default App;
