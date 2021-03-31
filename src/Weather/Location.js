import React, { useEffect, useState } from "react";
import "./Location.css";
import Day from "./Day";
import weatherFromWoeid from "../Shared/LocationData";
import { locationTypeIcon } from "../Shared/Icons";

function Location({ woeid, locationType, degreeUnit }) {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    weatherFromWoeid(woeid, true, degreeUnit).then((data) => {
      setTitle(data.title);
      setDays(data.days);
    });
  }, [woeid, degreeUnit]);

  const dayDisplays = days.map((day) => {
    return (
      <Day
        key={day.date}
        date={day.date}
        description={day.state}
        maxTemp={day.maxTemp}
        minTemp={day.minTemp}
        wind={day.wind}
      />
    );
  });

  return (
    <div className={"location-container"}>
      <div className={"location-title-container"}>
        {locationTypeIcon(locationType, 50)}
        <h1 className={"location-title"}>{title}</h1>
      </div>
      {dayDisplays}
    </div>
  );
}

export default Location;
