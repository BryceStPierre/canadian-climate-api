#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const args = require('./cli/args');

const options = commandLineArgs(args);

const guide = commandLineUsage([
  {
    header: 'Climate Normals CLI',
    content: 'A simple utility for downloading climate normal data for Canada and the United States.'
  },
  {
    header: 'Sample Commands',
    content: `
      > climate-normals -c calgary\n
      > climate-normals --city vancouver --out vancouver.json\n
      > climate-normals -c "st. johns" -y 2000 -o "st. johns"\n
      > climate-normals --latlng 43.675672 -79.488402 --out toronto.json
    `
  },
  {
    header: 'Options',
    optionList: args
  }
]);

process.stdout.write(JSON.stringify(options));
// console.log(options);

if (options.help)
  console.log(guide);
