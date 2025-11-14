// Calculator state
let currentValue = 0;
let previousValue = null;
let operator = null;
let waitingForNewValue = false;

// Roman numeral conversion functions
function arabicToRoman(num) {
    if (num === 0) return 'NULLA';
    if (num < 0) return '-' + arabicToRoman(Math.abs(num));
    if (num > 3999) return num.toString(); // Too large for standard Roman numerals

    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = '';
    let remaining = Math.floor(num);

    for (let i = 0; i < romanNumerals.length; i++) {
        while (remaining >= romanNumerals[i].value) {
            result += romanNumerals[i].numeral;
            remaining -= romanNumerals[i].value;
        }
    }

    return result;
}

function romanToArabic(roman) {
    if (roman === 'NULLA') return 0;

    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let result = 0;

    for (let i = 0; i < roman.length; i++) {
        const current = romanValues[roman[i]];
        const next = romanValues[roman[i + 1]];

        if (next && current < next) {
            result -= current;
        } else {
            result += current;
        }
    }

    return result;
}

// Display functions
function updateDisplay() {
    const arabicDisplay = document.getElementById('arabicDisplay');
    const romanDisplay = document.getElementById('romanDisplay');

    // Handle decimal numbers
    if (!Number.isInteger(currentValue)) {
        arabicDisplay.textContent = currentValue.toFixed(2);
        romanDisplay.textContent = 'DECIMALIS';
    } else {
        arabicDisplay.textContent = currentValue;
        romanDisplay.textContent = arabicToRoman(currentValue);
    }
}

// Calculator operations
function appendNumber(num) {
    const numValue = parseInt(num);

    if (waitingForNewValue) {
        currentValue = numValue;
        waitingForNewValue = false;
    } else {
        currentValue = currentValue * 10 + numValue;
    }

    updateDisplay();
}

function setOperator(op) {
    if (previousValue !== null && operator !== null && !waitingForNewValue) {
        calculate();
    }

    previousValue = currentValue;
    operator = op;
    waitingForNewValue = true;
}

function calculate() {
    if (previousValue === null || operator === null) {
        return;
    }

    let result;

    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '×':
            result = previousValue * currentValue;
            break;
        case '÷':
            if (currentValue === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = previousValue / currentValue;
            break;
        default:
            return;
    }

    currentValue = result;
    previousValue = null;
    operator = null;
    waitingForNewValue = true;

    updateDisplay();
}

function clearDisplay() {
    currentValue = 0;
    previousValue = null;
    operator = null;
    waitingForNewValue = false;
    updateDisplay();
}

function deleteLast() {
    if (waitingForNewValue) {
        return;
    }

    currentValue = Math.floor(currentValue / 10);
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-') {
        setOperator(key);
    } else if (key === '*') {
        setOperator('×');
    } else if (key === '/') {
        event.preventDefault();
        setOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Initialize display
updateDisplay();
