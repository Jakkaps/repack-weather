import React from "react";
import { Form, FormControl, Navbar, InputGroup } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
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
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <AiOutlineSearch size={20} opacity={0.6} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder={"Search for location..."}
            value={searchText}
            onChange={onSearchTextChange}
          />
        </InputGroup>
        <DegreeUnitSelector
          degreeUnit={degreeUnit}
          onChange={onDegreeUnitChange}
        />
      </Form>
    </Navbar>
  );
}

export default SearchBar;
