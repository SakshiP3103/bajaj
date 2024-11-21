import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [filter, setFilter] = useState('numbers');
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      // Validate the JSON input
      const parsedData = JSON.parse(inputData); // Will throw error if invalid

      // Make sure the data is an array and contains 'data' key
      if (!Array.isArray(parsedData.data)) {
        setErrorMessage('Invalid data format. Expected an array.');
        return;
      }

      // Send POST request to the backend API
      const response = await axios.post('https://bajaj1-ruddy.vercel.app/bfhl', {
        data: parsedData.data,  // Corrected to use parsedData
        file_b64: ''  // Add the base64 file data if needed, else leave it empty
      });

      // Log the status and response in the console
      console.log("Response Status: ", response.status); // Logs the status code
      console.log("Response Data: ", response.data); // Logs the response data

      if (response.data.is_success) {
        setResponseData(response.data);
        setErrorMessage(''); // Clear any previous errors
      } else {
        setErrorMessage('Failed to process the request.');
      }
    } catch (error) {
      if (error.response) {
        console.log("API Error Response: ", error.response); // Logs the error response from the API
        setErrorMessage(`API Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log("Request Error: ", error.request); // Logs the error in the request
        setErrorMessage('No response from the server.');
      } else {
        console.log("General Error: ", error); // Logs any other errors
        setErrorMessage('Invalid JSON format or API Error.');
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="app-container">
      {/* API Input Box */}
      <div className="input-section">
        <label>Enter JSON</label>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="json-textarea"
          placeholder='{"data": ["A", "1", "z"]}'
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>

      {/* Multi Filter Dropdown */}
      <div className="filter-dropdown">
        <label className="dropdown-label">Multi Filter</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
        </select>
      </div>

      {/* Filtered Response */}
      <div className="response-section">
        <h3 className="response-title">Filtered Response</h3>
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          responseData && (
            <div className="response-data">
              {filter === 'numbers' && (
                <div>Numbers: {responseData.numbers.join(', ')}</div>
              )}
              {filter === 'alphabets' && (
                <div>Alphabets: {responseData.alphabets.join(', ')}</div>
              )}
              <div>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</div>
              <div>Is Prime Found: {responseData.is_prime_found ? 'Yes' : 'No'}</div>
              <div>File Valid: {responseData.file_valid ? 'Yes' : 'No'}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;
