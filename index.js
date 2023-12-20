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

let displayNumberOne = "";
let displayNumberTwo = "";
let results = null;
let lastOperation = "";
let hasDot = false;

numbersElement.forEach((number) => {
  number.addEventListener("click", (e) => {
    /* check dot exists and not to add another */
    if (e.target.innerText === "." && !hasDot) {
      hasDot = true;
    } else if (e.target.innerText === "." && hasDot) {
      return;
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
    let operationName = e.target.innerText;
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
    results = parseFloat(results) * parseFloat(displayNumberTwo);
  }
  if (lastOperation === "+") {
    results = parseFloat(results) + parseFloat(displayNumberTwo);
  }
  if (lastOperation === "-") {
    results = parseFloat(results) - parseFloat(displayNumberTwo);
  }
  if (lastOperation === String.fromCharCode(247)) {
    results = parseFloat(results) / parseFloat(displayNumberTwo);
  }
  if (lastOperation === "%") {
    results = parseFloat(results) % parseFloat(displayNumberTwo);
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

/* moreOperationElement.addEventListener("click", (e) => {
  if (parseFloat(displayNumberTwo) > 0) {
    displayNumberTwo = Math.sqrt(parseFloat(displayNumberTwo));
    displayElementTwo.innerText = displayNumberTwo;
  }
});
 */
moreOperationElement.forEach((moreOperation) => {
  moreOperation.addEventListener("click", (e) => {
    displayNumberTwo = moreMathOperation(e);
    displayElementTwo.innerText = displayNumberTwo;
  });
});

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
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo)
      /* isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number" */
    ) {
      return "SYNTAX";
    }
    return Math.pow(parseFloat(displayNumberTwo), 2);
  }
  if (e.target.innerText === "x" + String.fromCharCode(179)) {
    if (
      displayNumberTwo == "" ||
      isNaN(displayNumberTwo) ||
      typeof parseFloat(displayNumberTwo) !== "number"
    )
      return "SYNTAX";
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
        return Math.sin(parseFloat(displayNumberTwo));
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
        return Math.cos(parseFloat(displayNumberTwo));
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
        return Math.tan(parseFloat(displayNumberTwo));
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
