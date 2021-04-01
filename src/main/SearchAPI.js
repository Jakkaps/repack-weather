/**
 * Get locations from the MetaWeather API with the given query. Cancels if its called again within half a second to reduce API-calls.
 * @param query the query to search for
 * @returns {Promise<unknown>} the results
 */
let globalNonce;
async function searchLocation(query) {
  // Empty or only spaces, return empty array
  if (!query.replace(/\s/g, "").length) {
    console.log("Only spaces");
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  const localNonce = {};
  globalNonce = localNonce;
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (localNonce !== globalNonce) {
    return new Promise((resolve) => resolve([]));
  }

  return fetch("http://localhost:5050/search/?query=" + query)
    .then((response) => response.json())
    .then((data) => {
      if (
        !Array.isArray(data) ||
        (data.length !== 0 &&
          !(
            data[0].hasOwnProperty("title") &&
            data[0].hasOwnProperty("woeid") &&
            data[0].hasOwnProperty("location_type")
          ))
      ) {
        return Promise.reject("Invalid data received");
      }

      return data.map((location) => {
        return {
          title: location.title,
          locationType: location.location_type,
          woeid: location.woeid,
        };
      });
    });
}
export default searchLocation;
