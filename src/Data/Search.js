import searchMock from "./search_mock";

/**
 * Get locations from the MetaWeather API with the given query. Cancels if its called again within 2 seconds.
 * @param query the query to search for
 * @returns {Promise<unknown>} the results
 */
let globalNonce;
async function searchLocation(query, testing = false, oneResult = false) {
  const localNonce = {};
  globalNonce = localNonce;
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (localNonce !== globalNonce) {
    return new Promise((resolve) => resolve([]));
  }

  console.log("Search went through!");
  let promise;
  if (!testing) {
    promise = fetch(
      "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=" +
        query
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

  return promise;
}
export default searchLocation;
