import React from "react";
import { Form, FormControl, Navbar } from "react-bootstrap";
import DegreeUnitSelector from "./DegreeUnitSelector";

function SearchBar({
  onSearchTextChange,
  searchText,
  onDegreeUnitChange,
  degreeUnit,
}) {
  return (
    <Navbar className={"justify-content-between"}>
      <Navbar.Brand>RePack Weather</Navbar.Brand>
      <Form inline>
        <FormControl
          placeholder={"Search for location..."}
          value={searchText}
          onChange={onSearchTextChange}
        />
        <DegreeUnitSelector
          degreeUnit={degreeUnit}
          onChange={onDegreeUnitChange}
        />
      </Form>
    </Navbar>
  );
}

export default SearchBar;
