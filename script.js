const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.oper');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.ac');
const deleteButton = document.querySelector('.del');
const decimalButton = document.querySelector('.dot');
const expButton = document.querySelector('.exp'); // Selecting exponentiation button
const modButton = document.querySelector('.mod'); // Selecting modulo button

let firstOperand = '';
let secondOperand = '';
let operator = '';
let shouldResetScreen = false;

// Append number to display
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else {
        display.textContent += number;
    }
}

// Operator selection
operatorButtons.forEach(button => {
    button.addEventListener('click', () => selectOperator(button.textContent));
});

function selectOperator(op) {
    if (operator !== '') evaluate();
    firstOperand = display.textContent;
    operator = op;
    shouldResetScreen = true;
}

// Evaluate result when '=' is clicked
equalButton.addEventListener('click', evaluate);

function evaluate() {
    if (operator === '' || shouldResetScreen) return;
    secondOperand = display.textContent;
    display.textContent = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
    operator = '';
}

// Handle exponentiation (Xⁿ button)
expButton.addEventListener('click', () => selectOperator('^'));

// Handle modulo (% button)
modButton.addEventListener('click', () => selectOperator('%'));

// Clear everything
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
});

// Delete last character
deleteButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1) || '0';
});

// Prevent multiple decimals
decimalButton.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
});

// Operation function
function operate(x, y, op) {
    switch (op) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case 'x': // Fixing multiplication symbol
        case '*':
            return x * y;
        case '/':
            return y === 0 ? 'Error' : x / y;
        case '%': // Fixing modulo operation
            return x % y;
        case '^': // Fixing exponentiation
            return Math.pow(x, y);
        default:
            return y;
    }
}
