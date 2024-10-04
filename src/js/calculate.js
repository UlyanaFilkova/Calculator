export default function calculate(num1, operation, num2) {
  switch (operation) {
    case "+":
      return parseFloat(num1) + parseFloat(num2);
    case "-":
      return parseFloat(num1) - parseFloat(num2);
    case "*":
      return parseFloat(num1) * parseFloat(num2);
    case "/":
      return parseFloat(num1) / parseFloat(num2);
    default:
      return 0;
  }
}
