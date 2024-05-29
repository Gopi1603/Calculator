// script.js
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const history = document.getElementById('history');
    const historyBtn = document.getElementById('history-btn');
    let currentInput = '';
    let operator = null;
    let firstValue = null;
    let shouldResetDisplay = false;
    let historyArray = [];

    function updateDisplay(value) {
        display.textContent = value;
    }

    function handleNumberClick(number) {
        if (shouldResetDisplay) {
            currentInput = '';
            shouldResetDisplay = false;
        }
        if (currentInput.length < 12) {
            currentInput += number;
            updateDisplay(currentInput);
        }
    }

    function handleOperatorClick(op) {
        if (firstValue === null) {
            firstValue = parseFloat(currentInput);
        } else if (operator) {
            const result = calculate(firstValue, parseFloat(currentInput), operator);
            firstValue = result;
            updateDisplay(result);
            addToHistory(`${firstValue} ${getOperatorSymbol(operator)} ${parseFloat(currentInput)} = ${result}`);
        }
        operator = op;
        shouldResetDisplay = true;
    }

    function handleEqualsClick() {
        if (firstValue !== null && operator !== null) {
            const result = calculate(firstValue, parseFloat(currentInput), operator);
            addToHistory(`${firstValue} ${getOperatorSymbol(operator)} ${parseFloat(currentInput)} = ${result}`);
            updateDisplay(result);
            firstValue = null;
            operator = null;
            currentInput = result.toString();
            shouldResetDisplay = true;
        }
    }

    function calculate(a, b, operator) {
        switch (operator) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                return a / b;
            default:
                return b;
        }
    }

    function getOperatorSymbol(operator) {
        switch (operator) {
            case 'add':
                return '+';
            case 'subtract':
                return '-';
            case 'multiply':
                return '*';
            case 'divide':
                return '/';
            default:
                return '';
        }
    }

    function addToHistory(operation) {
        historyArray.unshift(operation);
        if (historyArray.length > 7) {
            historyArray.pop();
        }
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        history.innerHTML = historyArray.map(op => `<div>${op}</div>`).join('');
    }

    function handleClearClick() {
        currentInput = '';
        updateDisplay('0');
    }

    function handleAllClearClick() {
        currentInput = '';
        firstValue = null;
        operator = null;
        updateDisplay('0');
        historyArray = [];
        updateHistoryDisplay();
    }

    function handleDeleteClick() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
        }
    }

    function handleDecimalClick() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    }

    document.querySelector('.calculator-buttons').addEventListener('click', function (e) {
        if (e.target.matches('button')) {
            const button = e.target;
            const action = button.dataset.action;
            const number = button.dataset.number;

            if (number !== undefined) {
                handleNumberClick(number);
            } else if (action === 'clear') {
                handleClearClick();
            } else if (action === 'all-clear') {
                handleAllClearClick();
            } else if (action === 'delete') {
                handleDeleteClick();
            } else if (action === 'decimal') {
                handleDecimalClick();
            } else if (action === 'equals') {
                handleEqualsClick();
            } else {
                handleOperatorClick(action);
            }
        }
    });

    historyBtn.addEventListener('click', function () {
        history.classList.toggle('visible');
    });
});
