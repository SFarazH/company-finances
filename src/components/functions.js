function formatDate(isoString) {
  const date = new Date(isoString);

  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

module.exports = { formatDate };
