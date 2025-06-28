const display = document.getElementById('display');
const operators = ['+', '-', '*', '/', '='];
let currentInput = '';
let storedValue = null;
let currentOperator = null;

function isOperator(char) {
  return operators.includes(char);
}
function errorExists(currentText, lastChar, number) {
    if (isOperator(lastChar) && isOperator(number)) {
        console.error("Error: Cannot use two operators consecutively!");
        return true;
    }
    if (currentText === "" && isOperator(number)) {
        console.error("Error: Cannot start with an operator!");
        return true;
    }
    if (lastChar=='.' && number=='.') {
        console.error("Can't Put Two Decimals Together");
        return true;
    }
    if (currentText === "" && number=='.') {
        console.error("Error: Cannot start with a Decimal!");
        return true;
    }
    if ((lastChar=='.' && isOperator(number)) || (isOperator(lastChar) && number=='.')) {
        console.error("Cant Put Operator with Decimal");
        return true;
    }
    return false;
}

function writeOnDisplay(input) {
    const currentText = display.textContent;
    const lastChar = currentText.slice(-1); 
    if (errorExists(currentText, lastChar, input)) return;

    if (isOperator(input)) {
        if (currentInput === '') return; // Avoid triggering if there's no number
        handleCalculations(input);
        display.textContent += input;
        currentInput = ''; // Prepare for next number
    } else {
        currentInput += input;
        display.textContent += input;
    }
}

function handleCalculations(operator) {
    const parsedNumber = parseFloat(currentInput);
    if (isNaN(parsedNumber)) return;

    if (storedValue === null) {
        storedValue = parsedNumber;
    } else if (currentOperator !== null) {
        storedValue = calculate(storedValue, currentOperator, parsedNumber);
    }

    if (operator === '=') {
        display.textContent = storedValue.toString();
        resetCalculator(); 
    } else {
        currentOperator = operator;
    }
}

function calculate(a, operator, b) {
    switch(operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : NaN;
      default:  return b;
    }
}

function eraseElement() {
    display.textContent = display.textContent.slice(0,-1);
    currentInput = currentInput.slice(0, -1);
}
function resetCalculator() {
    currentInput = '';
    storedValue = null;
    currentOperator = null;
}
function clearDisplay() {
    display.textContent = ''; 
    resetCalculator();      
}

document.addEventListener('keydown', handleKeyboardInput);
function handleKeyboardInput(event) {
    const key = event.key;

    if (!isNaN(key)) {
        // It's a number (0–9)
        writeOnDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        writeOnDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Avoid default behavior
        handleCalculations('=');
    } else if (key === 'Backspace') {
        eraseElement();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '.') {
        writeOnDisplay('.');
    } else {
        console.warn(`Unsupported key pressed: ${key}`);
    }
}
