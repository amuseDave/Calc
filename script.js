const buttonsGrid = document.getElementById("buttons-grid");
const monitorTextContainerEl = document.getElementById("monitor-text-container");
const monitorTextEl = document.getElementById("monitor-text");
const monitorLetterEl = document.getElementById("monitor-letter-placeholder");
const secondMonitorEl = document.getElementById("second-monitor");

const monitorValues = ["0"];
const calculatorState = {
  isDot: false,
  dotIndex: null,
  isPlusMinus: false,
  curVal: "",
  curOperation: "",
  nextOperation: "",
};

monitorTextEl.textContent = monitorValues[0];

function handleCalculator(e) {
  const button = e.target.closest(".button");
  if (!button) return;

  const { value } = button.dataset;
  if (!value) return;

  const operations = value === "minus" || value === "plus";

  if (operations) handleOperations(value);
  if (+value >= 0 && +value <= 9) handleNumbers(value);
  else if (value === "delete") handleDelete();
  else if (value === "dot") handleDot();
  else if (value === "clear") handleClear();
  else if (value === "plus-or-minus") handlePlusMinus();

  if (value === "clear" || value === "minus" || value === "plus") {
    displaySecondMonitor();
  }
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
  if (
    monitorValues.length === 1 &&
    monitorValues[0] === "0" &&
    !calculatorState.curVal &&
    !calculatorState.curOperation
  ) {
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
    calculatorState.dotIndex = monitorValues.length - 1;
  }
}

function handlePlusMinus() {
  if (!+monitorValues.join("")) return;
  calculatorState.isPlusMinus = !calculatorState.isPlusMinus;
}

function handleOperations(operation) {
  const val = +monitorValues.join("");
  if (!val) {
    if (calculatorState.isDot) resetMonitorValues();
  } else {
    if (calculatorState.isPlusMinus) val = -val;

    if (calculatorState.curOperation === " +") {
      calculatorState.curVal = calculatorState.curVal + val;
    }
    //
    else if (calculatorState.curOperation === " -") {
      calculatorState.curVal = calculatorState.curVal - val;
    }
    //
    else calculatorState.curVal = val;
  }

  if (operation === "minus") calculatorState.curOperation = " -";
  else if (operation === "plus") calculatorState.curOperation = " +";
}

function displayMonitorValues() {
  const plusMinus = calculatorState.isPlusMinus ? "-" : "";

  let numStr;
  if (calculatorState.isDot) {
    numStr = new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(monitorValues.slice(0, calculatorState.dotIndex).join(""));

    numStr += monitorValues.slice(calculatorState.dotIndex).join("");
  } else {
    numStr = new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(monitorValues.join(""));
  }

  monitorTextEl.textContent = plusMinus + numStr;
}

function displaySecondMonitor() {
  const val = calculatorState.curVal;
  console.log(val, calculatorState.curOperation);

  if (val === "") return;

  const numStr = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(val);

  const str = numStr + calculatorState.curOperation;
  if (str === secondMonitorEl.textContent) return;

  secondMonitorEl.textContent = str;
  resetMonitorValues();
}

function resetMonitorValues() {
  if (monitorValues.length === 1 && monitorValues[0] === "0") return;
  monitorValues.splice(0, monitorValues.length);
  monitorValues[0] = "0";
  calculatorState.isPlusMinus = false;
  calculatorState.isDot = false;
}

buttonsGrid.addEventListener("click", handleCalculator);
