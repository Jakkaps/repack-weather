import React from "react";

function WeatherIcon({ description, className }) {
  let content;
  try {
    content = (
      <img
        src={emojiSource(description)}
        className={className}
        alt={description}
      />
    );
  } catch (e) {
    content = <p>No icon found</p>;
  }
  return content;
}

const emojiSource = (description) => {
  let src = "https://www.metaweather.com/static/img/weather/";
  switch (description) {
    case "Snow":
      src += "sn";
      break;
    case "Sleet":
      src += "sl";
      break;
    case "Hail":
      src += "h";
      break;
    case "Thunderstorm":
      src += "t";
      break;
    case "Heavy Rain":
      src += "hr";
      break;
    case "Light Rain":
      src += "lr";
      break;
    case "Showers":
      src += "s";
      break;
    case "Heavy Cloud":
      src += "hc";
      break;
    case "Light Cloud":
      src += "lc";
      break;
    case "Clear":
      src += "c";
      break;
    default:
      throw TypeError("No icon matching that description");
  }
  src += ".svg";
  return src;
};

export default WeatherIcon;
