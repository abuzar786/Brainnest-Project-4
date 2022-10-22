const display1El = document.querySelector(".display1");
const display2El = document.querySelector(".display2");
const tempResultEl = document.querySelector(".display-result");
const allClearButton = document.querySelector(".all-clear-btn");
const lastEntityClear = document.querySelector(".last-entity-clear");
const operationEl = document.querySelectorAll(".operation");
const numbersEl = document.querySelectorAll(".number");
const equalButton = document.querySelector(".equal-btn");

let dispNumber1 = "";
let dispNumber2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dispNumber2 += e.target.innerText;
    display2El.innerText = dispNumber2;
  });
});

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dispNumber2) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dispNumber2 && dispNumber1 && lastOperation) {
      operate();
    } else {
      result = parseFloat(dispNumber2);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  dispNumber1 = dispNumber2 + " " + name + " ";
  display1El.innerText = dispNumber1;
  display2El.innerText = "";
  dispNumber2 = "";
  tempResultEl.innerText = result;
}
function operate() {
  if (lastOperation === "*") {
    result = parseFloat(result) * parseFloat(dispNumber2);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dispNumber2);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dispNumber2);
  } else if (lastOperation === "-") {
    resutl = parseFloat(result) - parseFloat(dispNumber2);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dispNumber2);
  }
}
equalButton.addEventListener("click", () => {
  if (!dispNumber1 || !dispNumber2) return;
  operate();
  clearVar();
  display1El.innerText = "";
  dispNumber1 = "";
  dispNumber2 = result;
  display2El.innerText = dispNumber2;
});
allClearButton.addEventListener("click", () => {
  display1El.innerText = "0";
  display2El.innerText = "0";
  dispNumber1 = "";
  dispNumber2 = "";
  tempResultEl.innerText = "";
});
lastEntityClear.addEventListener("click", (e) => {
  display2El.innerText = "";
  dispNumber2 = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    padNumberEl(e.key);
  } else if (
    e.key === "*" ||
    e.key === "/" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "%"
  ) {
    padOperationEl(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    padEqualEl(e.key);
  }
});

function padNumberEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function padOperationEl(key) {
  operationEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function padEqualEl(key) {
  equalButton.click();
}
