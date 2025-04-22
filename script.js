const buttonsGrid = document.getElementById("buttons-grid");
const monitorTextContainerEl = document.getElementById("monitor-text-container");
const monitorTextEl = document.getElementById("monitor-text");
const monitorLetterEl = document.getElementById("monitor-letter-placeholder");
const secondMonitorEl = document.getElementById("second-monitor");

const monitorValues = ["0"];
const calculatorState = {
  isDot: false,
  isPlusMinus: false,
  curVal: 0,
  curOperation: "",
};

monitorTextEl.textContent = monitorValues[0];
// secondMonitorEl.textContent = monitorValues[0];

function handleCalculator(e) {
  const button = e.target.closest(".button");
  if (!button) return;

  const { value } = button.dataset;
  if (!value) return;

  if (+value >= 0 && +value <= 9) handleNumbers(value);
  else if (value === "delete") handleDelete();
  else if (value === "dot") handleDot();
  else if (value === "clear") handleClear();
  else if (value === "plus-or-minus") handlePlusMinus();
  else if (value === "plus") handlePlus();
  else if (value === "minus") handleMinus();

  displaySecondMonitor();
  displayMonitorValues();
}

function handleNumbers(value) {
  if (monitorValues.length === 1 && monitorValues[0] === "0") {
    // Set other value than 0
    monitorValues[0] = value;
  } else {
    const letterWidth = monitorLetterEl.clientWidth;
    const monitorWidth = monitorTextContainerEl.clientWidth;
    const monitorTextWidth = monitorTextEl.clientWidth;

    if (monitorTextWidth + letterWidth > monitorWidth) {
      console.log("handle error alert for max inputs");
      // Handle error alert to max inputs
      return;
    }
    monitorValues.push(value);
  }
}

function handleDelete() {
  if (monitorValues.length > 1) {
    const val = monitorValues.pop();
    if (val === ".") calculatorState.isDot = false;
  } else if (monitorValues[0] !== "0") {
    resetMonitorValues();
  }
}
function handleClear() {
  if (monitorValues.length === 1 && monitorValues[0] === "0" && !calculatorState.curVal) {
    return;
  }
  calculatorState.curVal = 0;
  calculatorState.curOperation = "";
  resetMonitorValues();
}

function handleDot() {
  if (calculatorState.isDot) return;
  else {
    calculatorState.isDot = true;
    monitorValues.push(".");
  }
}

function handlePlusMinus() {
  if (!isValidMonitor()) return;
  calculatorState.isPlusMinus = !calculatorState.isPlusMinus;
}

function handlePlus() {
  if (!isValidMonitor()) {
    if (calculatorState.curVal) calculatorState.curOperation = " +";
    return;
  }

  calculatorState.curOperation = " +";

  // Convert string integer
  // Add values for the calc
  let val = +monitorValues.join("");
  if (calculatorState.isPlusMinus) val = -val;

  if (calculatorState.curVal) {
    calculatorState.curVal = calculatorState.curVal + val;
  } else {
    calculatorState.curVal = val;
  }
}
function handleMinus() {
  if (!isValidMonitor()) {
    if (calculatorState.curVal) calculatorState.curOperation = " -";
    return;
  }

  calculatorState.curOperation = " -";

  // Convert string integer
  // Add values for the calc
  let val = +monitorValues.join("");
  if (calculatorState.isPlusMinus) val = -val;

  if (calculatorState.curVal) {
    calculatorState.curVal = calculatorState.curVal - val;
  } else {
    calculatorState.curVal = val;
  }
}

function displayMonitorValues() {
  const plusMinus = calculatorState.isPlusMinus ? "-" : "";
  monitorTextEl.textContent = plusMinus + monitorValues.join("");
}

function displaySecondMonitor() {
  const val = calculatorState.curVal;
  const str = val + calculatorState.curOperation;
  if (str === secondMonitorEl.textContent) return;

  resetMonitorValues();
  secondMonitorEl.textContent = str;
}

function resetMonitorValues() {
  if (monitorValues.length === 1 && monitorValues[0] === "0") return;
  monitorValues.splice(0, monitorValues.length);
  monitorValues[0] = "0";
  calculatorState.isPlusMinus = false;
  calculatorState.isDot = false;
}

function isValidMonitor() {
  if (!+monitorValues.join("")) {
    resetMonitorValues();
    return false;
  } else return true;
}

buttonsGrid.addEventListener("click", handleCalculator);
