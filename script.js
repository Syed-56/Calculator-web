const display = document.getElementById('display');
const operators = ['+', '-', '*', '/', '='];
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

function writeOnDisplay(number) {
    const currentText = display.textContent;
    const lastChar = currentText.slice(-1); 
    if(errorExists(currentText, lastChar, number)) return;

    display.textContent += number;
}
function eraseElement() {
    display.textContent = display.textContent.slice(0,-1);
}
function clearDisplay() {
    display.textContent = "";
}
function addEqualTo() {
    display.textContent += "=";
    clearDisplay();
}

//now we have the display variable, first start from beginning and store integer/float until an operator comes, that integer/opreator is stored in a variable and now after that operator, we begin iterating again and store next integer/float until another operator comes or the variable ends. wrt operator written, call the function (if + then sum() etc)