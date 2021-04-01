import { CELSIUS } from "../common/TemperatureUtil";

const storage = window.localStorage;

export function getDegreeUnit() {
  let degreeUnit = storage.getItem("degreeUnit");

  if (!degreeUnit) {
    degreeUnit = CELSIUS;
    storage.setItem("degreeUnit", CELSIUS);
  }

  return degreeUnit;
}

export function setDegreeUnit(degreeUnit) {
  storage.setItem("degreeUnit", degreeUnit);
}

export function setSavedLocation(location) {
  storage.setItem("woeid", location.woeid);
  storage.setItem("title", location.title);
}

/**
 * Returns the saved location. If no location is saved, try to use the one that is closest.
 * @returns {Promise<unknown>}
 */
export function getSavedLocation() {
  return new Promise((resolve, reject) => {
    let woeid = storage.getItem("woeid");
    let title = storage.getItem("title");

    if ((!woeid || !title) && navigator.geolocation) {
      console.log("trying to get location");
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
        },
        () => {
          reject(
            "Could not load. Probably because the user did not allow you to use location."
          );
        }
      );
    } else if (woeid) {
      resolve({
        woeid: parseInt(woeid),
        title: title,
      });
    }
  });
}
