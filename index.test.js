const { describe } = require("node:test");
const {
  clearValue,
  mathOperation,
  moreMathOperation,
  getFactorial,
} = require("./index.js");

describe("index", () => {
  describe("getFactorial", () => {
    test("will Return the factorial of the integer n", () => {
      const factorial = {
        n: 5,
        correctResults: 120,
      };
      expect(getFactorial(factorial.n)).toBe(factorial.correctResults);
    });
  });
});
