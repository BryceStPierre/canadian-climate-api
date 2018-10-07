function transformAttribute (object) {
  var measure = {
    label: "",
    month: [null],  // Leading null so that the month number can be used as index. e.g. 1 - 12
    year: 0,
  };

  for (var attr in object) {
    if (attr === " ") 
      measure.label = object[attr];                // Label for measurement. e.g. Daily Max Temperature
    else if (attr === "Year")
      measure.year = Number(object[attr]);         // Cumulative measure for the given year. e.g. Average Daily Temperature
    else {
      if (measure.month.length < 12)
        measure.month.push(Number(object[attr]));  // Measure for the given month. e.g. Precipitation
    }
  }

  return measure;
}

module.exports = transformAttribute;