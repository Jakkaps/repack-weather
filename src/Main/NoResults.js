import React from "react";
import "./NoResults.css";

function NoResults({ query }) {
  return (
    <div className={"no-results-container"}>
      <h4 className={"no-match-label"}>
        No location matching '{query}' - did you spell it correctly?
      </h4>
    </div>
  );
}

export default NoResults;
