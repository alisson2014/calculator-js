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
    const currentNumber = parseFloat(display.textContent)
    newNumber = true
    if (operator == "+") {
      displayUpdate(previousNumber + currentNumber)
    } else if (operator == "-") {
      displayUpdate(previousNumber - currentNumber)
    } else if (operator == "*") {
      displayUpdate(previousNumber * currentNumber)
    } else if (operator == "/") {
      displayUpdate(previousNumber / currentNumber)
    }
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
    previousNumber = parseFloat(display.textContent)
  }
}

numbers.forEach((number) => number.addEventListener("click", insertNumber))
operators.forEach((operator) =>
  operator.addEventListener("click", selectOperator)
)
