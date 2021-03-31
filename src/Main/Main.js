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
import { getSavedLocation, setSavedLocation } from "../Shared/LocationData";

function Main() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [degreeUnit, setLocalDegreeUnit] = useState(getDegreeUnit());
  const [selectedLocation, setSelectedLocation] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedLocation().then((location) => {
      if (!selectedLocation) {
        selectLocation(location);
      }
    });
  }, [degreeUnit]);

  const toggleDegreeUnit = () => {
    const newUnit = degreeUnit === CELSIUS ? FAHRENHEIT : CELSIUS;
    setLocalDegreeUnit(newUnit);
    setDegreeUnit(newUnit);
  };

  const selectLocation = (location) => {
    setSavedLocation(location);
    setSelectedLocation(location);
    setLoading(false);
  };

  useEffect(() => {
    if (searchText !== "") {
      setLoading(true);
      searchLocation(searchText).then((data) => {
        setLoading(false);
        setSearchResults(data);
        if (data.length === 1) {
          selectLocation(data[0]);
        }
      });
    }
  }, [searchText]);

  let content;
  if (loading) {
    content = <CenteredSpinner />;
  } else if (selectedLocation) {
    content = (
      <Location
        woeid={selectedLocation.woeid}
        title={selectedLocation.title}
        degreeUnit={degreeUnit}
      />
    );
  } else {
    content = (
      <SearchResults
        results={searchResults}
        onResultClicked={(woeid) => {
          const result = searchResults.find((result) => result.woeid === woeid);
          selectLocation(result);
        }}
      />
    );
  }

  return (
    <div>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(e) => {
          setSelectedLocation(null);
          setSearchText(e.target.value);
        }}
        degreeUnit={degreeUnit}
        onDegreeUnitChange={toggleDegreeUnit}
      />
      {content}
    </div>
  );
}

export function CenteredSpinner() {
  return (
    <div className={"spinner-container"}>
      <Spinner animation={"border"} variant={"primary"} />
    </div>
  );
}

export default Main;
