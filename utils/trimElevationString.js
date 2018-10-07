function trimElevationString (string) {
  return Number(string.split(" ")[0]); // Trim string to remove unit of measurement.
}

module.exports = trimElevationString;