const transformAttribute = require('./transformAttribute');
const attributes = require('../values/attributes');

function transformData (rows) {
  var normals = {};

  rows
    .filter(o => !o[" "].includes('Date'))             // Filter out any lines that include dates.
    .forEach((o, i) => {
      normals[attributes[i]] = transformAttribute(o);  // Process data into one object of the final JSON output.
    });

  return normals;
}

module.exports = transformData;