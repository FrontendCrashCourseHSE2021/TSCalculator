import "./app-thirdparty";
import "../styles/calculator.less";

$(function () {
    enum OperationType {
        PLUS,
        MINUS,
        MULTIPLY,
        DIVIDE
    }

    let currentOperationType: OperationType = null;

    let currentElement = document.getElementById("current");

    let resultElement = document.getElementById("result");

    let currentNumber: string = "";

    let resultNumber: number = null;

    function onNumberClicked(pressedNumber: string) {
        currentNumber = currentNumber + pressedNumber;

        currentElement.innerText = currentNumber;
    }

    let allNumberButtons = document.getElementsByClassName("btn-number");

    for (let i = 0; i < allNumberButtons.length; i++) {
        let numberButton = allNumberButtons[i] as HTMLButtonElement;

        numberButton.onclick = function (event) {
            let btn = event.target as HTMLButtonElement;

            let numberString = btn.innerText;

            onNumberClicked(numberString);
        }
    }

    let plusButton = document.getElementById("plus");
    let minusButton = document.getElementById("minus");
    let multiplyButton = document.getElementById("multiply");
    let divideButton = document.getElementById("divide");
    let solveButton = document.getElementById("solve");

    function displayResult() {
/*        currentElement.innerText = currentNumber == "" ? "0" : currentNumber; */
        if (currentNumber == "") {
            currentElement.innerText = "0";
        } else {
            currentElement.innerText = currentNumber;
        }

        if (resultNumber == null) {
            resultElement.innerText = "0";
        } else {
            resultElement.innerText = "" + resultNumber;
        }
    }

    function onSignClick(operationType: OperationType) {
        currentOperationType = operationType;

        if (currentNumber == "") {
            return;
        }


        if (resultNumber == null) {
            resultNumber = +currentNumber;

            currentNumber = "";

            displayResult();
        } else {
            solve();
        }
    }

    plusButton.onclick = function () {
        onSignClick(OperationType.PLUS);
    };

    minusButton.onclick = function () {
        onSignClick(OperationType.MINUS);
    };

    multiplyButton.onclick = function () {
        onSignClick(OperationType.MULTIPLY);
    };

    divideButton.onclick = function () {
        onSignClick(OperationType.DIVIDE);
    };

    function solve() {
        let curNumber: number = +currentNumber;

        switch (currentOperationType) {
            case OperationType.PLUS:
                resultNumber = curNumber + resultNumber;
                break;
            case OperationType.MINUS:
                resultNumber = resultNumber - curNumber;
                break;
            case OperationType.MULTIPLY:
                resultNumber = resultNumber * curNumber;
                break;
            case OperationType.DIVIDE:
                resultNumber = resultNumber / curNumber;
                break;
        }

        currentNumber = "";

        displayResult();
    }

    solveButton.onclick = solve;

    let acButton = document.getElementById("ac");

    acButton.onclick = function () {
        currentOperationType = null;
        resultNumber = null;
        currentNumber = "";

        displayResult();
    }


});
