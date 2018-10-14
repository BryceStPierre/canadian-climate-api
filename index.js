#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const options = commandLineArgs(require('./values/args'));
const guide = commandLineUsage(require('./values/guide'));

const writeToFile = require('./io/writeToFile');
const writeToStdout = require('./io/writeToStdout');
const retrieveByName = require('./data/retrieveByName');
const retrieveByCoordinates = require('./data/retrieveByCoordinates');

// Begin processing options.
console.log(options);

if (options.year !== 1990 && options.year !== 2000 && options.year !== 2010) {
  process.stdout.write('The year for which data is available is 2010 by default, the only other options are 2000 or 1990.');
  process.exit();
}

if (options.help) {

  process.stdout.write(guide);
} else if (options.city) {

  retrieveByName(options.city, options.year, function (climate) {
    if (options.output)
      writeToFile(climate, options.output, options.prettify);
    else
      writeToStdout(climate, options.prettify);
  });
} else if (options.latlng && options.latlng.length === 2) {

  retrieveByCoordinates(options.latlng[0], options.latlng[1], options.year, function (climate) {
    if (options.output)
      writeToFile(climate, options.output, options.prettify);
    else
      writeToStdout(climate, options.prettify);
  });
} else {
  
  process.stdout.write('Specify either a city name or decimal latitude and longitude coordinates.');
  process.exit();
}
