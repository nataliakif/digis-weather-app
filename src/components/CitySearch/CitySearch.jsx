import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  fetchWeather,
  clearWeather,
} from "../../app/features/weather/weatherSlice";
import styles from "./CitySearch.module.css";

const CitySearch = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.weather);

  const handleSearch = () => {
    const city = inputValue.trim();
    if (!city) return;
    dispatch(clearWeather());
    dispatch(setCity(city));
    dispatch(fetchWeather(city));
    // console.log(city);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={inputValue}
        placeholder="Enter city name"
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        Search
      </button>

      {status === "failed" && error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CitySearch;
