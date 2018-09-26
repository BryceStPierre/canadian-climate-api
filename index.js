#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const definitions = [
  { 
    name: 'country', 
    alias: 'c', 
    type: String, 
    description: 'Specify the country to search.' 
  }, { 
    name: 'city', 
    alias: 'n', 
    type: String, 
    description: 'Specify the city to search.' 
  }, {
    name: 'latlng',
    alias: 'l',
    type: Number,
    multiple: true,
    description: 'Specify the latitude/longitude coordinates to search.'
  }, { 
    name: 'output', 
    alias: 'o', 
    type: String, 
    description: 'Specify the output filename.' 
  }, { 
    name: 'help', 
    alias: 'h', 
    type: Boolean, 
    description: 'Print the help guide.' 
  }
];

const options = commandLineArgs(definitions);

const guide = commandLineUsage([
  {
    header: 'Climate Normals CLI',
    content: 'A simple utility for downloading climate normal data for Canada and the United States.'
  },
  {
    header: 'Sample Commands',
    content: '> climate-normals <options>\n> climate-normals -c canada --city toronto\n> climate-normals --country us -n "los angeles"\n> climate-normals -c us -n chicago -o chicago'
  },
  {
    header: 'Options',
    optionList: definitions
  }
]);

process.stdout.write(JSON.stringify(options));
// console.log(options);


if (options.help)
  console.log(guide);
