document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("main-num");
    const numberButtons = document.querySelectorAll(".number-btns button");
    const operatorButtons = document.querySelectorAll(".operators button");
    const acButton = document.getElementById("operation-clear");
    const cButton = document.getElementById("display-clear");
    let firstOperand = ""; // Stores the first operand
    let operator = ""; // Stores the operator
    let startNewOperand = false; // Flag to indicate when to start a new operand

    // Loop through each number button and attach event listener
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            const number = button.innerText;

            // Concatenate the number to the display
            if (startNewOperand || display.innerText === "0") {
                display.innerText = number;
                startNewOperand = false; // Reset the flag
            } else {
                display.innerText += number;
            }
        });
    });

    // Add event listener for the decimal point button
    document.querySelector('.number-btns button:nth-child(11)').addEventListener('click', function() {
        // Check if the current number already contains a decimal point
        if (!display.innerText.includes('.')) {
            display.innerText += '.';
        }
    });

    // Loop through each operator button and attach event listener
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            const clickedOperator = button.innerText;

            if (firstOperand !== "") {
                const result = evaluateExpression(parseFloat(firstOperand), parseFloat(display.innerText), operator);
                display.innerText = result;
                firstOperand = result; // Update firstOperand with the result
            } else {
                firstOperand = display.innerText;
            }

            operator = clickedOperator; // Update the operator
            startNewOperand = true; // Set the flag to start a new operand
        });
    });

    // Add event listener to the AC button
    acButton.addEventListener("click", () => {
        display.innerText = "0";
        firstOperand = "";
        operator = "";
        startNewOperand = false; // Reset the flag
    });

    // Add event listener to the C button
    cButton.addEventListener("click", () => {
        display.innerText = "0";
    });

    // Function to evaluate the expression based on the operator
    function evaluateExpression(operand1, operand2, operator) {
        switch (operator) {
            case "+":
                return operand1 + operand2;
            case "-":
                return operand1 - operand2;
            case "x":
                return operand1 * operand2;
            case "÷":
                return operand1 / operand2;
            default:
                return "Error";
        }
    }
});
