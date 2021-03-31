import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Location from "../Weather/Location";
import searchLocation from "../Shared/Search";
import SearchResults from "./SearchResults";
import "./Main.css";
import {
  CELSIUS,
  FAHRENHEIT,
  getDegreeUnit,
  setDegreeUnit,
} from "../Shared/Temperature";
import { Spinner } from "react-bootstrap";
import { getSavedLocation } from "../Shared/LocationData";

function Main() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [degreeUnit, setLocalDegreeUnit] = useState(getDegreeUnit());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedLocation(degreeUnit).then((location) => {
      setSearchResults([location]);
      setLoading(false);
    });
  }, [degreeUnit]);

  const toggleDegreeUnit = () => {
    const newUnit = degreeUnit === CELSIUS ? FAHRENHEIT : CELSIUS;
    setLocalDegreeUnit(newUnit);
    setDegreeUnit(newUnit);
  };

  useEffect(() => {
    if (searchText !== "") {
      setLoading(true);
      searchLocation(searchText, true, oneResult).then((data) => {
        setLoading(false);
        setSearchResults(data);
      });
    }
  }, [searchText]);

  let content;
  if (loading) {
    content = (
      <div className={"spinner-container"}>
        <Spinner animation={"border"} variant={"primary"} />;
      </div>
    );
  } else if (searchResults.length === 1) {
    content = (
      <Location
        woeid={searchResults[0].woeid}
        title={searchResults[0].title}
        degreeUnit={degreeUnit}
      />
    );
  } else if (searchResults.length > 1) {
    content = (
      <SearchResults
        results={searchResults}
        onResultClicked={(woeid) => {
          const result = searchResults.find((result) => result.woeid === woeid);
          setSearchResults([result]);
        }}
      />
    );
  }

  return (
    <div>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(e) => setSearchText(e.target.value)}
        degreeUnit={degreeUnit}
        onDegreeUnitChange={toggleDegreeUnit}
      />
      {content}
    </div>
  );
}

export default Main;
