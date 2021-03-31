import { BiWorld, FaCity, FaFlag, RiGovernmentFill } from "react-icons/all";
import React from "react";

export function locationTypeIcon(locationType, size) {
  switch (locationType) {
    case "City":
      return <FaCity size={size} />;
    case "Region":
    case "State":
    case "Province":
      return <RiGovernmentFill />;
    case "Country":
      return <FaFlag />;
    case "Continent":
      return <BiWorld />;
    default:
      return null;
  }
}
