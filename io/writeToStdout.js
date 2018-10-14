const format = require('./format');

function writeToStdout (data, prettify) {
  process.stdout.write(format(data, prettify));
}

module.exports = writeToStdout;