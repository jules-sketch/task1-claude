# Buddie - Roman Numeral Calculator

A beautiful calculator app that uses Roman numerals with an elegant blue-themed UI.

## Features

- **Roman Numeral Support**: All button labels display Roman numerals
- **Dual Display Mode**: Toggle between Arabic and Roman numeral display
- **Blue Color Theme**: Elegant UI using various shades of blue
- **Basic Operations**: Addition, subtraction, multiplication, and division
- **Input Validation**: Handles edge cases like division by zero and negative results
- **Range Support**: Supports calculations up to 3999 (MMMCMXCIX)

## How to Use

1. Open `index.html` in your web browser
2. Click the Roman numeral buttons to enter numbers
3. Use the operation buttons (+, , ×, ÷) to perform calculations
4. Press = to see the result
5. Press C to clear the calculator
6. Toggle between Arabic and Roman display modes using the switch at the bottom

## Technical Details

- Pure HTML, CSS, and JavaScript (no external dependencies)
- Responsive design for mobile and desktop
- Gradient backgrounds and smooth transitions
- Integer-based calculations suitable for Roman numeral representation

## Files

- `index.html` - Main HTML structure
- `styles.css` - Blue-themed styling
- `script.js` - Calculator logic and Roman numeral conversion

## Roman Numeral Limitations

- Maximum value: 3999 (MMMCMXCIX)
- Negative numbers are not supported (alert shown)
- Division results are rounded down to integers
- Zero is represented as "NULLA" (Latin for "none")
