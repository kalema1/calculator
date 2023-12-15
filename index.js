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
    displayNumberTwo += e.target.innerText;
    displayElementTwo.innerText = displayNumberTwo;
  });
});
