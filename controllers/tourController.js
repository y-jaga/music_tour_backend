const axios = require("axios");
const {
  validateConcertsQueryParams,
  validateMerchandiseStallsQueryParams,
  validateAfterPartiesQueryParams,
} = require("../validations/index");

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});

// Function to fetch concerts by artist and city
const getConcertsByArtistAndCity = async (req, res) => {
  const errors = validateConcertsQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { artist, city } = req.query;
    const response = await axiosInstance.get(
      `/concerts/search?artist=${artist}&city=${city}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

// Function to fetch MerchandiseStalls by stallName
const getMerchandiseStallsByStallName = async (req, res) => {
  const errors = validateMerchandiseStallsQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { stallName } = req.query;
    const response = await axiosInstance.get(
      `/merchandiseStalls/search?stallName=${stallName}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch MerchandiseStalls." });
  }
};

// Function to fetch AfterParties by city
const getAfterPartiesByCity = async (req, res) => {
  const errors = validateAfterPartiesQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { city } = req.query;
    const response = await axiosInstance.get(
      `/afterParties/search?city=${city}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch after parties by city" });
  }
};

// Function to fetch concerts
const getConcerts = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;

    const response = await axiosInstance.get(
      `/concerts?test_error=${test_error}&rate_limit=${rate_limit}`,
      {
        headers: {
          CLIENT_KEY: process.env.CLIENT_KEY,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

// Function to fetch merchandise stalls
const getMerchandiseStalls = async (req, res) => {
  const test_error = req.query.test_error;
  const rate_limit = req.query.rate_limit;

  try {
    const response = await axiosInstance.get(
      `/merchandiseStalls?test_error=${test_error}&rate_limit=${rate_limit}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }

    res.status(500).json({ error: "Failed to fetch merchandise." });
  }
};

// Function to fetch after-parties
const getAfterParties = async (req, res) => {
  const test_error = req.query.test_error;
  const rate_limit = req.query.rate_limit;

  try {
    const response = await axiosInstance.get(
      `/afterParties?test_error=${test_error}&rate_limit=${rate_limit}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }

    res.status(500).json({ error: "Failed to fetch parties." });
  }
};

module.exports = {
  getConcerts,
  getMerchandiseStalls,
  getAfterParties,
  getConcertsByArtistAndCity,
  getMerchandiseStallsByStallName,
  getAfterPartiesByCity,
};
