const retrieveByCoordinates = require('./data/retrieveByCoordinates');
const retrieveByName = require('./data/retrieveByName');

retrieveByCoordinates(43.675672, -79.488402, 2010, function (climate) {
  console.log(climate);
});

// retrieveByName('toronto', 2010, function (climate) {
//   console.log(climate);
// });