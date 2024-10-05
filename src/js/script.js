const resultWindow = document.querySelector(".grid__result-window");
const buttons = document.querySelectorAll(
  ".grid__func-btn, .grid__arithm-btn, .grid__number-btn"
);

const calculator = {
  currentNumber: "",
  previousNumber: "",
  operation: "",
};

function formatFloat(num, format) {
  if (format === "float") {
    return num.replace(",", ".");
  } else {
    return num.replace(".", ",");
  }
}

// используем toFixed() и replace(), чтобы разобраться с проблемой арифметики чисел с плавающей точкой
// оставим 10 знаков после запятой, всё что дальше за ними - округлим
// с помощью /0+$/ убираем нули после запятой, если за ними ничего не следует
// а затем с помощью /\.$/ убираем саму запятую, если за ней ничего не следует
function formatNumber(num) {
  return num.toFixed(10).replace(/0+$/, "").replace(/\.$/, "");
}

function calculate(num1, operation, num2) {
  let result = 0;
  switch (operation) {
    case "+":
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case "-":
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case "*":
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case "/":
      result = parseFloat(num1) / parseFloat(num2);
      break;
    default:
      return 0;
  }

  return formatNumber(result);
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
  calculator.currentNumber = (
    parseFloat(calculator.currentNumber) * 0.01
  ).toString();
  resultWindow.textContent = calculator.currentNumber;
}

function calculateResult() {
  if (calculator.operation && calculator.previousNumber) {
    const result = calculate(
      formatFloat(calculator.previousNumber, "float"),
      calculator.operation,
      formatFloat(calculator.currentNumber, "float")
    );
    resultWindow.textContent = formatFloat(result.toString(), "string");
    calculator.currentNumber = formatFloat(result.toString(), "string");
    calculator.previousNumber = "";
    calculator.operation = "";
  }
}

function handleOperationButton(buttonType) {
  calculator.operation = buttonType;
  calculator.previousNumber = calculator.currentNumber;
  calculator.currentNumber = "";
}

function handleNumberButton(buttonType) {
  calculator.currentNumber += buttonType;
  resultWindow.textContent = calculator.currentNumber;
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonPress);
});
