import React from "react";
import "./Day.css";
import WeatherIcon from "./WeatherIcon";
import { BiWind } from "react-icons/all";
import { FAHRENHEIT, toFahrenheit } from "../Shared/Temperature";

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

const displayDate = (dateString) => {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));

  if (date.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  return date.toLocaleDateString("en-us", { weekday: "long" });
};

const colorFromTemp = (temp) => {
  if (temp < 0) {
    return "blue";
  }

  return "red";
};

export default Day;
