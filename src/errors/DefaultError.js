import React from "react";
import "./NoResults.css";

function DefaultError({ text }) {
  return (
    <div className={"default-error-container"}>
      <h4 className={"default-error-label"}>{text}</h4>
    </div>
  );
}

export default DefaultError;
