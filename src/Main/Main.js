import React, { useState } from "react";
import SearchBar from "./SearchBar";

function Main() {
  const [searchText, setSearchText] = useState("");
  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
      />
    </div>
  );
}

export default Main;
