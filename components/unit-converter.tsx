"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { useConverter } from "@/hooks/use-converter";
import {
  Calculator,
  Database,
  Clock,
  Ruler,
  Thermometer,
  ArrowRight,
  Weight,
  Fuel,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import "@/styles/unit-converter.css";

const unitCategories = [
  {
    id: "data",
    name: "Data",
    units: ["bits", "bytes", "kb", "mb", "gb", "tb"],
    icon: Database,
  },
  {
    id: "time",
    name: "Time",
    units: ["milliseconds", "seconds", "minutes", "hours", "days"],
    icon: Clock,
  },
  {
    id: "length",
    name: "Length",
    units: ["mm", "cm", "m", "km", "inch", "feet", "yard", "mile"],
    icon: Ruler,
  },
  {
    id: "temperature",
    name: "Temperature",
    units: ["celsius", "fahrenheit", "kelvin"],
    icon: Thermometer,
  },
  {
    id: "weight",
    name: "Weight",
    units: ["mg", "g", "kg", "lb", "oz", "ton"],
    icon: Weight,
  },
  {
    id: "volume",
    name: "Volume",
    units: ["ml", "l", "gallon", "quart", "pint", "cup", "floz"],
    icon: Fuel,
  },
  {
    id: "energy",
    name: "Energy",
    units: ["joule", "calorie", "kcal", "kwh", "btu"],
    icon: Zap,
  },
];

export function UnitConverter() {
  const {
    fromValue,
    setFromValue,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    getResult,
  } = useConverter();

  const [category, setCategory] = useState("data");
  const currentCategory = unitCategories.find((cat) => cat.id === category);

  return (
    <Card className="unit-converter-card">
      <CardHeader className="unit-converter-header">
        <CardTitle className="unit-converter-title">
          <Calculator className="calculator-icon h-5 w-5" />
          Unit Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="unit-converter-content">
        <div className={`unit-selector-grid category-${category}`}>
          <div className="input-group">
            <Label className="input-label">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="category-select">
                {currentCategory &&
                  React.createElement(currentCategory.icon, {
                    className: `category-icon h-4 w-4`,
                    size: 16,
                  })}
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="select-content">
                {unitCategories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="select-item"
                  >
                    {React.createElement(cat.icon, {
                      className: `category-icon h-4 w-4 mr-2`,
                      size: 16,
                    })}
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="input-group">
            <Label className="input-label">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="unit-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="select-content">
                {currentCategory?.units.map((unit) => (
                  <SelectItem key={unit} value={unit} className="select-item">
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="input-group">
            <Label className="input-label">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="unit-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="select-content">
                {currentCategory?.units.map((unit) => (
                  <SelectItem key={unit} value={unit} className="select-item">
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="value-grid">
          <div className="input-group">
            <Label className="input-label">Value</Label>
            <Input
              className="value-input"
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>

          <div className="input-group">
            <Label className="input-label">Result</Label>
            <div className="result-wrapper">
              <Input
                className="result-input"
                type="text"
                value={getResult()}
                readOnly
                placeholder="Result"
              />
              <ArrowRight className="result-arrow" size={18} />
            </div>
          </div>
        </div>

        <div className="help-text">
          <p>
            Comprehensive unit converter for students: data storage, time,
            measurements, temperature, weight, volume, and energy conversions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
