import "./App.css";
import React from "react";
import CitySearch from "./components/CitySearch";

export const App = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Weather Forecast</h1>
      <CitySearch />
    </div>
  );
};
