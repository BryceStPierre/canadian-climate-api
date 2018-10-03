var parse = require('csv-parse');
var _ = require('lodash');

var convertDMSToDecimal = require('./convertDMSToDecimal');
var trimElevationString = require('./trimElevationString');
var transformData = require('./transformData');

function processClimateCSV (csv, callback) {
  var lines = csv.split('\n');
  lines.splice(0, 3);            // Trim problematic lines.

  parse(lines.join('\n'), {
    from: 0,
    to: 1,
    columns: true
  }, function (err, rows) {
    if (err)
      return callback({ error: 'Failed to parse header rows.' });

    var climate = {
      id: Number(rows[0].CLIMATE_ID),
      station: _.capitalize(rows[0].STATION_NAME),
      province: rows[0].PROVINCE,
      latlng: [
        convertDMSToDecimal(rows[0].LATITUDE), 
        convertDMSToDecimal(rows[0].LONGITUDE)
      ],
      elevation: trimElevationString(rows[0].ELEVATION)
    };

    lines = csv.split('\n');    // Trim problematic lines.
    lines.splice(0, 13);
    lines.splice(1, 1);
    lines.splice(9, 1);

    parse(lines.join('\n'), {
      from: 0,
      to: 19,
      columns: true
    }, function (err, rows) {
      if (err)
        return callback({ error: 'Failed to parse data rows.' });
        
      climate.normals = transformData(rows);
      callback(climate);
    });
  });
}

module.exports = processClimateCSV;