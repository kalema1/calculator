const displayElementOne = document.querySelector(".display-box1");
const displayElementTwo = document.querySelector(".display-box2");
const temporayResultsElement = document.querySelector(".temporary-box");
const numbersElement = document.querySelectorAll(".number");
const operationElement = document.querySelectorAll(".operation");
const equalElement = document.querySelector(".equal");
const clearElememt = document.querySelector(".all-clear");

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

function clearValue(name) {
  displayNumberOne += displayNumberTwo + " " + name + " ";
  displayElementOne.innerText = displayNumberOne;
  displayElementTwo.innerText = "0";
  displayNumberTwo = "";
  temporayResultsElement.innerHTML = results;
}

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
