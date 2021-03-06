const request = require('request-promise');
const cheerio = require('cheerio');

const locations = require('./locations');
const processClimateCSV = require('../utils/processClimateCSV');

function retrieveByName (name, year, callback) {
  const page = locations[year].page;
  const searchURI = `http://climate.weather.gc.ca/climate_normals/${page}?searchType=stnName&txtStationName=${name}&searchMethod=contains`;

  request({
    uri: searchURI,
    transform: body => cheerio.load(body)
  }).then(function ($) {
    const stationId = Number($('table tbody').children().first().find('a').attr('href').split('stnID=')[1].split('&')[0]);
    const province = $('table tbody').children().first().children().eq(1).text().trim();
    const startYear = locations[year].startYear;

    // ClimateId is held constant, since this appears to not need to be unique.
    const dataURI = `http://climate.weather.gc.ca/climate_normals/bulk_data_e.html?ffmt=csv&lang=e&prov=${province}&yr=${startYear}&stnID=${stationId}&climateID=6130257+++++++++++++&submit=Download+Data`

    request({ 
      uri: dataURI
    }).then(function (res) {
      processClimateCSV(res, year, dataURI, callback);
    }).catch(function (err) {
      console.log(err);
      callback({ error: 'Failed to retrieve climate CSV data.', link: dataURI });
    });

  }).catch(function (err) {
    console.log(err);
    callback({ error: 'Failed to retrieve climate search list.', link: searchURI });
  });
}

module.exports = retrieveByName;