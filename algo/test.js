const assert = require("assert");
const { fizzBuzzValue, fizzBuzz } = require("./fizzbuzz");

assert.strictEqual(fizzBuzzValue(1), "1");
assert.strictEqual(fizzBuzzValue(3), "Fizz");
assert.strictEqual(fizzBuzzValue(5), "Buzz");
assert.strictEqual(fizzBuzzValue(15), "FizzBuzz");
assert.strictEqual(fizzBuzzValue(30), "FizzBuzz");

assert.deepStrictEqual(fizzBuzz(15), [
  "1",
  "2",
  "Fizz",
  "4",
  "Buzz",
  "Fizz",
  "7",
  "8",
  "Fizz",
  "Buzz",
  "11",

  "Fizz",
  "13",
  "14",
  "FizzBuzz",
]);

console.log("All tests passed.");
