import calculate from "./calculate.js";

const resultWindow = document.querySelector(".grid__result-window");
const buttons = document.querySelectorAll(
  ".grid__func-btn, .grid__arithm-btn, .grid__number-btn"
);

let currentNumber = "";
let previousNumber = "";
let operation = "";

function stringToFloat(num) {
  return num.replace(",", ".");
}

function floatToString(num) {
  return num.replace(".", ",");
}

function handleButtonPress(event) {
  const button = event.target;
  const buttonType = button.dataset.operation || button.dataset.number;

  switch (buttonType) {
    case "clear":
      // Очищаем результат и переменные
      resultWindow.textContent = "0";
      currentNumber = "";
      previousNumber = "";
      operation = "";
      break;
    case "sign-change":
      // Меняем знак текущего числа
      currentNumber = currentNumber.startsWith("-")
        ? currentNumber.slice(1)
        : "-" + currentNumber;
      resultWindow.textContent = currentNumber;
      break;
    case "percent":
      // Выполняем операцию процента
      currentNumber = (parseFloat(currentNumber) / 100.0).toString();
      resultWindow.textContent = currentNumber;
      break;
    case "=":
      // Выполняем арифметическую операцию
      if (operation && previousNumber) {
        const result = calculate(
          stringToFloat(previousNumber),
          operation,
          stringToFloat(currentNumber)
        );
        resultWindow.textContent = floatToString(result.toString());
        currentNumber = floatToString(result.toString());
        previousNumber = "";
        operation = "";
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      // Запоминаем операцию и текущее число
      operation = buttonType;
      previousNumber = currentNumber;
      currentNumber = "";
      break;
    case ",":
      //   resultWindow.textContent += ",";
      currentNumber += ",";
      resultWindow.textContent = currentNumber;
      break;
    default:
      // Добавляем цифру к текущему числу
      currentNumber += buttonType;
      resultWindow.textContent = currentNumber;
      break;
  }
}

// // Функция для выполнения арифметических операций
// function calculate(num1, operation, num2) {
//   switch (operation) {
//     case "+":
//       return parseFloat(num1) + parseFloat(num2);
//     case "-":
//       return parseFloat(num1) - parseFloat(num2);
//     case "*":
//       return parseFloat(num1) * parseFloat(num2);
//     case "/":
//       return parseFloat(num1) / parseFloat(num2);
//     default:
//       return 0;
//   }
// }

// Добавляем обработчик нажатий кнопок
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonPress);
});
