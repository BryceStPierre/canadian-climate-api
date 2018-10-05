const transformAttribute = require('./transformAttribute');
const attributes = require('../values/attributes');

function transformData (rows) {
  var normals = {};

  rows
    .filter(o => !o[" "].includes("Date"))
    .forEach((o, i) => {
      normals[attributes[i]] = transformAttribute(o);
    });

  return normals;
}

module.exports = transformData;