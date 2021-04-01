import React from "react";
import LocationTypeIcon from "../common/LocationTypeIcon";
import "./SearchResults.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function SearchResults({ results, onResultClicked }) {
  const resultViews = results.map((location) => (
    <Result
      key={location.title}
      locationType={location.locationType}
      title={location.title}
      onClick={() => {
        onResultClicked(location.woeid);
      }}
    />
  ));

  return <ListGroup className={"results-container"}>{resultViews}</ListGroup>;
}

function Result({ locationType, title, onClick }) {
  return (
    <ListGroupItem className={"result-container"} onClick={onClick}>
      <LocationTypeIcon locationType={locationType} size={30} />
      <h4 className={"location-title"}>{title}</h4>
    </ListGroupItem>
  );
}

export default SearchResults;
