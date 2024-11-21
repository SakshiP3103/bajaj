const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simple GET route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Simple POST route
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  // Helper functions
  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const processData = (data) => {
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));
    const lowercase = alphabets.filter((char) => char === char.toLowerCase());
    const highestLowercase = lowercase.sort().pop();
    const isPrimeFound = numbers.some((num) => isPrime(Number(num)));
    return { numbers, alphabets, highestLowercase, isPrimeFound };
  };

  const processFile = (fileB64) => {
    if (!fileB64) return { isValid: false, mimeType: null, fileSize: null };

    try {
      const buffer = Buffer.from(fileB64, "base64");
      const fileSize = (buffer.length / 1024).toFixed(2);
      const mimeType = "application/octet-stream"; // Adjust based on requirements
      return { isValid: true, mimeType, fileSize };
    } catch (err) {
      return { isValid: false, mimeType: null, fileSize: null };
    }
  };

  try {
    const { numbers, alphabets, highestLowercase, isPrimeFound } = processData(data);
    const { isValid, mimeType, fileSize } = processFile(file_b64);

    res.status(200).json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
      is_prime_found: isPrimeFound,
      file_valid: isValid,
      file_mime_type: mimeType,
      file_size_kb: fileSize,
    });
  } catch (error) {
    res.status(400).json({ is_success: false, error: "Invalid input" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
