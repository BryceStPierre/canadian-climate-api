// https://nodejs.org/docs/latest/api/process.html#process_process_argv

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

console.log(process.argv0);