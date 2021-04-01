export const CELSIUS = "°C";
export const FAHRENHEIT = "°F";

export function toFahrenheit(celsius) {
  return Math.round(((celsius * 9) / 5 + 32) * 10) / 10;
}
