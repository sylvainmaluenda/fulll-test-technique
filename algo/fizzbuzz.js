const isFizz = (n) => n % 3 === 0;
const isBuzz = (n) => n % 5 === 0;

const fizzBuzzValue = (n) => {
  if (isFizz(n) && isBuzz(n)) return "FizzBuzz";
  if (isFizz(n)) return "Fizz";
  if (isBuzz(n)) return "Buzz";

  return String(n);
};

const fizzBuzz = (n) => {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("n must be a positive integer");
  }

  return Array.from({ length: n }, (_, index) => index + 1).map(fizzBuzzValue);
};

module.exports = {
  fizzBuzz,
  fizzBuzzValue,
};
