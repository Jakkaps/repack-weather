export function locationFromWoeid(woeid) {
  return fetch("http://localhost:5050/location/?woeid=" + woeid)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      const todayIndex = data.consolidated_weather.findIndex(
        (day) =>
          new Date(day.applicable_date).getTime() === new Date().getTime()
      );
      let days;
      if (data.consolidated_weather.length > todayIndex + 5) {
        days = data.consolidated_weather.slice(todayIndex + 2, todayIndex + 5);
      } else {
        days = data.consolidated_weather.slice(todayIndex + 2);
      }
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
