import React from "react";
import Select from "react-select";

const filterOptions = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highestLowercase", label: "Highest Lowercase Alphabet" },
];

const FilterDropdown = ({ handleFilterChange }) => {
  return (
    <div className="filter-dropdown">
      <label className="dropdown-label">Multi Filter</label>
      <Select
        isMulti
        options={filterOptions}
        onChange={handleFilterChange}
        placeholder="Select Filters"
        className="multi-select"
      />
    </div>
  );
};

export default FilterDropdown;
