/* Calculator */
const display = window.document.querySelector("div#display");
const numbers = window.document.querySelectorAll("[id*=key]");
const operators = window.document.querySelectorAll("[id*=Operator]");

let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator !== undefined;

//Calculo realizado se houver operação pendente
const calc = () => {
  if (pendingOperation()) {
    const currentNumber = parseFloat(display.textContent.replace(",", "."));
    newNumber = true;
    const result = eval(`${previousNumber}${operator}${currentNumber}`);
    displayUpdate(result.toFixed(3));
  }
}

//Atualizar o display quando adicionar numeros
const displayUpdate = (text) => {
  if (newNumber) {
    display.textContent = text;
    newNumber = false;
  } else {
    display.textContent += text;
  }
}

//inserir numero quando o display receber um novo numero
const insertNumber = (event) => displayUpdate(event.target.textContent);
const selectOperator = (event) => {
  //Se for adicionao um novo numero execute o calculo
  if (!newNumber) {
    calc();
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = parseFloat(display.textContent.replace(",", "."));
  }
}

//forEach para pegar vários dados
numbers.forEach((number) => number.addEventListener("click", insertNumber));
operators.forEach((operator) =>
  operator.addEventListener("click", selectOperator)
);

//execute o calculo quando clicado em igual
const activeEqual = () => {
  calc();
  operator = undefined;
};

//Limpar display
const cleanDisplay = () => (display.textContent = "");

//Limpar calculo (limpa o display e os dados ja inseridos)
const cleanCalc = () => {
  cleanDisplay();
  operator = undefined;
  newNumber = true;
  previousNumber = undefined;
}

//Remove o ultimo dado (backspace)
const removeLastData = () =>
  (display.textContent = display.textContent.slice(0, -1));

//Reverte o sinal da operação
const reverseSign = () => {
  newNumber = true
  displayUpdate(display.textContent * -1)
};

//Verifica se existe um numero decimal no display
const decimalExists = () => display.textContent.indexOf(",") !== -1;

//Verifica se existe um valor no display
const existValue = () => display.textContent.length > 0;

//Verifica se não existe um decimal
const insertDecimal = () => {
  if (!decimalExists()) {
    if (existValue()) {
      displayUpdate(".")
    } else {
      displayUpdate("0.")
    }
  }
};

//Objeto com o mapa do teclado
const keyboardMap = {
  0: "key0",
  1: "key1",
  2: "key2",
  3: "key3",
  4: "key4",
  5: "key5",
  6: "key6",
  7: "key7",
  8: "key8",
  9: "key9",
  "/": "divisionOperator",
  "*": "multiplicationOperator",
  "-": "subtractionOperator",
  "+": "addOperator",
  "=": "equal",
  Enter: "equal",
  Backspace: "backspace",
  c: "cleanDisplay",
  Escape: "cleanCalc",
  ",": "decimal",
};

//Mapeamento para o teclado funcionar simultaneamente aos clicks
const mapKeyboard = (event) => {
  const key = event.key
  const allowedKey = () => Object.keys(keyboardMap).indexOf(key) !== -1
  if (allowedKey()) document.getElementById(keyboardMap[key]).click()
};

//Adicionando eventos ao teclado (keydown)
document.addEventListener("keydown", mapKeyboard);

//adicionando eventos a DOM
document.getElementById("decimal").addEventListener("click", insertDecimal);
document.getElementById("equal").addEventListener("click", activeEqual);
document.getElementById("cleanDisplay").addEventListener("click", cleanDisplay);
document.getElementById("cleanCalc").addEventListener("click", cleanCalc);
document.getElementById("backspace").addEventListener("click", removeLastData);
document.getElementById("reverse").addEventListener("click", reverseSign);
