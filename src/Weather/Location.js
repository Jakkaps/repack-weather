import React, { useEffect, useState } from "react";
import "./Location.css";
import Day from "./Day";
import { locationFromWoeid } from "../Shared/LocationData";
import { locationTypeIcon } from "../Shared/Icons";
import { CenteredSpinner } from "../Main/Main";

function Location({ woeid, locationType, degreeUnit }) {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    locationFromWoeid(woeid, degreeUnit).then((data) => {
      setTitle(data.title);
      setDays(data.days);
      setLoading(false);
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

  return !loading ? (
    <div className={"location-container"}>
      <div className={"location-title-container"}>
        {locationTypeIcon(locationType, 50)}
        <h1 className={"location-title"}>{title}</h1>
      </div>
      {dayDisplays}
    </div>
  ) : (
    <CenteredSpinner />
  );
}

export default Location;
