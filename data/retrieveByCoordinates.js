const request = require('request-promise');
const cheerio = require('cheerio');

const locations = require('../values/locations');
const convertDecimalToDMS = require('../utils/convertDecimalToDMS');
const processClimateCSV = require('../utils/processClimateCSV');

const climateId = 6130257;

function retrieveByCoordinates (latitude, longitude, year, callback) {
  const page = locations[year].page;
  const lat = convertDecimalToDMS(latitude);
  const long = convertDecimalToDMS(longitude);
  const uri = `http://climate.weather.gc.ca/climate_normals/${page}?searchType=stnProx&txtRadius=25&optProxType=custom`
    + `&txtCentralLatDeg=${lat.degrees}&txtCentralLatMin=${lat.minutes}&txtCentralLatSec=${lat.seconds}`
    + `&txtCentralLongDeg=${long.degrees}&txtCentralLongMin=${long.minutes}&txtCentralLongSec=${long.seconds}`;

  request({
    uri: uri,
    transform: body => cheerio.load(body)
  }).then(function ($) {
    const stationId = Number($('table tbody').children().first().find('a').attr('href').split('stnID=')[1].split('&')[0]);
    const province = $('table tbody').children().first().children().eq(1).text().trim();
    const startYear = locations[year].startYear;

    request({ // ClimateId is held constant, since this appears to not need to be unique.
      uri: `http://climate.weather.gc.ca/climate_normals/bulk_data_e.html?ffmt=csv&lang=e&prov=${province}&yr=${startYear}&stnID=${stationId}&climateID=6130257+++++++++++++&submit=Download+Data`
    }).then(function (res) {
      processClimateCSV(res, year, callback);
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