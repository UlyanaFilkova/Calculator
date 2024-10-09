// максимальное число символов
const MAX_LENGTH = 16;
const MAX_LENGTH_AFTER_DECIMAL_POINT = 10;

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

export {
  MAX_LENGTH,
  MAX_LENGTH_AFTER_DECIMAL_POINT,
  stringToFloat,
  floatToString,
  formatFloat,
};
