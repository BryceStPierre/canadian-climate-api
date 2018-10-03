function trimElevationString (string) {
  return Number(string.split(" ")[0]);
}

module.exports = trimElevationString;