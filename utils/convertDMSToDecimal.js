function convertDMSToDecimal (string) {                 // Convert degrees, minutes, seconds coordinates to decimal coordinates.
  var portion = string.split(String.fromCharCode(176)); // Degree symbol.

  if (!portion[0] || !portion[1])
    return string;
  var degrees = Number(portion[0]);
  portion = portion[1].split('\'');

  if (!portion[0] || !portion[1])
    return string;
  var minutes = Number(portion[0]);
  portion = portion[1].split('\"');

  if (!portion[0] || !portion[1])
    return string;
  var seconds = Number(portion[0]);
  var direction  = portion[1].trim() === 'S' || portion[1].trim() === 'W' ? -1 : 1;

  return direction * (degrees + (minutes / 60) + (seconds / 3600));
}

module.exports = convertDMSToDecimal;