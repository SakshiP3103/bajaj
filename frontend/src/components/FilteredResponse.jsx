import React from "react";

const FilteredResponse = ({ filteredData }) => {
  return (
    <div className="response-section">
      <h3 className="response-title">Filtered Response:</h3>
      {filteredData.length > 0 ? (
        <p className="response-data">{filteredData.join(", ")}</p>
      ) : (
        <p className="response-data">No data matches the selected filters.</p>
      )}
    </div>
  );
};

export default FilteredResponse;
