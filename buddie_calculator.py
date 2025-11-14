#!/usr/bin/env python3
"""
Buddie - A Roman Numeral Calculator
A calculator that uses Roman numerals with a blue-themed UI
"""

import tkinter as tk
from tkinter import messagebox
import re


class RomanNumeralConverter:
    """Handles conversion between Roman numerals and integers"""

    # Mapping for Roman to Integer
    ROMAN_TO_INT = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    }

    # Mapping for Integer to Roman
    INT_TO_ROMAN = [
        (1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),
        (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),
        (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')
    ]

    @staticmethod
    def roman_to_int(roman):
        """Convert Roman numeral to integer"""
        if not roman:
            return 0

        roman = roman.upper().strip()

        # Validate Roman numeral
        if not re.match(r'^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$', roman):
            raise ValueError(f"Invalid Roman numeral: {roman}")

        total = 0
        prev_value = 0

        for char in reversed(roman):
            value = RomanNumeralConverter.ROMAN_TO_INT[char]
            if value < prev_value:
                total -= value
            else:
                total += value
            prev_value = value

        return total

    @staticmethod
    def int_to_roman(num):
        """Convert integer to Roman numeral"""
        if num <= 0:
            raise ValueError("Roman numerals must be positive")
        if num >= 4000:
            raise ValueError("Number too large (max 3999)")

        result = ''
        for value, numeral in RomanNumeralConverter.INT_TO_ROMAN:
            count = num // value
            if count:
                result += numeral * count
                num -= value * count

        return result


class BuddieCalculator:
    """Buddie - The Roman Numeral Calculator"""

    def __init__(self, root):
        self.root = root
        self.root.title("Buddie - Roman Numeral Calculator")
        self.root.geometry("400x600")
        self.root.resizable(False, False)

        # Blue color scheme
        self.bg_color = "#1E3A5F"  # Deep blue
        self.display_bg = "#2C5F8D"  # Medium blue
        self.button_bg = "#4A90E2"  # Bright blue
        self.button_active = "#357ABD"  # Darker blue for active
        self.text_color = "#FFFFFF"  # White text
        self.special_button = "#5BA3E8"  # Light blue for special buttons

        self.root.configure(bg=self.bg_color)

        # Calculator state
        self.current_input = ""
        self.first_operand = None
        self.operation = None
        self.display_text = tk.StringVar()
        self.display_text.set("")

        self.create_widgets()

    def create_widgets(self):
        """Create the calculator UI"""

        # Title label
        title_label = tk.Label(
            self.root,
            text="♕ Buddie ♕",
            font=("Arial", 24, "bold"),
            bg=self.bg_color,
            fg="#87CEEB"  # Sky blue
        )
        title_label.pack(pady=20)

        # Display frame
        display_frame = tk.Frame(self.root, bg=self.bg_color)
        display_frame.pack(pady=10, padx=20, fill="x")

        # Display
        display = tk.Entry(
            display_frame,
            textvariable=self.display_text,
            font=("Arial", 20, "bold"),
            bg=self.display_bg,
            fg=self.text_color,
            justify="right",
            bd=5,
            relief="sunken",
            state="readonly"
        )
        display.pack(fill="x", ipady=15)

        # Info label
        info_label = tk.Label(
            self.root,
            text="Roman Numeral Calculator",
            font=("Arial", 10, "italic"),
            bg=self.bg_color,
            fg="#B0D4F1"  # Light blue
        )
        info_label.pack()

        # Button frame
        button_frame = tk.Frame(self.root, bg=self.bg_color)
        button_frame.pack(pady=20, padx=20)

        # Roman numeral buttons layout
        buttons = [
            ['M', 'D', 'C', 'L'],
            ['X', 'V', 'I', '←'],
            ['+', '-', '×', '÷'],
            ['Clear', '=']
        ]

        for row_idx, row in enumerate(buttons):
            for col_idx, button_text in enumerate(row):
                if button_text == '=':
                    btn = tk.Button(
                        button_frame,
                        text=button_text,
                        font=("Arial", 16, "bold"),
                        bg=self.special_button,
                        fg=self.text_color,
                        activebackground=self.button_active,
                        activeforeground=self.text_color,
                        width=10,
                        height=2,
                        bd=3,
                        relief="raised",
                        command=lambda: self.calculate()
                    )
                    btn.grid(row=row_idx, column=0, columnspan=2, sticky="ew", padx=2, pady=2)
                elif button_text == 'Clear':
                    btn = tk.Button(
                        button_frame,
                        text=button_text,
                        font=("Arial", 16, "bold"),
                        bg="#3A7BC8",  # Darker blue for clear
                        fg=self.text_color,
                        activebackground=self.button_active,
                        activeforeground=self.text_color,
                        width=10,
                        height=2,
                        bd=3,
                        relief="raised",
                        command=lambda: self.clear()
                    )
                    btn.grid(row=row_idx, column=2, columnspan=2, sticky="ew", padx=2, pady=2)
                else:
                    if button_text in ['←']:
                        cmd = lambda: self.backspace()
                        bg_color = "#3A7BC8"
                    elif button_text in ['+', '-', '×', '÷']:
                        cmd = lambda op=button_text: self.set_operation(op)
                        bg_color = self.special_button
                    else:
                        cmd = lambda char=button_text: self.add_character(char)
                        bg_color = self.button_bg

                    btn = tk.Button(
                        button_frame,
                        text=button_text,
                        font=("Arial", 16, "bold"),
                        bg=bg_color,
                        fg=self.text_color,
                        activebackground=self.button_active,
                        activeforeground=self.text_color,
                        width=5,
                        height=2,
                        bd=3,
                        relief="raised",
                        command=cmd
                    )
                    btn.grid(row=row_idx, column=col_idx, padx=2, pady=2)

    def add_character(self, char):
        """Add a Roman numeral character to input"""
        self.current_input += char
        self.display_text.set(self.current_input)

    def backspace(self):
        """Remove last character"""
        self.current_input = self.current_input[:-1]
        self.display_text.set(self.current_input)

    def clear(self):
        """Clear all input and reset calculator"""
        self.current_input = ""
        self.first_operand = None
        self.operation = None
        self.display_text.set("")

    def set_operation(self, op):
        """Set the mathematical operation"""
        if self.current_input:
            try:
                # Convert current input to integer
                self.first_operand = RomanNumeralConverter.roman_to_int(self.current_input)
                self.operation = op
                self.current_input = ""
                self.display_text.set(f"{RomanNumeralConverter.int_to_roman(self.first_operand)} {op}")
            except ValueError as e:
                messagebox.showerror("Error", str(e))
                self.clear()

    def calculate(self):
        """Perform the calculation"""
        if self.first_operand is not None and self.operation and self.current_input:
            try:
                # Convert second operand
                second_operand = RomanNumeralConverter.roman_to_int(self.current_input)

                # Perform operation
                if self.operation == '+':
                    result = self.first_operand + second_operand
                elif self.operation == '-':
                    result = self.first_operand - second_operand
                elif self.operation == '×':
                    result = self.first_operand * second_operand
                elif self.operation == '÷':
                    if second_operand == 0:
                        messagebox.showerror("Error", "Cannot divide by zero")
                        self.clear()
                        return
                    result = int(self.first_operand / second_operand)

                # Check if result is valid for Roman numerals
                if result <= 0:
                    messagebox.showerror("Error", "Result must be positive for Roman numerals")
                    self.clear()
                    return

                if result >= 4000:
                    messagebox.showerror("Error", "Result too large (max 3999)")
                    self.clear()
                    return

                # Convert result to Roman and display
                roman_result = RomanNumeralConverter.int_to_roman(result)
                self.display_text.set(roman_result)

                # Reset for next calculation
                self.first_operand = result
                self.operation = None
                self.current_input = ""

            except ValueError as e:
                messagebox.showerror("Error", str(e))
                self.clear()


def main():
    """Main entry point"""
    root = tk.Tk()
    app = BuddieCalculator(root)
    root.mainloop()


if __name__ == "__main__":
    main()
