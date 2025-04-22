const buttonsGrid = document.getElementById("buttons-grid");
const monitorTextContainerEl = document.getElementById("monitor-text-container");
const monitorTextEl = document.getElementById("monitor-text");
const monitorLetterEl = document.getElementById("monitor-letter-placeholder");

const monitorValues = ["0"];
monitorTextEl.textContent = monitorValues[0];

function handleCalculator(e) {
  const button = e.target.closest(".button");
  if (!button) return;

  const { value } = button.dataset;
  if (!value) return;

  if (+value >= 0 && +value <= 9) {
    handleNumbers(value);
  }
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

  monitorTextEl.textContent = monitorValues.join("");
}

buttonsGrid.addEventListener("click", handleCalculator);
