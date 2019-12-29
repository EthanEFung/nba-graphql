// utility function that finds the season year. If the month is january through
// april will default to the previous year. Otherwise defaults to the current year.

module.exports = function() {
  const today = new Date(Date.now());
  const month = today.getMonth();

  if (month < 4) return today.getYear() - 1;
  return today.getFullYear();
};
