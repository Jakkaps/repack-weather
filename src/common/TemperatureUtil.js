export const CELSIUS = "°C";
export const FAHRENHEIT = "°F";

export function toFahrenheit(celsius) {
  return tempRound((celsius * 9) / 5 + 32);
}

export function tempRound(temperature) {
  return Math.round(temperature * 10) / 10;
}
