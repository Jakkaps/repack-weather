/**
 * Returns day of week of date with the next date as 'Tomorrow'
 * @param dateString - displayable date
 * @returns {string}
 */
export function displayDate(dateString) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));

  if (date.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  return date.toLocaleDateString("en-us", { weekday: "long" });
}
