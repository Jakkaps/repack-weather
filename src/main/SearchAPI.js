/**
 * Get locations from the MetaWeather API with the given query. Cancels if its called again within half a second to reduce API-calls.
 * @param query the query to search for
 * @returns {Promise<unknown>} the results
 */
let globalNonce;
async function searchLocation(query) {
  const localNonce = {};
  globalNonce = localNonce;
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (localNonce !== globalNonce) {
    return new Promise((resolve) => resolve([]));
  }

  return fetch("http://localhost:5050/search/?query=" + query)
    .then((response) => response.json())
    .then((data) => {
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
