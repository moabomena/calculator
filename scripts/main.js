let x = "0";
let y = "0";
let operator = "";
let listX = [];
let listY = [];
let historic = "";
let isNewOperation = false;

function setHistoric() {
  historic = x;
  historic += " " + operator + " ";
  if (y != "0") {
    historic += y;
  }

  showNumberHistoric(historic);
}

function updateList(list, number) {
  if (list.length != 0) {
    list.length = 0;
    list = [...number];
  }
}

function sum() {
  return Number(x) + Number(y);
}

function subtraction() {
  return Number(x) - Number(y);
}

function division() {
  return Number(x) / Number(y);
}

function multiplication() {
  return Number(x) * Number(y);
}

function getNumber(number) {
  if (isNewOperation) {
    clean();
  }
  if (operator === "") {
    if (x === "0") {
      x = number;
    } else {
      x += number;
    }
    showNumberView(x);
    updateList(listX, x);
  } else {
    if (y === "0") {
      y = number;
    } else {
      y += number;
    }
    showNumberView(y);
    updateList(listY, y);
  }
  setHistoric();
  isNewOperation = false;
}

function showNumberView(number) {
  const elementSum = document.getElementById("view-result");
  elementSum.textContent = number;
}

function showNumberHistoric(number) {
  const elementHistoric = document.getElementById("historic");
  elementHistoric.textContent = number;
}

function getOperator(operatorValue) {
  operator = operatorValue;
  setHistoric();
}

function clean() {
  x = "0";
  y = "0";
  operator = "";
  showNumberView("0");
  showNumberHistoric(" ");
}

function result() {
  let result = 0;
  switch (operator) {
    case "+":
      result = sum();
      break;
    case "-":
      result = subtraction();
      break;
    case "/":
      result = division();
      break;
    case "x":
      result = multiplication();
      break;
    default:
      break;
  }
  setHistoric();
  const elementSum = document.getElementById("view-result");
  elementSum.textContent = result;
  isNewOperation = true;
}

function backNumber(list, number) {
  if (list.length === 0) {
    if (number != "0") {
      list = [...number];
    }
  }

  if (list.length != 0) {
    list.pop();
    number = list.join("");
    const updateNumber = document.getElementById("view-result");
    updateNumber.textContent = number;
  } else {
    clean();
  }
  return list;
}

function updateNumbers() {
  x = listX.join("");
  y = listY.join("");
}

function backspace() {
  listX = backNumber(listX, x);
  listY = backNumber(listY, y);
  updateNumbers();
}
