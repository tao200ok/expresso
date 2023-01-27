// HELPER FUNCTIONS

function validate(data, required) {
  // Check that request data object is supplied and has at least one field
  if (typeof data === "undefined" || Object.keys(data).length < 1) {
    return false;
  }

  // To check if a field is missing
  function isMissing(field) {
    return !data[field];
  }

  // Check that none of the required fields are missing
  if (required.some(isMissing)) {
    return false;
  }

  return data;
}

module.exports = { validate };
