const resultWindow = document.querySelector(".grid__result-window");
const buttons = document.querySelectorAll(
  ".grid__func-btn, .grid__arithm-btn, .grid__number-btn"
);

// максимальное число символов
const MAX_LENGTH = 16;
const MAX_LENGTH_AFTER_DECIMAL_POINT = 10;

const calculator = {
  currentNumber: "",
  previousNumber: "",
  operation: "",
};

// функции для форматирования ввода и вывода
function stringToFloat(str) {
  return parseFloat(str.replace(",", "."));
}

function floatToString(num) {
  if (num === "NaN" || num === "Infinity") return "0";
  return num.toString().replace(".", ",");
}

// используем toFixed() и replace(), чтобы разобраться с проблемой арифметики чисел с плавающей точкой
// оставим 10 знаков после запятой, всё что дальше за ними - округлим
// с помощью /0+$/ убираем нули после запятой, если за ними ничего не следует
// а затем с помощью /\.$/ убираем саму запятую, если за ней ничего не следует
function formatFloat(num) {
  return num
    .toFixed(MAX_LENGTH_AFTER_DECIMAL_POINT)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

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
    formatFloat(stringToFloat(calculator.currentNumber) * 0.01)
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
      stringToFloat(calculator.currentNumber)
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
    return;
  }
  if (calculator.currentNumber === "0") {
    calculator.currentNumber = buttonType;
  } else {
    calculator.currentNumber += buttonType;
  }
  if (calculator.currentNumber === ",") {
    calculator.currentNumber = "0,";
  }
  resultWindow.textContent = calculator.currentNumber;
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonPress);
});
