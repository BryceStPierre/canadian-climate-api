var parse = require('csv-parse');

var convertDMSToDecimal = require('./convertDMSToDecimal');
var trimElevationString = require('./trimElevationString');
var transformData = require('./transformData');

function processClimateCSV (csv, year, uri, callback) {
  var lines = csv.split('\n');
  lines.splice(0, 3);            // Trim problematic lines.

  parse(lines.join('\n'), {      // Parse header row of the file.
    from: 0,
    to: 1,
    columns: true
  }, function (err, rows) {
    if (err)
      return callback({ error: 'Failed to parse header rows.', link: uri });

    var climate = {
      id: Number(rows[0].CLIMATE_ID),
      station: rows[0].STATION_NAME,
      province: rows[0].PROVINCE,
      latlng: [
        convertDMSToDecimal(rows[0].LATITUDE), 
        convertDMSToDecimal(rows[0].LONGITUDE)
      ],
      elevation: trimElevationString(rows[0].ELEVATION)
    };

    var headerShift = climate.station.includes('*') ? 1 : 0; 
    climate.station = climate.station.replace('*', '').toUpperCase();

    lines = csv.split('\n');              // Trim problematic lines.
    lines.splice(0, 13 + headerShift);    // If there is an asterisk message, we want to skip this line.
    
    if (year !== 1990) {                  
      lines.splice(1, 1);
      lines.splice(9, 1);
    } else {                              // Different structure for 1990 data files.
      lines.splice(0, 1);
      lines.splice(1, 1);
      lines.splice(8, 1);
      lines.splice(2, 0, '"Standard Deviation","NaN","NaN","NaN","NaN","NaN","NaN","NaN","NaN","NaN","NaN","NaN","NaN","NaN"');
    }

    lines = lines.slice(0, 12);           // Take subset of useful lines.

    parse(lines.join('\n'), {             // Parse data (climate normals) rows of the file.
      from: 0,
      to: 12,
      columns: true
    }, function (err, rows) {
      if (err)
        return callback({ error: 'Failed to parse data rows.', link: uri });
        
      climate.normals = transformData(rows);
      callback(climate);
    });
  });
}

module.exports = processClimateCSV;