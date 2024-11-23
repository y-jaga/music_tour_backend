function validateConcertsQueryParams(query) {
  const errors = [];

  if (!query.artist) {
    errors.push("Artist is required.");
  }

  if (!query.city) {
    errors.push("City is requiured.");
  }

  return errors;
}

function validateMerchandiseStallsQueryParams(query) {
  const errors = [];

  if (!query.stallName) {
    errors.push("Stall name is required.");
  }

  return errors;
}

function validateAfterPartiesQueryParams(query) {
  const errors = [];

  if (!query.city) {
    errors.push("City is required.");
  }

  return errors;
}

module.exports = {
  validateConcertsQueryParams,
  validateMerchandiseStallsQueryParams,
  validateAfterPartiesQueryParams,
};
