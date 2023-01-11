/* Switch button */
const themeToggleBtn = document.querySelector(".theme-toggler")
const calculator = document.querySelector(".calculator")
const toggleIcon = document.querySelector(".toggler-icon")
let isDark = true
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark")
  themeToggleBtn.classList.toggle("active")
  isDark = !isDark
}

/* Calculator */
const display = window.document.querySelector("div#display")
const numbers = window.document.querySelectorAll("[id*=key]")
const operators = window.document.querySelectorAll("[id*=Operator]")

let newNumber = true
let operator
let previousNumber

const pendingOperation = () => operator !== undefined

const calc = () => {
  if (pendingOperation()) {
    const currentNumber = parseFloat(display.textContent.replace(",", "."))
    newNumber = true
    const result = eval(`${previousNumber}${operator}${currentNumber}`)
    displayUpdate(result)
  }
}

const displayUpdate = (text) => {
  if (newNumber) {
    display.textContent = text
    newNumber = false
  } else {
    display.textContent += text
  }
}

const insertNumber = (event) => displayUpdate(event.target.textContent)
const selectOperator = (event) => {
  if (!newNumber) {
    calc()
    newNumber = true
    operator = event.target.textContent
    previousNumber = parseFloat(display.textContent.replace(",", "."))
  }
}

numbers.forEach((number) => number.addEventListener("click", insertNumber))
operators.forEach((operator) =>
  operator.addEventListener("click", selectOperator)
)

const activeEqual = () => {
  calc()
  operator = undefined
}

const cleanDisplay = () => (display.textContent = "")

const cleanCalc = () => {
  cleanDisplay()
  operator = undefined
  newNumber = true
  previousNumber = undefined
}

const removeLastData = () =>
  (display.textContent = display.textContent.slice(0, -1))

const reverseSign = () => {
  newNumber = true
  displayUpdate(display.textContent * -1)
}

const decimalExists = () => display.textContent.indexOf(",") !== -1

const existValue = () => display.textContent.length > 0

const insertDecimal = () => {
  if (!decimalExists()) {
    if (existValue()) {
      displayUpdate(".")
    } else {
      displayUpdate("0.")
    }
  }
}

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
  0: "key0",
  0: "key0",
}

const mapKeyboard = (event) => {
  const key = event.key
  const allowedKey = () => Object.keys(keyboardMap).indexOf(key) !== -1

  if (allowedKey()) document.getElementById(keyboardMap[key]).click()
}

document.addEventListener("keydown", mapKeyboard)

window.document
  .getElementById("decimal")
  .addEventListener("click", insertDecimal)
window.document.getElementById("equal").addEventListener("click", activeEqual)
window.document
  .getElementById("cleanDisplay")
  .addEventListener("click", cleanDisplay)
window.document.getElementById("cleanCalc").addEventListener("click", cleanCalc)
window.document
  .getElementById("backspace")
  .addEventListener("click", removeLastData)
window.document.getElementById("reverse").addEventListener("click", reverseSign)
