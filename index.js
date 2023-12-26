const displayElementOne = document.querySelector(".display-box1");
const displayElementTwo = document.querySelector(".display-box2");
const temporayResultsElement = document.querySelector(".temporary-box");
const numbersElement = document.querySelectorAll(".number");
const operationElement = document.querySelectorAll(".operation");
const equalElement = document.querySelector(".equal");
const clearAllElememt = document.querySelector(".all-clear");
const plusMinusElement = document.querySelector(".plus-minus");
const bracketLeftElement = document.querySelector(".bracket-left");
const bracketRightElement = document.querySelector(".bracket-right");
const moreOperationElement = document.querySelectorAll(".more-operation");
const toggleElement = document.querySelector(".toggle");
const buttonToggleElement = document.querySelector(".toggle-btn");
const memoryStoreElement = document.querySelector(".memory-store");
const memoryClearElement = document.querySelector(".memory-clear");
const memoryRecallElement = document.querySelector(".memory-recall");
const memoryPlusElement = document.querySelector(".memory-plus");
const memoryMinusElement = document.querySelector(".memory-minus");
const radianElement = document.querySelector(".rad");
const degreeElement = document.querySelector(".deg");
const radianDisplayElement = document.querySelector(".rad-box");

let displayNumberOne = "";
let displayNumberTwo = "";
let results = null;
let lastOperation = "";
let hasDot = false;
let memoryValue = 0;
let isRadian = false;
let radian = Math.PI / 180;

numbersElement.forEach((number) => {
  number.addEventListener("click", (e) => {
    /* check dot exists and not to add another */
    if (e.target.innerText === "." && !hasDot) {
      hasDot = true;
    } else if (e.target.innerText === "." && hasDot) {
      return;
    }

    /* check if its a first zero */
    if (displayNumberTwo === "0") {
      displayNumberTwo = "";
    }
    /* display numbers on screen */
    displayNumberTwo += e.target.innerText;
    displayElementTwo.innerText = displayNumberTwo;
  });
});

operationElement.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    /* check if there is a number for operation */
    if (!displayNumberTwo) return;
    hasDot = false;
    //let operationName = e.target.innerText;
    let operationName;

    if (e.target.innerText === "EE") {
      operationName = "E";
    } else if (e.target.innerText === "y" + String.fromCharCode(8730) + "x") {
      operationName = String.fromCharCode(8730);
    } else {
      operationName = e.target.innerText;
    }
    if (displayNumberOne && displayElementTwo && lastOperation) {
      mathOperation();
    } else {
      results = parseFloat(displayNumberTwo);
    }
    /* clear display 2 to display 1 */
    clearValue(operationName);
    lastOperation = operationName;
  });
});

/**
 * clear the value at display two. update display one with the computation.
 *
 * @param {string} name
 */
function clearValue(name = "") {
  displayNumberOne += displayNumberTwo + " " + name + " ";
  displayElementOne.innerText = displayNumberOne;
  displayElementTwo.innerText = "0";
  displayNumberTwo = "";
  temporayResultsElement.innerHTML = results;
}

/**
 * performs mathematical operations based on the last operation symbol
 * computes multiplication of numbers
 * computes division of numbers
 * computes subtraction of numbers
 * computes addition of numbers
 * computes modulus of numbers
 *
 *  */
function mathOperation() {
  if (lastOperation === "x") {
    results =
      (parseFloat(results) *
        parseFloat(displayNumberTwo * 100000000000000000)) /
      100000000000000000;
  }
  if (lastOperation === "+") {
    results =
      (parseFloat(results) * 100000000000000000 +
        parseFloat(displayNumberTwo) * 100000000000000000) /
      100000000000000000;
  }
  if (lastOperation === "-") {
    results =
      (parseFloat(results) * 100000000000000000 -
        parseFloat(displayNumberTwo) * 100000000000000000) /
      100000000000000000;
  }
  if (lastOperation === String.fromCharCode(247)) {
    results = parseFloat(results) / parseFloat(displayNumberTwo);
  }
  if (lastOperation === "%") {
    results = parseFloat(results) % parseFloat(displayNumberTwo);
  }
  if (lastOperation === "^") {
    results = Math.pow(parseFloat(results), parseFloat(displayNumberTwo));
  }
  if (lastOperation === "E") {
    results = parseFloat(results) * Math.pow(10, parseFloat(displayNumberTwo));
  }
  if (lastOperation === String.fromCharCode(8730)) {
    results = Math.pow(parseFloat(displayNumberTwo), parseFloat(1 / results));
  }
}

equalElement.addEventListener("click", (e) => {
  if (!displayNumberOne || !displayNumberTwo) return;
  hasDot = false;
  mathOperation();
  clearValue();
  displayElementTwo.innerText = results;
  temporayResultsElement.innerText = "";
  displayNumberTwo = results;
  displayNumberOne = "";
  displayNumberTwo = "";
});

clearAllElememt.addEventListener("click", (e) => {
  displayElementTwo.innerText = "";
  displayElementOne.innerText = "";
  temporayResultsElement.innerText = "";
  displayNumberOne = "";
  displayNumberTwo = "";
});

plusMinusElement.addEventListener("click", (e) => {
  if (parseFloat(displayNumberTwo) > 0) {
    displayNumberTwo = parseFloat(displayNumberTwo) * -1;
    displayElementTwo.innerText = displayNumberTwo;
  } else if (parseFloat(displayNumberTwo) < 0) {
    displayNumberTwo = parseFloat(displayNumberTwo) * -1;
    displayElementTwo.innerText = displayNumberTwo;
  }
});

//more operations

moreOperationElement.forEach((moreOperation) => {
  moreOperation.addEventListener("click", (e) => {
    displayNumberTwo = moreMathOperation(e);
    displayElementTwo.innerText = displayNumberTwo;
    displayNumberTwo = "";
  });
});

/**
 * Returns the mathematical operation of the input.
 *
 * @param {string} e
 * @return {number}
 *
 */
function moreMathOperation(e) {
  if (e.target.innerText === String.fromCharCode(8730)) {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "SYNTAX";
    if (parseFloat(displayNumberTwo) > 0) {
      return Math.sqrt(parseFloat(displayNumberTwo));
    } else {
      return "ERROR";
    }
  }
  if (e.target.innerText === String.fromCharCode(8731)) {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "SYNTAX";
    return Math.cbrt(parseFloat(displayNumberTwo));
  }
  if (e.target.innerText === "x" + String.fromCharCode(178)) {
    if (displayNumberTwo == "" || isNaN(displayNumberTwo)) {
      return "";
    }
    return Math.pow(parseFloat(displayNumberTwo), 2);
  }
  if (e.target.innerText === "x" + String.fromCharCode(179)) {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "";
    return Math.pow(parseFloat(displayNumberTwo), 3);
  }
  if (e.target.innerText === "ex") {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "SYNTAX";
    return Math.exp(parseFloat(displayNumberTwo));
  }
  if (e.target.innerText === "10x") {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "SYNTAX";
    return Math.pow(10, parseFloat(displayNumberTwo));
  }
  if (e.target.innerText === "ln") {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "SYNTAX";
    try {
      if (parseFloat(displayNumberTwo) > 0) {
        return Math.log(parseFloat(displayNumberTwo));
      } else {
        throw new Error("ERROR");
      }
    } catch (err) {
      return err.name.toUpperCase();
    }
  }

  if (e.target.innerText === "log10") {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "SYNTAX";
    try {
      if (parseFloat(displayNumberTwo) > 0) {
        return Math.log10(parseFloat(displayNumberTwo));
      } else {
        throw new Error("ERROR");
      }
    } catch (err) {
      return err.name.toUpperCase();
    }
  }

  if (e.target.innerText === "sin") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo)
      ) {
        return Math.sin(parseFloat(displayNumberTwo) * radian);
      } else {
        throw new Error();
      }
    } catch (err) {
      return "SYNTAX";
    }
  }

  if (e.target.innerText === "cos") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo)
      ) {
        return Math.cos(parseFloat(displayNumberTwo) * radian);
      } else {
        throw new Error();
      }
    } catch (err) {
      return "SYNTAX";
    }
  }

  if (e.target.innerText === "tan") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo)
      ) {
        return Math.tan(parseFloat(displayNumberTwo) * radian);
      } else {
        throw new Error();
      }
    } catch (err) {
      return "SYNTAX";
    }
  }

  if (e.target.innerText === "sinh") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo)
      ) {
        return Math.sinh(parseFloat(displayNumberTwo));
      } else {
        throw new Error();
      }
    } catch (err) {
      return "SYNTAX";
    }
  }

  if (e.target.innerText === "tanh") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo)
      ) {
        return Math.tanh(parseFloat(displayNumberTwo));
      } else {
        throw new Error();
      }
    } catch (err) {
      return "SYNTAX";
    }
  }

  if (e.target.innerText === "cosh") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo)
      ) {
        return Math.cosh(parseFloat(displayNumberTwo));
      } else {
        throw new Error();
      }
    } catch (err) {
      return "SYNTAX";
    }
  }

  if (e.target.innerText === "e") {
    hasDot = true;
    return Math.E;
  }

  if (e.target.innerText === String.fromCharCode(960)) {
    hasDot = true;
    return Math.PI;
  }

  if (e.target.innerText === "X!") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo) &&
        parseFloat(displayNumberTwo) >= 0
      ) {
        return getFactorial(parseFloat(displayNumberTwo));
      } else {
        throw new Error();
      }
    } catch (err) {
      return "ERROR";
    }
  }

  if (e.target.innerText === "1/x") {
    try {
      if (
        displayNumberTwo !== "" &&
        typeof parseFloat(displayNumberTwo) === "number" &&
        !isNaN(displayNumberTwo) &&
        parseFloat(displayNumberTwo) !== 0
      ) {
        return 1 / parseFloat(displayNumberTwo);
      } else {
        throw new Error();
      }
    } catch (err) {
      return "ERROR";
    }
  }

  if (e.target.innerText === "Rand") {
    hasDot = true;
    return Math.random();
  }

  if (e.target.innerText === "DEL") {
    return displayNumberTwo.slice(0, -1);
  }
}

/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 */
function getFactorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  } else {
    return n * getFactorial(n - 1);
  }
}
// toggle the btn
toggleElement.addEventListener("click", () => {
  buttonToggleElement.classList.toggle("toggle-btn");
});

/* memory functionality */

memoryStoreElement.addEventListener("click", () => {
  memoryValue = parseFloat(displayNumberTwo);
});

memoryClearElement.addEventListener("click", () => {
  memoryValue = 0;
});

memoryRecallElement.addEventListener("click", () => {
  displayNumberTwo = memoryValue.toString();
  displayElementTwo.innerText = displayNumberTwo;
});

memoryMinusElement.addEventListener("click", () => {
  if (displayNumberTwo === "") {
    memoryValue = 0;
  } else {
    memoryValue -= parseFloat(displayNumberTwo);
  }
  displayElementTwo.innerText = memoryValue;
});

memoryPlusElement.addEventListener("click", () => {
  if (displayNumberTwo === "") {
    memoryValue = 0;
  } else {
    memoryValue += parseFloat(displayNumberTwo);
  }
  displayElementTwo.innerText = memoryValue;
});

/* radian implementation */
radianElement.addEventListener("click", () => {
  isRadian = true;
  if (isRadian) {
    radian = 1;
    radianDisplayElement.classList.add("rad-show");
  }
});

degreeElement.addEventListener("click", () => {
  isRadian = false;
  if (!isRadian) {
    radian = Math.PI / 180;
    radianDisplayElement.classList.remove("rad-show");
  }
});

module.exports = {
  clearValue: clearValue,
  mathOperation: mathOperation,
  moreMathOperation: moreMathOperation,
  getFactorial: getFactorial,
};
