export const CELSIUS = "°C";
export const FAHRENHEIT = "°F";

export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function getDegreeUnit() {
  let degreeUnit = window.localStorage.getItem("degreeUnit");

  if (!degreeUnit) {
    degreeUnit = CELSIUS;
    window.localStorage.setItem("degreeUnit", CELSIUS);
  }

  return degreeUnit;
}

export function setDegreeUnit(degreeUnit) {
  window.localStorage.setItem("degreeUnit", degreeUnit);
}
