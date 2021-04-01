import React, { useState, useEffect } from "react";
import "./Main.css";

import SearchBar from "../navbar/SearchBar";
import Location from "../location/Location";
import searchLocation from "./SearchAPI";
import SearchResults from "./SearchResults";
import NoResults from "../errors/NoResults";
import CantLoadWeather from "../errors/CantLoadWeather";
import CenteredSpinner from "../common/CenteredSpinner";

import { CELSIUS, FAHRENHEIT } from "../common/Temperature";
import {
  getSavedLocation,
  setSavedLocation,
  getDegreeUnit,
  setDegreeUnit,
} from "./LocalStorage";

function Main() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [degreeUnit, setLocalDegreeUnit] = useState(getDegreeUnit());
  const [selectedLocation, setSelectedLocation] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSavedLocation()
      .then((location) => {
        if (!selectedLocation) {
          selectLocation(location);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const toggleDegreeUnit = () => {
    const newUnit = degreeUnit === CELSIUS ? FAHRENHEIT : CELSIUS;
    setLocalDegreeUnit(newUnit);
    setDegreeUnit(newUnit);
  };

  const selectLocation = (location) => {
    setError(false);
    setSavedLocation(location);
    setSelectedLocation(location);
    setLoading(false);
  };

  useEffect(() => {
    if (searchText !== "") {
      setLoading(true);
      setError(false);
      searchLocation(searchText)
        .then((data) => {
          setLoading(false);
          setSearchResults(data);
          if (data.length === 1) {
            selectLocation(data[0]);
          }
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [searchText]);

  let content;
  if (error) {
    content = <CantLoadWeather />;
  } else if (loading) {
    content = <CenteredSpinner />;
  } else if (selectedLocation) {
    content = (
      <Location
        woeid={selectedLocation.woeid}
        title={selectedLocation.title}
        degreeUnit={degreeUnit}
      />
    );
  } else if (searchResults.length > 1) {
    console.log(searchResults);
    content = (
      <SearchResults
        results={searchResults}
        onResultClicked={(woeid) => {
          const result = searchResults.find((result) => result.woeid === woeid);
          selectLocation(result);
        }}
      />
    );
  } else if (searchResults.length === 0) {
    content = <NoResults query={searchText} />;
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

export default Main;
