class RomanCalculator {
    constructor() {
        this.display = document.getElementById('display');
        this.romanDisplay = document.getElementById('romanDisplay');
        this.modeToggle = document.getElementById('modeToggle');

        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.shouldResetDisplay = false;
        this.isRomanMode = false;

        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('.button.number').forEach(button => {
            button.addEventListener('click', () => {
                const value = parseInt(button.dataset.value);
                this.handleNumber(value);
            });
        });

        // Operator buttons
        document.querySelectorAll('.button.operator').forEach(button => {
            button.addEventListener('click', () => {
                const op = button.dataset.operator;
                this.handleOperator(op);
            });
        });

        // Clear button
        document.querySelector('.button.clear').addEventListener('click', () => {
            this.clear();
        });

        // Equals button
        document.querySelector('.button.equals').addEventListener('click', () => {
            this.calculate();
        });

        // Mode toggle
        this.modeToggle.addEventListener('change', () => {
            this.isRomanMode = this.modeToggle.checked;
            this.updateDisplay();
        });
    }

    handleNumber(num) {
        if (this.shouldResetDisplay) {
            this.currentValue = num;
            this.shouldResetDisplay = false;
        } else {
            // Append digit (multiply by 10 and add new digit)
            this.currentValue = this.currentValue * 10 + num;
        }
        this.updateDisplay();
    }

    handleOperator(op) {
        if (this.operator !== null && this.previousValue !== null) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;
    }

    calculate() {
        if (this.operator === null || this.previousValue === null) {
            return;
        }

        let result;
        const prev = this.previousValue;
        const current = this.currentValue;

        switch (this.operator) {
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
                    this.clear();
                    return;
                }
                result = Math.floor(prev / current); // Integer division for Roman numerals
                break;
            default:
                return;
        }

        // Handle negative results
        if (result < 0) {
            alert('Negative numbers cannot be represented in Roman numerals!');
            this.clear();
            return;
        }

        // Handle very large numbers
        if (result > 3999) {
            alert('Result too large! Roman numerals only go up to MMMCMXCIX (3999)');
            this.clear();
            return;
        }

        this.currentValue = result;
        this.previousValue = null;
        this.operator = null;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    clear() {
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    updateDisplay() {
        const arabicValue = this.currentValue;
        const romanValue = this.toRoman(arabicValue);

        if (this.isRomanMode) {
            this.display.textContent = romanValue;
            this.romanDisplay.textContent = arabicValue;
        } else {
            this.display.textContent = arabicValue;
            this.romanDisplay.textContent = romanValue;
        }
    }

    toRoman(num) {
        if (num === 0) {
            return 'NULLA'; // Zero in Roman (using Latin term)
        }

        if (num < 0 || num > 3999) {
            return 'ERROR';
        }

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
        let remaining = num;

        for (const { value, numeral } of romanNumerals) {
            while (remaining >= value) {
                result += numeral;
                remaining -= value;
            }
        }

        return result;
    }

    fromRoman(roman) {
        if (roman === 'NULLA') {
            return 0;
        }

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
        let prevValue = 0;

        for (let i = roman.length - 1; i >= 0; i--) {
            const currentValue = romanValues[roman[i]];

            if (currentValue < prevValue) {
                result -= currentValue;
            } else {
                result += currentValue;
            }

            prevValue = currentValue;
        }

        return result;
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RomanCalculator();
});
