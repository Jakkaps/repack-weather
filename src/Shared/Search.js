import searchMock from "./search_mock";

/**
 * Get locations from the MetaWeather API with the given query. Cancels if its called again within half a second to reduce API-calls.
 * @param query the query to search for
 * @returns {Promise<unknown>} the results
 */
let globalNonce;
async function searchLocation(query, testing = false, oneResult = false) {
  const localNonce = {};
  globalNonce = localNonce;
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (localNonce !== globalNonce) {
    return new Promise((resolve) => resolve([]));
  }

  let promise;
  if (!testing) {
    promise = fetch(
      "http://localhost:5050/search/?query=" + query
    ).then((response) => response.json());
  } else if (oneResult) {
    promise = new Promise((resolve) => {
      resolve([searchMock[0]]);
    });
  } else {
    promise = new Promise((resolve) => {
      resolve(searchMock);
    });
  }

  return promise.then((data) => {
    return data.map((location) => {
      return {
        title: location.title,
        type: location.location_type,
        woeid: location.woeid,
      };
    });
  });
}
export default searchLocation;
