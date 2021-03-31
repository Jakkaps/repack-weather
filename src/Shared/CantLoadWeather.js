import React from "react";
import "./CantLoadWeather.css";

function CantLoadWeather() {
  return (
    <div className={"cant-load-weather-container"}>
      <h3 className={"error-message"}>
        For some reason our server couldn't load the weather so we've handed
        over the job to the local genie.
      </h3>
      <img
        src={
          "https://cdn.pixabay.com/photo/2017/08/06/07/55/genie-2590056_960_720.jpg"
        }
        className={"genie-image"}
        alt={"genie"}
      />
      <h4 className={"genie-quote"}>
        I don't know what you're looking for, but I'm feeling quite certain it's{" "}
        {randomWeather()}.
      </h4>
    </div>
  );
}

const randomWeather = () => {
  return ["sunny", "cloudy", "rainy"][Math.floor(Math.random() * 3)];
};

export default CantLoadWeather;
