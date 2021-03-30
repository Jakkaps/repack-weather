import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function Main() {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText !== "") {
      fetch(
        "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=" +
          searchText
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          return error;
        });
    }
  }, [searchText]);

  return (
    <div>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default Main;
