/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import SearchBar from "../navbar/SearchBar";
import Location from "../location/Location";
import searchLocation from "./SearchAPI";
import SearchResults from "./SearchResults";
import DefaultError from "../errors/DefaultError";
import CantLoadWeather from "../errors/CantLoadWeather";
import CenteredSpinner from "../common/CenteredSpinner";

import { CELSIUS, FAHRENHEIT } from "../common/TemperatureUtil";
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

  const selectLocation = (location) => {
    // Only set if it var previously cleared (cleared in search).
    if (!selectedLocation) {
      setError(false);
      setSavedLocation(location);
      setSelectedLocation(location);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedLocation()
      .then((location) => {
        selectLocation(location);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

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

  const toggleDegreeUnit = () => {
    const newUnit = degreeUnit === CELSIUS ? FAHRENHEIT : CELSIUS;
    setLocalDegreeUnit(newUnit);
    setDegreeUnit(newUnit);
  };

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
    content = (
      <DefaultError
        text={`No location matching '${searchText}' - did you spell it correctly?`}
      />
    );
  } else {
    content = <DefaultError text={"No location selected"} />;
  }

  return (
    <div>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(e) => {
          const newText = e.target.value;
          if (newText.length > searchText.length) {
            setSelectedLocation(null);
          }
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
