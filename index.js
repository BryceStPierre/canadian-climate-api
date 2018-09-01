#!/usr/bin/env node

// https://nodejs.org/docs/latest/api/process.html#process_process_argv

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);



process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});