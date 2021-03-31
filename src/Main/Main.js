import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Location from "../Weather/Location";
import searchLocation from "../Data/Search";

function Main() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchText !== "") {
      let oneResult = true;
      if (searchText.length === 1) {
        oneResult = false;
      }
      searchLocation(searchText, true, oneResult).then((data) => {
        setSearchResults(data);
      });
    }
  }, [searchText]);

  let content;
  if (searchResults.length === 1) {
    content = <Location title={searchResults[0].title} />;
  } else if (searchResults.length > 1) {
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
      {/*<Location title={"London"} locationType={"City"} />*/}
      {content}
    </div>
  );
}

export default Main;
