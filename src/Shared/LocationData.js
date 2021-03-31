import mockWeather from "./location_mock";
import { CELSIUS, toFahrenheit } from "./Temperature";

export function locationFromWoeid(woeid, degreeUnit, testing = false) {
  let promise;
  if (!testing) {
    promise = fetch("http://localhost:5050/location/?woeid=" + woeid).then(
      (result) => {
        return result.json();
      }
    );
  } else {
    promise = new Promise((resolve) => resolve(mockWeather));
  }

  return promise.then((data) => {
    const todayIndex = data.consolidated_weather.findIndex(
      (day) => new Date(day.applicable_date).getTime() === new Date().getTime()
    );
    let days = data.consolidated_weather.slice(todayIndex + 2, todayIndex + 5);
    days = days.map((day) => {
      const minTemp =
        degreeUnit === CELSIUS ? day.min_temp : toFahrenheit(day.min_temp);
      const maxTemp =
        degreeUnit === CELSIUS ? day.max_temp : toFahrenheit(day.max_temp);

      return {
        state: day.weather_state_name,
        date: day.applicable_date,
        maxTemp: Math.round(maxTemp * 10) / 10,
        minTemp: Math.round(minTemp * 10) / 10,
        wind: Math.round(day.wind_speed * 10) / 10,
      };
    });
    return { title: data.title, days };
  });
}

export async function getSavedLocation(degreeUnit, testing = false) {
  return new Promise((resolve) => {
    let woeid = window.localStorage.getItem("savedLocation");

    if (!woeid && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (testing) {
          woeid = 44418;
        }

        fetch(
          "http://localhost:5050/location/search/?lattlong=" +
            position.coords.latitude +
            "," +
            position.coords.longitude
        );

        window.localStorage.setItem("savedLocation", woeid.toString());
        resolve(locationFromWoeid(woeid, degreeUnit, testing));
      });
    } else if (woeid) {
      woeid = parseInt(woeid);
      resolve(locationFromWoeid(woeid, degreeUnit, testing));
    }
  });
}
