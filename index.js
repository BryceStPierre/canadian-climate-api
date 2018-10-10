#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const args = require('./cli/args');
const retrieveByName = require('./data/retrieveByName');
const retrieveByCoordinates = require('./data/retrieveByCoordinates');

const options = commandLineArgs(args);
const guide = commandLineUsage([
  {
    header: 'Canadian Climate Normals CLI',
    content: 'A simple utility for downloading Canadian climate normals data.'
  },
  {
    header: 'Sample Commands',
    content: `
      > canadian-climate-normals -c calgary\n
      > canadian-climate-normals --city vancouver --out vancouver.json\n
      > canadian-climate-normals -c "st. johns" -y 2000 -o "st. johns" -p\n
      > canadian-climate-normals --latlng 43.675672 -79.488402 --output toronto.json --prettify
    `
  },
  {
    header: 'Options',
    optionList: args
  }
]);

if (options.year !== 1990 && options.year !== 2000 && options.year !== 2010) {
  process.stdout.write('The year for which data is available is 2010 by default, the only other options are 2000 or 1990.');
  process.exit();
}

if (options.city) {
  retrieveByName(options.city, options.year, function (climate) {
    if (options.output)
      console.log(climate);
    else
      process.stdout.write(JSON.stringify(climate));
    process.exit();
  });
}

if (options.latlng && options.latlng.length === 2) {
  retrieveByCoordinates(options.latlng[0], options.latlng[1], options.year, function (climate) {
    if (options.output)
      console.log(climate);
    else
      process.stdout.write(JSON.stringify(climate));
    process.exit();
  });
}

if (options.help) {
  process.stdout.write(guide);
  process.exit();
}

process.stdout.write('Specify either a city name or decimal latitude and longitude coordinates.');
process.exit();
