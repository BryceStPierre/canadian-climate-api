#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');


const definitions = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Print the help guide.' }
];
// const optionDefinitions = [
//   { name: 'verbose', alias: 'v', type: Boolean },
//   { name: 'src', type: String, multiple: true, defaultOption: true },
//   { name: 'timeout', alias: 't', type: Number }
// ]

const options = commandLineArgs(definitions);

const sections = [
  {
    header: 'Climate Normals CLI',
    content: 'A simple utility for downloading climate normal data for Canada and the United States.'
  },
  {
    header: 'Synopsis',
    content: '$ climate-normals <options> <command>'
  },
  {
    header: 'Options',
    optionList: definitions
    // optionList: [
    //   {
    //     name: 'output',
    //     typeLabel: '{underline filename}',
    //     description: 'The input to process.'
    //   },
    //   {
    //     name: 'help',
    //     description: 'Print this usage guide.'
    //   }
    // ]
  }
]
const usage = commandLineUsage(sections);
if (options.help)
  console.log(usage);