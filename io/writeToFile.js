const fs = require('fs');
const format = require('./format');

function writeToFile (data, path, prettify) {
  fs.writeFile(path, format(data, prettify), (err) => {
      if (err) 
        console.log(`Error writing output: ${err}`);
      else
        console.log(`Climate data saved to ${path}`);
  });
}

module.exports = writeToFile;