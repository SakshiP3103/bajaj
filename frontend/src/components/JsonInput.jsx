import React from "react";

const JsonInput = ({ jsonInput, setJsonInput, handleSubmit, error }) => {
  return (
    <div className="input-section">
      <textarea
        placeholder='Enter JSON (e.g., {"data": ["A", "1", "z"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="json-textarea"
      ></textarea>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default JsonInput;
