import React, { useEffect, useState } from "react";
import mockWeather from "./location_mock.js";
import Day from "./Day";

function Location({ woid }) {
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
      <h1>{title}</h1>
      {dayDisplays}
    </div>
  );
}

export default Location;
