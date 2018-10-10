module.exports = [
  { 
    name: 'year', 
    alias: 'y', 
    type: Number, 
    typeLabel: '{italic 1990, 2000, or 2010}',
    description: 'Specify the latest year data is available.',
    defaultOption: 2010
  }, { 
    name: 'city', 
    alias: 'c', 
    type: String, 
    description: 'Specify the city or municipality.' 
  }, {
    name: 'latlng',
    alias: 'l',
    type: Number,
    multiple: true,
    description: 'Specify the latitude/longitude coordinates.'
  }, { 
    name: 'output', 
    alias: 'o', 
    type: String, 
    typeLabel: '{underline file}',
    description: 'Specify the output filename.' 
  }, { 
    name: 'prettify', 
    alias: 'p', 
    type: Boolean, 
    description: 'Prettify the output JSON data.',
    defaultOption: false
  }, { 
    name: 'help', 
    alias: 'h', 
    type: Boolean, 
    description: 'Display this usage guide.' 
  }
];