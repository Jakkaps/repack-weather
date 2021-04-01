import React from "react";
import "./Day.css";
import WeatherIcon from "./WeatherIcon";
import { BiWind } from "react-icons/all";
import { FAHRENHEIT, toFahrenheit } from "../common/TemperatureUtil";
import { displayDate } from "../common/DateUtil";

function Day({ date, description, maxTemp, minTemp, wind, degreeUnit }) {
  if (degreeUnit === FAHRENHEIT) {
    maxTemp = toFahrenheit(maxTemp);
    minTemp = toFahrenheit(minTemp);
  }

  return (
    <div className={"day-container"}>
      <h5 className={"date-title"}>{displayDate(date)}</h5>
      <div className={"info-container"}>
        <WeatherIcon description={description} className={"weather-icon"} />
        <div>
          <h4 style={{ color: colorFromTemp(maxTemp) }}>{maxTemp + "° max"}</h4>
          <h4 style={{ color: colorFromTemp(minTemp) }}>{minTemp + "° min"}</h4>
        </div>
        <div className={"wind-container"}>
          <h4 className={"wind-text"}>{wind + " m/s"}</h4>
          <BiWind size={25} />
        </div>
      </div>
    </div>
  );
}

function colorFromTemp(temp) {
  return temp < 0 ? "blue" : "red";
}

export default Day;
