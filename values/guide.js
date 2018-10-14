const args = require('./args');

module.exports = [
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
];
