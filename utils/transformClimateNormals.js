const climateFields = [
  "dailyAvgTemp",
  "stdDev",
  "dailyMaxTemp",
  "dailyMinTemp",
  "extremeMaxTemp",
  "extremeMinTemp",
  "rainfall",
  "snowfall",
  "precipitation",
  "extremeDailyRainfall",
  "extremeDailySnowfall",
  "extremeDailyPrecipitation",
  "extremeDailySnowDepth"
];

function transformClimateMeasure (object) {
  var measure = {
    label: "",
    month: [null],  // Leading null so that month number can be used as index.
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

function transformClimateNormals (rows) {
  var normals = {};

  rows
    .filter(o => !o[" "].includes("Date"))
    .forEach((o, i) => {
      normals[climateFields[i]] = transformClimateMeasure(o);
    });

  return normals;
}

module.exports = transformClimateNormals;