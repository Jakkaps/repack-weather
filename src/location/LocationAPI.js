/**
 * Returns the location with the given woeid from MetaWeather
 * @param woeid
 * @returns {Promise<{days: *, title: *}>}
 */
import { tempRound } from "../common/TemperatureUtil";

export function locationFromWoeid(woeid) {
  return fetch("http://localhost:5050/location/?woeid=" + woeid)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (
        !(
          data.hasOwnProperty("consolidated_weather") &&
          data.hasOwnProperty("title")
        )
      ) {
        return Promise.reject("Invalid data received");
      }
      // Get the index of the day matching today. Assumes this value is always present.
      const todayIndex = data.consolidated_weather.findIndex(
        (day) =>
          new Date(day.applicable_date).getTime() === new Date().getTime()
      );

      // Take the days following today, limited to three
      let days = data.consolidated_weather.slice(todayIndex + 2);
      if (days.length > 3) {
        days = days.slice(0, 3);
      }

      days = days.map((day) => {
        return {
          state: day.weather_state_name,
          date: day.applicable_date,
          maxTemp: tempRound(day.max_temp),
          minTemp: tempRound(day.min_temp),
          wind: Math.round(day.wind_speed * 10) / 10,
        };
      });

      return { title: data.title, days };
    });
}
