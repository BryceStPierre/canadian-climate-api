function format (data, prettify) {
  return prettify ? JSON.stringify(data, null, 3) : JSON.stringify(data);
}

module.exports = format;