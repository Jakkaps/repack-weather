import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function Main() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    if (searchText !== "") {
      getSearchResults(searchText)
        .then((data) => {
          if (Array.isArray(data) && data.length !== 0) {
            setSearchResults(data);
          }
        })
        .catch((error) => {
          return error;
        });
    }
  }, [searchText]);

  let content;
  if (isSearching && searchResults.length !== 0) {
    content = searchResults.map((location) => (
      <div id={location.title}>{location.title}</div>
    ));
  }

  return (
    <div>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(e) => setSearchText(e.target.value)}
      />
      {content}
    </div>
  );
}

let globalNonce;
/**
 * Get locations from the MetaWeather api with the given query. Cancels if its called again within 2 seconds.
 * @param query the query to search for
 * @returns {Promise<unknown>} the results
 */
const getSearchResults = async (query) => {
  const localNonce = {};
  globalNonce = localNonce;
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(localNonce === globalNonce);
  if (localNonce !== globalNonce) {
    return new Promise((resolve) => resolve([]));
  }

  return fetch(
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=" +
      query
  ).then((response) => response.json());
};

export default Main;
