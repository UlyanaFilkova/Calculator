export default function calculate(num1, operation, num2) {
  result = 0;
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
  // используем toFixed() и replace(), чтобы разобраться с проблемой арифметики чисел с плавающей точкой
  // оставим 10 знаков после запятой, всё что дальше за ними - округлим
  // с помощью /0+$/ убираем нули после запятой, если за ними ничего не следует
  // а затем с помощью /\.$/ убираем саму запятую, если за ней ничего не следует
  return result.toFixed(10).replace(/0+$/, "").replace(/\.$/, "");
}
