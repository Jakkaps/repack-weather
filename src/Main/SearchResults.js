import React from "react";
import { locationTypeIcon } from "../Shared/Icons";
import "./SearchResults.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function SearchResults({ results, onResultClicked }) {
  const resultViews = results.map((location) => (
    <Result
      key={location.title}
      type={location.type}
      title={location.title}
      onClick={() => {
        onResultClicked(location.woeid);
      }}
    />
  ));

  return <ListGroup className={"results-container"}>{resultViews}</ListGroup>;
}

function Result({ type, title, onClick }) {
  return (
    <ListGroupItem className={"result-container"} onClick={onClick}>
      {locationTypeIcon(type, 30)}
      <h4 className={"location-title"}>{title}</h4>
    </ListGroupItem>
  );
}

export default SearchResults;
