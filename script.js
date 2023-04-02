"use strict"

let prevNumber = ''
let calculationOperator = ''
let currentNumber = '0'
let resultNumber = ''

const calculatorScreen = document.querySelector(".calculator-screen")

const numbers = document.querySelectorAll(".number")

const operators = document.querySelectorAll('.operator')

const equalSign = document.querySelector('.equal-sign')

const clearBtn = document.querySelector('.all-clear')

const decimal = document.querySelector('.decimal')

const percentage = document.querySelector('.percentage')

const updateScreen = (number) => {
    calculatorScreen.value = number
};

const inputNumber = (number) => {
    if (resultNumber !== '') {
        currentNumber = number
        resultNumber = ''
    } else if (currentNumber === '0' || currentNumber === 0) {
        currentNumber = number
    } else {
        currentNumber += number
    }
};

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = ''
}

const calculate = () => {
    let result = ''
    switch(calculationOperator) {
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case '-':
            result = prevNumber - currentNumber
            break
        case '*':
            result = prevNumber * currentNumber
            break
        case '/':
            result = prevNumber / currentNumber
            break
        default:
            return
    }
    currentNumber = result
    resultNumber = String(result)
    calculationOperator = ''
}

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';
}

const inputDecimal = (dot) => {
    if (resultNumber !== '') {
        currentNumber = '0.'
        resultNumber = ''
    }
    if (currentNumber.includes('.')) {
        return
    }
    if (currentNumber === '') {
        currentNumber = '0'
    }
    currentNumber += dot
}

const doPercentage = () => {
    let result = ''
    result = currentNumber / 100
    currentNumber = result
    currentNumber = currentNumber.toString()
}

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        inputOperator(event.target.value)
    })
})

equalSign.addEventListener('click', () => {
    calculate()
    if (resultNumber !== '') {
        updateScreen(resultNumber)
    }
})

clearBtn.addEventListener('click', () => {
    clearAll()
    updateScreen(currentNumber)
})

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

percentage.addEventListener('click', () => {
    doPercentage()
    updateScreen(currentNumber)
})