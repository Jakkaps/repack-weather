import mockWeather from "./location_mock";

function locationFromWoeid(woeid, testing = false) {
  let promise;
  if (!testing) {
    promise = fetch(
      "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" +
        woeid
    ).then((result) => result.json());
  } else {
    promise = new Promise((resolve) => resolve(mockWeather));
  }

  return promise.then((data) => {
    let days = data.consolidated_weather.slice(0, -3);
    days = days.map((day) => {
      return {
        state: day.weather_state_name,
        date: day.applicable_date,
        maxTemp: Math.round(day.max_temp * 10) / 10,
        minTemp: Math.round(day.min_temp * 10) / 10,
        wind: Math.round(day.wind_speed * 10) / 10,
      };
    });
    return { title: data.title, days };
  });
}

export default locationFromWoeid;
