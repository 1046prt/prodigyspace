import { useState } from "react";
import timezonesData from "@/lib/country-timezones.json";

interface Timezone {
  id: string;
  name: string;
  offset: number;
  countries: string[];
  dstOffset: number;
}

export function useConverter() {
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState("bytes");
  const [toUnit, setToUnit] = useState("kb");

  // Conversion functions
  const convertDataUnits = (
    value: number,
    from: string,
    to: string,
  ): number => {
    const units: Record<string, number> = {
      bits: 1,
      bytes: 8,
      kb: 8 * 1024,
      mb: 8 * 1024 * 1024,
      gb: 8 * 1024 * 1024 * 1024,
      tb: 8 * 1024 * 1024 * 1024 * 1024,
    };

    if (!units[from] || !units[to]) return 0;

    const bits = value * units[from];
    return bits / units[to];
  };

  const convertTimeUnits = (
    value: number,
    from: string,
    to: string,
  ): number => {
    const units: Record<string, number> = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
      days: 1000 * 60 * 60 * 24,
    };

    if (!units[from] || !units[to]) return 0;

    const milliseconds = value * units[from];
    return milliseconds / units[to];
  };

  const convertLengthUnits = (
    value: number,
    from: string,
    to: string,
  ): number => {
    const units: Record<string, number> = {
      mm: 1,
      cm: 10,
      m: 1000,
      km: 1000000,
      inch: 25.4,
      feet: 304.8,
      yard: 914.4,
      mile: 1609344,
    };

    if (!units[from] || !units[to]) return 0;

    const mm = value * units[from];
    return mm / units[to];
  };

  const convertTemperature = (
    value: number,
    from: string,
    to: string,
  ): number => {
    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case "celsius":
        celsius = value;
        break;
      case "fahrenheit":
        celsius = ((value - 32) * 5) / 9;
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
      default:
        return 0;
    }

    // Convert from Celsius to target unit
    switch (to) {
      case "celsius":
        return celsius;
      case "fahrenheit":
        return (celsius * 9) / 5 + 32;
      case "kelvin":
        return celsius + 273.15;
      default:
        return 0;
    }
  };

  const convertWeightUnits = (
    value: number,
    from: string,
    to: string,
  ): number => {
    const units: Record<string, number> = {
      mg: 1,
      g: 1000,
      kg: 1000000,
      lb: 453592,
      oz: 28350,
      ton: 1000000000,
    };

    if (!units[from] || !units[to]) return 0;

    const mg = value * units[from];
    return mg / units[to];
  };

  const convertVolumeUnits = (
    value: number,
    from: string,
    to: string,
  ): number => {
    const units: Record<string, number> = {
      ml: 1,
      l: 1000,
      gallon: 3785.41,
      quart: 946.353,
      pint: 473.176,
      cup: 236.588,
      floz: 29.5735,
    };

    if (!units[from] || !units[to]) return 0;

    const ml = value * units[from];
    return ml / units[to];
  };

  const convertEnergyUnits = (
    value: number,
    from: string,
    to: string,
  ): number => {
    const units: Record<string, number> = {
      joule: 1,
      calorie: 4.184,
      kcal: 4184,
      kwh: 3600000,
      btu: 1055.06,
    };

    if (!units[from] || !units[to]) return 0;

    const joules = value * units[from];
    return joules / units[to];
  };

  const convertTimezone = (
    time: string,
    fromTimezoneId: string,
    toTimezoneId: string,
  ): { time: string; dateDifference: number } => {
    const timezones: Timezone[] = timezonesData.timezones;
    const fromTz = timezones.find((tz) => tz.id === fromTimezoneId);
    const toTz = timezones.find((tz) => tz.id === toTimezoneId);

    if (!fromTz || !toTz) return { time: "--:--", dateDifference: 0 };

    try {
      const [hours, minutes] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);

      const offsetDifference = toTz.offset - fromTz.offset;
      const originalDate = new Date(date);
      date.setHours(date.getHours() + offsetDifference);

      const resultHours = String(date.getHours()).padStart(2, "0");
      const resultMinutes = String(date.getMinutes()).padStart(2, "0");
      const dateDifference =
        Math.floor(date.getTime() / (1000 * 60 * 60 * 24)) -
        Math.floor(originalDate.getTime() / (1000 * 60 * 60 * 24));

      return { time: `${resultHours}:${resultMinutes}`, dateDifference };
    } catch {
      return { time: "--:--", dateDifference: 0 };
    }
  };

  const getTimezoneList = (): Timezone[] => {
    return (timezonesData.timezones as Timezone[]).sort(
      (a, b) => a.offset - b.offset,
    );
  };

  const getTimezonesByCountry = (country: string): Timezone[] => {
    return (timezonesData.timezones as Timezone[]).filter((tz) =>
      tz.countries.some((c) => c.toLowerCase().includes(country.toLowerCase())),
    );
  };

  const getResult = (): string => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) return "0";

    let result = 0;
    if (
      ["bytes", "bits", "kb", "mb", "gb", "tb"].includes(fromUnit) &&
      ["bytes", "bits", "kb", "mb", "gb", "tb"].includes(toUnit)
    ) {
      result = convertDataUnits(value, fromUnit, toUnit);
    } else if (
      ["milliseconds", "seconds", "minutes", "hours", "days"].includes(
        fromUnit,
      ) &&
      ["milliseconds", "seconds", "minutes", "hours", "days"].includes(toUnit)
    ) {
      result = convertTimeUnits(value, fromUnit, toUnit);
    } else if (
      ["mm", "cm", "m", "km", "inch", "feet", "yard", "mile"].includes(
        fromUnit,
      ) &&
      ["mm", "cm", "m", "km", "inch", "feet", "yard", "mile"].includes(toUnit)
    ) {
      result = convertLengthUnits(value, fromUnit, toUnit);
    } else if (
      ["celsius", "fahrenheit", "kelvin"].includes(fromUnit) &&
      ["celsius", "fahrenheit", "kelvin"].includes(toUnit)
    ) {
      result = convertTemperature(value, fromUnit, toUnit);
    } else if (
      ["mg", "g", "kg", "lb", "oz", "ton"].includes(fromUnit) &&
      ["mg", "g", "kg", "lb", "oz", "ton"].includes(toUnit)
    ) {
      result = convertWeightUnits(value, fromUnit, toUnit);
    } else if (
      ["ml", "l", "gallon", "quart", "pint", "cup", "floz"].includes(
        fromUnit,
      ) &&
      ["ml", "l", "gallon", "quart", "pint", "cup", "floz"].includes(toUnit)
    ) {
      result = convertVolumeUnits(value, fromUnit, toUnit);
    } else if (
      ["joule", "calorie", "kcal", "kwh", "btu"].includes(fromUnit) &&
      ["joule", "calorie", "kcal", "kwh", "btu"].includes(toUnit)
    ) {
      result = convertEnergyUnits(value, fromUnit, toUnit);
    } else {
      return "Invalid conversion";
    }

    // Format the result
    if (result === Math.floor(result)) {
      return result.toString();
    } else {
      return result.toFixed(4).replace(/\.?0+$/, "");
    }
  };

  return {
    fromValue,
    setFromValue,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    getResult,
    convertTimezone,
    getTimezoneList,
    getTimezonesByCountry,
  };
}
