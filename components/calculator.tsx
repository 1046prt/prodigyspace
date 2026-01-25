"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator as CalculatorIcon } from "lucide-react";

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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="utilities-card-title">
          <CalculatorIcon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="calculator-display">
            <div className="calculator-input">{input || "0"}</div>
            <div className="calculator-result">{result || "0"}</div>
          </div>
          <div className="calculator-buttons">
            {buttonLayout.flat().map((btn, index) => {
              const isLastRow = index >= buttonLayout.flat().length - 3;
              const isZero = btn === "0";

              return (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() =>
                    handleInput(btn === "×" ? "*" : btn === "÷" ? "/" : btn)
                  }
                  className={`calculator-button ${
                    isLastRow && isZero ? "calculator-button-wide" : ""
                  }`}
                >
                  {btn}
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
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
