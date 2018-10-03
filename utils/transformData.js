const transformDataAttribute = require('./transformDataAttribute');
const dataAttributes = require('./dataAttributes');

function transformData (rows) {
  var normals = {};

  rows
    .filter(o => !o[" "].includes("Date"))
    .forEach((o, i) => {
      normals[dataAttributes[i]] = transformDataAttribute(o);
    });

  return normals;
}

module.exports = transformData;