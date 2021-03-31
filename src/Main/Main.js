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
import NoResults from "./NoResults";
import CantLoadWeather from "../Shared/CantLoadWeather";

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

export function CenteredSpinner() {
  return (
    <div className={"spinner-container"}>
      <Spinner animation={"border"} variant={"primary"} />
    </div>
  );
}

export default Main;
