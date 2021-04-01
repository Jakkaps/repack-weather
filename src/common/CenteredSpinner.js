import React from "react";
import { Spinner } from "react-bootstrap";
import "./CenteredSpinner.css";

function CenteredSpinner() {
  return (
    <div className={"spinner-container"}>
      <Spinner animation={"border"} variant={"primary"} />
    </div>
  );
}

export default CenteredSpinner;
