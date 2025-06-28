//first get the div of display
//now when a div is clicked, its content is written in the display div
//first and second clicked div's content is passed to the function wrt operator, if + then sum() etc
//the sum is returned and stored in the final output but not printed, bcz more operands and number can be inputted
//when = button is clicked , computed sum is generated and previous content on display div is overriden

const display = document.getElementById('display');
const operators = ['+', '-', '*', '/', '='];
function isOperator(char) {
  return operators.includes(char);
}

function writeOnDisplay(number) {
    const currentText = display.textContent;
    const lastChar = currentText.slice(-1); 

    if (isOperator(lastChar) && isOperator(number)) {
        console.error("Error: Cannot use two operators consecutively!");
        return;
    }
    if (currentText === "" && isOperator(number)) {
        console.error("Error: Cannot start with an operator!");
        return;
    }
    if (lastChar=='.' && number=='.') {
        console.error("Can't Put Two Decimals Together");
        return;
    }
    if (currentText === "" && number=='.') {
        console.error("Error: Cannot start with a Decimal!");
        return;
    }
    if ((lastChar=='.' && isOperator(number)) || (isOperator(lastChar) && number=='.')) {
        console.error("Cant Put Operator with Decimal");
        return;
    }

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

// let currentIndex=0;
// function getOperand() {
//     let integerToReturn;
//     for(let i=0; i<display.length(); i++) {
//         currentIndex++;
//         if(display[i]==document.querySelectorAll('buttons')) {
//             return integerToReturn;
//         }
//         integerToReturn += display[i];
//     }
// }