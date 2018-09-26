function convertToDecimalDegrees (string) {
  var portion = string.split(String.fromCharCode(176)); // Degree symbol.
  var degrees = Number(portion[0]);

  portion = portion[1].split('\'');
  var minutes = Number(portion[0]);

  portion = portion[1].split('\"');
  var seconds = Number(portion[0]);

  var direction  = portion[1].trim() === 'S' || portion[1].trim() === 'W' ? -1 : 1;

  return direction * (degrees + (minutes / 60) + (seconds / 3600));
}

module.exports = convertToDecimalDegrees;