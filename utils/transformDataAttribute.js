function transformDataAttribute (object) {
  var measure = {
    label: "",
    month: [null],  // Leading null so that the month number can be used as index.
    year: 0,
  };

  for (var f in object) {
    if (f === " ") 
      measure.label = object[f];
    else if (f === "Year")
      measure.year = Number(object[f]);
    else {
      if (measure.month.length < 12)
        measure.month.push(Number(object[f]));
    }
  }

  return measure;
}

module.exports = transformDataAttribute;