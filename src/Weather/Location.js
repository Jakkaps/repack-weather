import React, { useEffect, useState } from "react";
import mockWeather from "../Data/location_mock.js";
import "./Location.css";
import Day from "./Day";
import { BiWorld, FaCity, FaFlag, RiGovernmentFill } from "react-icons/all";
import locationFromWoid from "../Data/Location";

function Location({ woid, locationType }) {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    locationFromWoid(woid, true).then((data) => {
      setTitle(data.title);
      setDays(data.days);
    });
  }, [woid]);

  const dayDisplays = days.map((day) => {
    return (
      <Day
        date={day.date}
        description={day.state}
        maxTemp={day.maxTemp}
        minTemp={day.minTemp}
        wind={day.wind}
        tempUnit={"C°"}
      />
    );
  });

  return (
    <div className={"location-container"}>
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
