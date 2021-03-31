const storage = window.localStorage;

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
      let days = data.consolidated_weather.slice(
        todayIndex + 2,
        todayIndex + 5
      );
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

export function setSavedLocation(location) {
  storage.setItem("woeid", location.woeid);
  storage.setItem("title", location.title);
}

export function getSavedLocation() {
  return new Promise((resolve) => {
    let woeid = storage.getItem("woeid");
    let title = storage.getItem("title");

    if ((!woeid || !title) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          "http://localhost:5050/coords/?lattlong=" +
            position.coords.latitude +
            "," +
            position.coords.longitude
        )
          .then((response) => response.json())
          .then((data) => {
            woeid = data[0].woeid;
            title = data[0].title;
            storage.setItem("woeid", woeid.toString());
            storage.setItem("title", title);
            resolve({
              woeid,
              title,
            });
          });
      });
    } else if (woeid) {
      resolve({
        woeid: parseInt(woeid),
        title: title,
      });
    }
  });
}
