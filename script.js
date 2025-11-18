// Buddie - Roman Numeral Calculator JavaScript

// Counter state
let counterValue = 1;

// Roman numeral conversion maps
const romanToDecimalMap = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};

/**
 * Converts a Roman numeral string to a decimal number
 * @param {string} roman - Roman numeral string
 * @returns {number} - Decimal number
 */
function romanToDecimal(roman) {
    if (!roman || roman.trim() === '') {
        return 0;
    }

    // Convert to uppercase and remove spaces
    roman = roman.toUpperCase().trim();

    // Validate Roman numeral
    if (!/^[IVXLCDM]+$/.test(roman)) {
        return null;
    }

    let decimal = 0;
    let prevValue = 0;

    // Iterate from right to left
    for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanToDecimalMap[roman[i]];

        if (currentValue < prevValue) {
            decimal -= currentValue;
        } else {
            decimal += currentValue;
        }

        prevValue = currentValue;
    }

    return decimal;
}

/**
 * Converts a decimal number to a Roman numeral string
 * @param {number} num - Decimal number (1-3999)
 * @returns {string} - Roman numeral string
 */
function decimalToRoman(num) {
    if (num < 1 || num > 3999) {
        return 'Out of range (I-MMMCMXCIX)';
    }

    const values = [
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

    let roman = '';

    for (let i = 0; i < values.length; i++) {
        while (num >= values[i].value) {
            roman += values[i].numeral;
            num -= values[i].value;
        }
    }

    return roman;
}

/**
 * Performs calculation on two Roman numerals
 * @param {string} operation - add, subtract, multiply, divide
 */
function calculate(operation) {
    const num1Input = document.getElementById('num1').value.trim();
    const num2Input = document.getElementById('num2').value.trim();

    if (!num1Input || !num2Input) {
        updateDisplay('Enter both numbers!', '');
        return;
    }

    const decimal1 = romanToDecimal(num1Input);
    const decimal2 = romanToDecimal(num2Input);

    if (decimal1 === null || decimal2 === null) {
        updateDisplay('Invalid Roman numeral!', '');
        return;
    }

    let result;

    switch(operation) {
        case 'add':
            result = decimal1 + decimal2;
            break;
        case 'subtract':
            result = decimal1 - decimal2;
            break;
        case 'multiply':
            result = decimal1 * decimal2;
            break;
        case 'divide':
            if (decimal2 === 0) {
                updateDisplay('Cannot divide by zero!', '');
                return;
            }
            result = Math.floor(decimal1 / decimal2);
            break;
        default:
            return;
    }

    if (result < 1) {
        updateDisplay('Result must be positive!', `(${result})`);
        return;
    }

    if (result > 3999) {
        updateDisplay('Result too large!', `(${result})`);
        return;
    }

    const romanResult = decimalToRoman(result);
    updateDisplay(romanResult, `(${decimalToRoman(result)})`);
}

/**
 * Updates the calculator display
 * @param {string} roman - Roman numeral to display
 * @param {string} decimal - Decimal value to display
 */
function updateDisplay(roman, decimal) {
    document.getElementById('display').textContent = roman;
    document.getElementById('display').nextElementSibling.textContent = decimal;
}

/**
 * Converts decimal input to Roman numeral
 */
function convertToRoman() {
    const decimalInput = document.getElementById('decimalInput').value;
    const num = parseInt(decimalInput);

    if (isNaN(num)) {
        document.getElementById('romanResult').textContent = 'Enter a valid number';
        return;
    }

    if (num < 1 || num > 3999) {
        document.getElementById('romanResult').textContent = 'Out of range (I-MMMCMXCIX)';
        return;
    }

    const roman = decimalToRoman(num);
    document.getElementById('romanResult').textContent = roman;
}

/**
 * Converts Roman numeral input to decimal
 */
function convertToDecimal() {
    const romanInput = document.getElementById('romanInput').value.trim();

    if (!romanInput) {
        document.getElementById('decimalResult').textContent = 'Enter a Roman numeral';
        return;
    }

    const decimal = romanToDecimal(romanInput);

    if (decimal === null) {
        document.getElementById('decimalResult').textContent = 'Invalid Roman numeral';
        return;
    }

    if (decimal === 0) {
        document.getElementById('decimalResult').textContent = 'Enter a valid numeral';
        return;
    }

    // Display in Roman numerals
    document.getElementById('decimalResult').textContent = decimalToRoman(decimal);
}

/**
 * Increments the counter
 */
function incrementCounter() {
    if (counterValue < 3999) {
        counterValue++;
        updateCounter();
    } else {
        alert('Maximum value reached (MMMCMXCIX)');
    }
}

/**
 * Decrements the counter
 */
function decrementCounter() {
    if (counterValue > 1) {
        counterValue--;
        updateCounter();
    } else {
        alert('Minimum value reached (I)');
    }
}

/**
 * Resets the counter to 1
 */
function resetCounter() {
    counterValue = 1;
    updateCounter();
}

/**
 * Updates the counter display
 */
function updateCounter() {
    const roman = decimalToRoman(counterValue);
    document.getElementById('counter').textContent = roman;
}

/**
 * Handles Enter key press for inputs
 */
document.addEventListener('DOMContentLoaded', function() {
    // Calculator inputs
    document.getElementById('num1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate('add');
        }
    });

    document.getElementById('num2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate('add');
        }
    });

    // Converter inputs
    document.getElementById('decimalInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertToRoman();
        }
    });

    document.getElementById('romanInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertToDecimal();
        }
    });

    // Auto-convert as user types (optional enhancement)
    document.getElementById('romanInput').addEventListener('input', function() {
        if (this.value.trim() !== '') {
            convertToDecimal();
        }
    });

    document.getElementById('decimalInput').addEventListener('input', function() {
        if (this.value.trim() !== '') {
            convertToRoman();
        }
    });

    // Initialize counter
    updateCounter();
});

// Add Roman numeral validation on input
document.addEventListener('DOMContentLoaded', function() {
    const romanInputs = ['num1', 'num2', 'romanInput'];

    romanInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', function() {
            // Convert to uppercase automatically
            this.value = this.value.toUpperCase();

            // Remove invalid characters
            this.value = this.value.replace(/[^IVXLCDM]/g, '');
        });
    });
});
