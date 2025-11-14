# Calculator with History

A web-based calculator application with calculation history tracking functionality.

## Features

- **Basic Operations**: Addition, subtraction, multiplication, and division
- **History Tracking**: All calculations are saved and can be revisited
- **History Button**: Click the "History" button to view all past calculations
- **Persistent Storage**: History is saved in localStorage and persists across sessions
- **Click to Load**: Click any history item to load that result back into the calculator
- **Keyboard Support**: Use your keyboard for input (numbers, operators, Enter for equals, Escape to clear)
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. Open `index.html` in a web browser
2. Perform calculations using the on-screen buttons or keyboard
3. Click the **History** button to view all past calculations
4. Click on any history item to load that result into the calculator
5. Use "Clear History" to delete all saved calculations

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling for calculator and history panel
- `calculator.js` - Calculator logic and history management

## History Features

- Stores up to 50 most recent calculations
- Shows expression, result, and timestamp for each calculation
- History persists between browser sessions (localStorage)
- Click any history entry to use that result in a new calculation
