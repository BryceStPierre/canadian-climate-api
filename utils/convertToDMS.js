function convertToDMS (decimal) { // Will only support Canada for now.
  var dms = {
    direction: decimal < 0 ? 'W' : 'N',
    degrees: parseInt(Math.abs(decimal))
  };
  dms.minutes = parseInt((Math.abs(decimal) - dms.degrees) * 60);
  dms.seconds = (Math.abs(decimal) - dms.degrees - dms.minutes / 60) * 3600;

  return dms;
}

module.exports = convertToDMS;


// How to convert decimal degrees to degrees,minutes,seconds
// One degree (°) is equal to 60 minutes (') and equal to 3600 seconds ("):

// 1° = 60' = 3600"

// The integer degrees (d) are equal to the integer part of the decimal degrees (dd):

// d = integer(dd)

// The minutes (m) are equal to the integer part of the decimal degrees (dd) minus integer degrees (d) times 60:

// m = integer((dd - d) × 60)

// The seconds (s) are equal to the decimal degrees (dd) minus integer degrees (d) minus minutes (m) divided by 60 times 3600:

// s = (dd - d - m/60) × 3600