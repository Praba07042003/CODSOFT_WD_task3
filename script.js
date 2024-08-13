// script.js

// Global variables
const display = document.getElementById("display");
let currentInput = "";
let operator = "";
let firstOperand = "";

// Append numbers and decimal point to the display
function appendToDisplay(value) {
  if (value === "." && currentInput.includes(".")) return; // Prevent multiple decimals
  if (currentInput === "0" && value !== ".") {
    currentInput = value; // Replace leading zero
  } else {
    currentInput += value;
  }
  display.textContent = currentInput;
}

// Clear the display and reset the calculator
function clearDisplay() {
  currentInput = "";
  operator = "";
  firstOperand = "";
  display.textContent = "";
}

// Calculate the result based on the current input and operator
function calculateResult() {
  if (operator === "" || currentInput === "" || firstOperand === "") return; // No operator or input

  let result;
  const secondOperand = parseFloat(currentInput);
  const firstValue = parseFloat(firstOperand);

  // Perform calculation based on the operator
  switch (operator) {
    case "+":
      result = firstValue + secondOperand;
      break;
    case "-":
      result = firstValue - secondOperand;
      break;
    case "*":
      result = firstValue * secondOperand;
      break;
    case "/":
      if (secondOperand === 0) {
        display.textContent = "Error";
        return;
      }
      result = firstValue / secondOperand;
      break;
    default:
      return;
  }

  // Update the display and reset variables
  display.textContent = result;
  currentInput = result;
  operator = "";
  firstOperand = "";
}

// Set the operator and store the current input
function setOperator(op) {
  if (currentInput === "") return; // No input to process

  if (firstOperand !== "") {
    calculateResult();
  }

  operator = op;
  firstOperand = currentInput;
  currentInput = "";
}

// Event listener for button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      clearDisplay();
    } else if (["+", "-", "*", "/"].includes(value)) {
      setOperator(value);
    } else if (value === "=") {
      calculateResult();
    } else {
      appendToDisplay(value);
    }
  });
});
