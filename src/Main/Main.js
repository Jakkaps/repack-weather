import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Location from "../Weather/Location";

function Main() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(true);

  let content;
  useEffect(() => {
    if (searchText !== "") {
      // getSearchResults(searchText)
      //   .then((data) => {
      //     if (Array.isArray(data) && data.length !== 0) {
      //       setSearchResults(data);
      //     }
      //   })
      //   .catch((error) => {
      //     return error;
      //   });
    }
  }, [searchText]);

  if (isSearching && searchResults.length === 1) {
    content = <Location title={searchResults[0].title} />;
    setIsSearching(false);
  } else if (isSearching && searchResults.length > 1) {
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
      <Location />
    </div>
  );
}

/**
 * Get locations from the MetaWeather API with the given query. Cancels if its called again within 2 seconds.
 * @param query the query to search for
 * @returns {Promise<unknown>} the results
 */
let globalNonce;
const getSearchResults = async (query) => {
  const localNonce = {};
  globalNonce = localNonce;
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (localNonce !== globalNonce) {
    return new Promise((resolve) => resolve([]));
  }

  console.log("Search went through!");

  return fetch(
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=" +
      query
  ).then((response) => response.json());
};

export default Main;
