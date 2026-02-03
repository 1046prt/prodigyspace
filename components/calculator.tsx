"use client";

import { useState, useCallback } from "react";
import { Calculator as CalculatorIcon, Delete } from "lucide-react";
import "../styles/calculator.css";

interface CalculatorProps {
  className?: string;
  title?: string;
}

export function Calculator({
  className,
  title = "Calculator",
}: CalculatorProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInput = useCallback(
    (value: string) => {
      if (value === "=") {
        try {
          // Replace display operators with JS operators
          const expression = input.replace(/×/g, "*").replace(/÷/g, "/");

          // Basic security: only allow numbers and basic operators
          if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            setResult("Error");
            return;
          }

          const evalResult = eval(expression);
          setResult(evalResult.toString());
        } catch {
          setResult("Error");
        }
      } else if (value === "C") {
        setInput("");
        setResult("");
      } else if (value === "Backspace") {
        setInput(input.slice(0, -1));
      } else if (value === "±") {
        if (input.startsWith("-")) {
          setInput(input.slice(1));
        } else if (input) {
          setInput("-" + input);
        }
      } else {
        setInput(input + value);
      }
    },
    [input],
  );

  const buttonLayout = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const getButtonClassName = (btn: string) => {
    let baseClass = "calc-btn";
    if (btn === "C" || btn === "±" || btn === "%") {
      baseClass += " calc-btn-function";
    } else if (btn === "÷" || btn === "×" || btn === "-" || btn === "+") {
      baseClass += " calc-btn-operator";
    } else if (btn === "=") {
      baseClass += " calc-btn-equals";
    } else if (btn === "0") {
      baseClass += " calc-btn-zero";
    }
    return baseClass;
  };

  return (
    <div className={`calculator-container ${className || ""}`}>
      <div className="calculator-wrapper">
        <div className="calculator-header">
          <div className="calculator-title-section">
            <CalculatorIcon className="calculator-icon" size={24} />
            <h2 className="calculator-title">{title}</h2>
          </div>
        </div>

        <div className="calculator-display-section">
          <div className="display-screen">
            <div className="display-previous">{input || "0"}</div>
            <div className="display-current">{result || "0"}</div>
          </div>
        </div>

        <div className="calculator-buttons-grid">
          {buttonLayout.map((row) =>
            row.map((btn) => (
              <button
                key={btn}
                onClick={() =>
                  handleInput(btn === "×" ? "*" : btn === "÷" ? "/" : btn)
                }
                className={getButtonClassName(btn)}
                title={btn === "C" ? "Clear" : undefined}
              >
                {btn === "Backspace" ? (
                  <Delete size={20} />
                ) : (
                  <span>{btn}</span>
                )}
              </button>
            )),
          )}
        </div>

        <button
          onClick={() => handleInput("Backspace")}
          className="calc-backspace-btn"
          title="Delete last digit"
        >
          <Delete size={18} />
          <span>Backspace</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Calculator button rows for easy customization
 */
export const calculatorButtonSets = {
  standard: [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ],
  scientific: [
    ["C", "±", "%", "÷", "√", "x²"],
    ["7", "8", "9", "×", "sin", "cos"],
    ["4", "5", "6", "-", "tan", "ln"],
    ["1", "2", "3", "+", "(", ")"],
    ["0", ".", "=", "π", "e"],
  ],
};
