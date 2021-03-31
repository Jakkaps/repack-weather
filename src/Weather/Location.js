import React, { useEffect, useState } from "react";
import mockWeather from "./location_mock.js";
import "./Location.css";
import Day from "./Day";
import { BiWorld, FaCity, FaFlag, RiGovernmentFill } from "react-icons/all";

function Location({ woid, locationType }) {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" +
    //     woid
    // )
    //   .then(result => result.json()).then(data => {
    // });
    new Promise((resolve) => resolve(mockWeather)).then((data) => {
      setTitle(data.title);
      setDays(data.consolidated_weather.slice(0, -3));
    });
  }, [woid]);

  const dayDisplays = days.map((day) => {
    return (
      <Day
        date={day.applicable_date}
        description={day.weather_state_name}
        maxTemp={15}
        minTemp={7}
        wind={4}
        tempUnit={"C°"}
      />
    );
  });

  return (
    <div>
      <div className={"location-title-container"}>
        {locationTypeIcon(locationType)}
        <h1 className={"location-title"}>{title}</h1>
      </div>
      {dayDisplays}
    </div>
  );
}

const locationTypeIcon = (locationType) => {
  const size = 50;
  switch (locationType) {
    case "City":
      return <FaCity size={size} />;
    case "Region":
    case "State":
    case "Province":
      return <RiGovernmentFill />;
    case "Country":
      return <FaFlag />;
    case "Continent":
      return <BiWorld />;
    default:
      return null;
  }
};

export default Location;
