class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.history = [];
        this.displayElement = document.getElementById('display');
        this.historyPanel = document.getElementById('historyPanel');
        this.historyList = document.getElementById('historyList');

        // Load history from localStorage
        this.loadHistory();
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayElement.textContent = this.currentValue;
    }

    appendNumber(number) {
        if (this.currentValue === '0' && number !== '.') {
            this.currentValue = number;
        } else if (number === '.' && this.currentValue.includes('.')) {
            return;
        } else {
            this.currentValue += number;
        }
        this.updateDisplay();
    }

    appendOperator(operator) {
        if (this.operation !== null) {
            this.calculate();
        }
        this.operation = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '0';
    }

    calculate() {
        if (this.operation === null || this.previousValue === '') {
            return;
        }

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        switch (this.operation) {
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
                result = prev / current;
                break;
            default:
                return;
        }

        // Create history entry
        const expression = `${this.previousValue} ${this.operation} ${this.currentValue}`;
        const historyEntry = {
            expression: expression,
            result: result,
            timestamp: new Date().toISOString()
        };

        // Add to history
        this.addToHistory(historyEntry);

        // Update calculator state
        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.updateDisplay();
    }

    delete() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    addToHistory(entry) {
        this.history.unshift(entry); // Add to beginning of array

        // Keep only last 50 calculations
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        this.saveHistory();
        this.renderHistory();
    }

    saveHistory() {
        try {
            localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
        } catch (e) {
            console.error('Failed to save history:', e);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('calculatorHistory');
            if (saved) {
                this.history = JSON.parse(saved);
                this.renderHistory();
            }
        } catch (e) {
            console.error('Failed to load history:', e);
            this.history = [];
        }
    }

    renderHistory() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<p class="no-history">No calculations yet</p>';
            return;
        }

        this.historyList.innerHTML = this.history.map((entry, index) => {
            const date = new Date(entry.timestamp);
            const timeString = date.toLocaleTimeString();

            return `
                <div class="history-item" onclick="calculator.loadFromHistory(${index})">
                    <div class="history-expression">${this.escapeHtml(entry.expression)}</div>
                    <div class="history-result">= ${this.formatNumber(entry.result)}</div>
                    <div style="font-size: 0.8em; color: #a0aec0; margin-top: 4px;">${timeString}</div>
                </div>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatNumber(num) {
        // Format number to avoid floating point errors
        if (Number.isInteger(num)) {
            return num.toString();
        }
        return parseFloat(num.toFixed(10)).toString();
    }

    loadFromHistory(index) {
        const entry = this.history[index];
        if (entry) {
            this.currentValue = entry.result.toString();
            this.previousValue = '';
            this.operation = null;
            this.updateDisplay();
            this.toggleHistory(); // Close history panel
        }
    }

    toggleHistory() {
        this.historyPanel.classList.toggle('active');
    }

    clearHistory() {
        if (this.history.length === 0) {
            return;
        }

        if (confirm('Are you sure you want to clear all history?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    }
}

// Initialize calculator when page loads
const calculator = new Calculator();

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
    } else if (e.key === '.') {
        calculator.appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.calculate();
    } else if (e.key === 'Escape') {
        calculator.clear();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.delete();
    }
});
