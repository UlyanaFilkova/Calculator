import "../css/default.css";
import "../css/style.css";

import {
  MAX_LENGTH,
  MAX_LENGTH_AFTER_DECIMAL_POINT,
  stringToFloat,
  floatToString,
  formatFloat,
} from "./utils";

const resultWindow = document.querySelector(".grid__result-window");
const buttons = document.querySelectorAll(
  ".grid__func-btn, .grid__arithm-btn, .grid__number-btn",
);

const calculator = {
  currentNumber: "",
  previousNumber: "",
  operation: "",
};

function handleButtonPress(event) {
  const button = event.target;
  const buttonType = button.dataset.operation || button.dataset.number;

  switch (buttonType) {
    case "clear":
      clearCalculator();
      break;
    case "sign-change":
      changeSign();
      break;
    case "percent":
      calculatePercent();
      break;
    case "=":
      calculateResult();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleOperationButton(buttonType);
      break;
    default:
      handleNumberButton(buttonType);
      break;
  }
}

function clearCalculator() {
  calculator.currentNumber = "";
  calculator.previousNumber = "";
  calculator.operation = "";
  resultWindow.textContent = "0";
}

function changeSign() {
  calculator.currentNumber = calculator.currentNumber.startsWith("-")
    ? calculator.currentNumber.slice(1)
    : "-" + calculator.currentNumber;
  resultWindow.textContent = calculator.currentNumber;
}

function calculatePercent() {
  calculator.currentNumber = floatToString(
    formatFloat(stringToFloat(calculator.currentNumber) * 0.01),
  );
  resultWindow.textContent = calculator.currentNumber;
}

function calculateResult() {
  if (
    calculator.operation &&
    calculator.previousNumber &&
    calculator.currentNumber
  ) {
    const result = calculate(
      stringToFloat(calculator.previousNumber),
      calculator.operation,
      stringToFloat(calculator.currentNumber),
    );
    resultWindow.textContent = floatToString(result);
    calculator.currentNumber = floatToString(result);
    calculator.previousNumber = "";
    calculator.operation = "";
  }
}

function calculate(num1, operation, num2) {
  let result = 0;
  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      return 0;
  }

  return formatFloat(result);
}

function handleOperationButton(buttonType) {
  calculator.operation = buttonType;
  calculator.previousNumber = calculator.currentNumber;
  calculator.currentNumber = "";
}

function handleNumberButton(buttonType) {
  if (calculator.currentNumber.length >= MAX_LENGTH) {
    return;
  }

  if (buttonType === "," && calculator.currentNumber.includes(",")) {
    // нельзя дважды вводить запятую
    return;
  }
  if (calculator.currentNumber === "-0" && buttonType != ",") {
    // число не может начинаться с 0, если за ним не следует запятая. Оставим только минус
    calculator.currentNumber = "-";
  }

  if (calculator.currentNumber === "0") {
    calculator.currentNumber = buttonType;
  } else {
    calculator.currentNumber += buttonType;
  }
  if (calculator.currentNumber === ",") {
    // если была введена только запятая, добавим перед ней 0
    calculator.currentNumber = "0,";
  }

  resultWindow.textContent = calculator.currentNumber;
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonPress);
});

const changeThemeButton = document.getElementById("change-theme-btn");
changeThemeButton.onclick = (e) => {
  e.preventDefault();
  const body = document.getElementsByTagName("body")[0];
  body.classList.toggle("dark_mode");
  changeThemeButton.classList.toggle("change-theme-btn_dark");
};
