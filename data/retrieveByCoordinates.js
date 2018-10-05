var request = require('request-promise');
var cheerio = require('cheerio');

const convertToDMS = require('./utils/convertDecimalToDMS');
const processClimateCSV = require('./utils/processClimateCSV');

function retrieveByCoordinates (latitude, longitude, year, callback) {
  var lat = convertToDMS(latitude);
  var long = convertToDMS(longitude);
  var uri = `http://climate.weather.gc.ca/climate_normals/station_select_1981_2010_e.html?searchType=stnProx&txtRadius=25&optProxType=custom`
    + `&txtCentralLatDeg=${lat.degrees}&txtCentralLatMin=${lat.minutes}&txtCentralLatSec=${lat.seconds}`
    + `&txtCentralLongDeg=${long.degrees}&txtCentralLongMin=${long.minutes}&txtCentralLongSec=${long.seconds}`;

  request({
    uri: uri,
    transform: body => cheerio.load(body)
  }).then(function ($) {
    var stationId = Number($('table tbody').children().first().find('a').attr('href').split('stnID=')[1].split('&')[0]);
    var province = $('table tbody').children().first().children().eq(1).text().trim();
   
    request({
      uri: `http://climate.weather.gc.ca/climate_normals/bulk_data_e.html?ffmt=csv&lang=e&prov=${province}&yr=1981&stnID=${stationId}&climateID=${climateId}+++++++++++++&submit=Download+Data`
    }).then(function (res) {
      processClimateCSV(res, callback);
    }).catch(function (err) {
      console.log(err);
      callback({ error: 'Failed to retrieve climate CSV data.' });
    });
  }).catch(function (err) {
    console.log(err);
    callback({ error: 'Failed to retrieve climate search list.' });
  });
}

module.exports = retrieveByCoordinates;