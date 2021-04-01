import React from "react";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/all";
import "./DegreeUnitSelector.css";
import { CELSIUS } from "../common/Temperature";

function DegreeUnitSelector({ degreeUnit, onChange }) {
  const isCelsius = degreeUnit === CELSIUS;
  return (
    <div onClick={onChange} className={"degree-selector-container"}>
      <RiCelsiusFill opacity={isCelsius ? 1 : 0.4} size={25} />
      <div className={"divider"} />
      <RiFahrenheitFill opacity={!isCelsius ? 1 : 0.4} size={25} />
    </div>
  );
}

export default DegreeUnitSelector;
