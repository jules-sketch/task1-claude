# Buddie - Roman Numeral Calculator

A beautiful calculator application that performs arithmetic operations using Roman numerals, featuring an elegant blue-themed user interface.

## Features

- **Roman Numeral Input**: Enter numbers using Roman numerals (I, V, X, L, C, D, M)
- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (◊), Division (˜)
- **Blue-Themed UI**: Elegant interface with various shades of blue
- **Input Validation**: Ensures valid Roman numeral format
- **Range Support**: Handles numbers from 1 to 3999

## Requirements

- Python 3.x
- tkinter (usually included with Python)

## Installation

No additional packages required! Just ensure you have Python 3 installed.

## Usage

Run the calculator with:

```bash
python3 buddie_calculator.py
```

### How to Use

1. **Enter First Number**: Click the Roman numeral buttons (M, D, C, L, X, V, I) to enter your first number
2. **Select Operation**: Click one of the operation buttons (+, -, ◊, ˜)
3. **Enter Second Number**: Click the Roman numeral buttons to enter your second number
4. **Calculate**: Click the = button to see the result
5. **Clear**: Click Clear to reset and start a new calculation
6. **Backspace**: Click ê to delete the last character

### Roman Numeral Reference

- I = 1
- V = 5
- X = 10
- L = 50
- C = 100
- D = 500
- M = 1000

### Examples

- **Addition**: X + V = XV (10 + 5 = 15)
- **Subtraction**: C - L = L (100 - 50 = 50)
- **Multiplication**: X ◊ V = L (10 ◊ 5 = 50)
- **Division**: C ˜ X = X (100 ˜ 10 = 10)

## Limitations

- Results must be positive (Roman numerals don't represent zero or negative numbers)
- Maximum value is 3999 (MMMCMXCIX)
- Division results are rounded down to the nearest integer

## Color Scheme

The calculator features a professional blue color palette:
- Deep blue background (#1E3A5F)
- Medium blue display (#2C5F8D)
- Bright blue buttons (#4A90E2)
- Sky blue title (#87CEEB)

Enjoy calculating with Buddie!
