import React, { useEffect, useState } from "react";
import "./Location.css";
import Day from "./Day";
import { locationFromWoeid } from "./LocationAPI";
import CenteredSpinner from "../common/CenteredSpinner";
import CantLoadWeather from "../errors/CantLoadWeather";

function Location({ woeid, degreeUnit }) {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    locationFromWoeid(woeid, degreeUnit)
      .then((data) => {
        setTitle(data.title);
        setDays(data.days);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [woeid, degreeUnit]);

  if (error) {
    return <CantLoadWeather title={title} />;
  }

  const dayDisplays = days.map((day) => {
    return (
      <Day
        key={day.date}
        date={day.date}
        description={day.state}
        maxTemp={day.maxTemp}
        minTemp={day.minTemp}
        wind={day.wind}
        degreeUnit={degreeUnit}
      />
    );
  });

  return !loading ? (
    <div className={"location-container"}>
      <div className={"location-title-container"}>
        <h1 className={"location-title"}>{title}</h1>
      </div>
      {dayDisplays}
    </div>
  ) : (
    <CenteredSpinner />
  );
}

export default Location;
