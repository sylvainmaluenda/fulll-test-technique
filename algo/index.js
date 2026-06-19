const { fizzBuzz } = require("./fizzbuzz");

const n = Number(process.argv[2] || 100);

try {
  fizzBuzz(n).forEach((value) => console.log(value));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
