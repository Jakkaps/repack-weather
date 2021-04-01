import { BiWorld, FaCity, FaFlag, RiGovernmentFill } from "react-icons/all";
import React from "react";

function LocationTypeIcon({ locationType, size }) {
  switch (locationType) {
    case "City":
      return <FaCity size={size} />;
    case "Region":
    case "State":
    case "Province":
      return <RiGovernmentFill size={size} />;
    case "Country":
      return <FaFlag size={size} />;
    case "Continent":
      return <BiWorld size={size} />;
    default:
      return null;
  }
}

export default LocationTypeIcon;
