let x = "0";
let y = "0";
let operator = "";
let listX = [];
let listY = [];
let historic = "";
let isNewOperation = false;
let historicList = [];
let ponto = "";

const list = document.getElementById("list-historic");
const updateNumber = document.getElementById("view-result");
const elementHistoric = document.getElementById("historic");
const btClean = document.getElementById("clean");
const btnPonto = document.getElementById("btn-ponto");

btnPonto.addEventListener("click", getPonto);

function getPonto() {
  ponto = btnPonto.innerText;
  if (!x.includes(ponto) && y === "0") {
    x += ponto;
    showNumberView(x);
  } else if (!y.includes(ponto) && x != "0" && operator.length > 0) {
    y += ponto;
    showNumberView(y);
  }
}

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
  updateNumber.textContent = number;
}

function showNumberHistoric(number) {
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
  if (operator.length > 0 && y != "0") {
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
    showNumberHistoric(historic + " =");
    if (result % 1 !== 0) {
      updateNumber.textContent = result.toFixed(3);
    } else {
      updateNumber.textContent = result.toFixed(0);
    }
    isNewOperation = true;
    let calcItem = calcItemHistoric(result.toFixed(3));
    let hasOnList = findElementInList(calcItem);
    if (!hasOnList) {
      addListHistoric(calcItem);
    }
  }
}

function findElementInList(element) {
  return historicList.includes(element);
}

function backNumber(number) {
  let list = [];
  if (number != "0") {
    list = [...number];
  }

  if (list.length > 0) {
    list.pop();
    number = list.join("");
    updateNumber.textContent = number;
    if (list.length === 0) {
      clean();
    }
  }
  return list;
}

function backspace() {
  if (operator.length === 0) {
    listX = backNumber(x);
    x = listX.join("");
  } else {
    listY = backNumber(y);
    y = listY.join("");
  }
  setHistoric();
}

function calcItemHistoric(result) {
  return historic + " = " + result;
}

function addListHistoric(calculu) {
  historicList.push(calculu);
  loadHistoricList();
  changeColorButtonCleanList();
}

function changeColorButtonCleanList() {
  if (historicList.length > 0) {
    btClean.style.display = "flex";
    btClean.style.backgroundColor = "#28a85d";
  } else {
    btClean.style.display = "none";
  }
}

function loadHistoricList() {
  list.innerHTML = historicList
    .map((calc) => `<li>${calc}</li>`)
    .reverse()
    .join("");
}

function cleanListHistoric() {
  if (historicList.length > 0) {
    historicList.length = 0;
    loadHistoricList();
    changeColorButtonCleanList();
  }
}
