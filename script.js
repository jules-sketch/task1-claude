// Calculator state
let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

// DOM elements
const displayArabic = document.getElementById('displayArabic');
const displayRoman = document.getElementById('displayRoman');

// Roman numeral conversion functions
function arabicToRoman(num) {
    if (num === 0) return 'NULLA';
    if (num < 0) return '-' + arabicToRoman(Math.abs(num));
    if (num > 3999) return 'TOO LARGE';

    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let result = '';
    let remaining = num;

    for (let i = 0; i < romanNumerals.length; i++) {
        while (remaining >= romanNumerals[i].value) {
            result += romanNumerals[i].symbol;
            remaining -= romanNumerals[i].value;
        }
    }

    return result;
}

function romanToArabic(roman) {
    if (roman === 'NULLA') return 0;

    const romanMap = {
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
        const current = romanMap[roman[i]];
        const next = romanMap[roman[i + 1]];

        if (next && current < next) {
            result -= current;
        } else {
            result += current;
        }
    }

    return result;
}

// Update display
function updateDisplay() {
    const numValue = parseFloat(currentValue);
    const intValue = Math.round(numValue);

    displayArabic.textContent = currentValue;

    // Only convert to Roman if it's a valid integer
    if (Number.isInteger(numValue) && numValue >= -3999 && numValue <= 3999) {
        displayRoman.textContent = arabicToRoman(intValue);
    } else if (numValue > 3999) {
        displayRoman.textContent = 'TOO LARGE';
    } else if (numValue < -3999) {
        displayRoman.textContent = 'TOO SMALL';
    } else {
        displayRoman.textContent = arabicToRoman(intValue) + ' (~)';
    }
}

// Calculator operations
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0') {
            currentValue = num;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteDigit() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || previousValue === null) {
        return;
    }

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    if (Number.isInteger(result)) {
        currentValue = result.toString();
    } else {
        currentValue = result.toFixed(2).toString();
    }

    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        deleteDigit();
    }
});

// Initialize display
updateDisplay();
