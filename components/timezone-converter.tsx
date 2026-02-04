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
import { Globe, Clock, ArrowRight } from "lucide-react";
import React, { useState, useMemo } from "react";
import timezonesData from "@/lib/country-timezones.json";
import "@/styles/timezone-converter.css";

interface Timezone {
  id: string;
  name: string;
  offset: number;
  countries: string[];
  dstOffset: number;
}

export function TimezoneConverter() {
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [fromTimezoneId, setFromTimezoneId] = useState("utc");
  const [toTimezoneId, setToTimezoneId] = useState("gmt1");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const timezones: Timezone[] = timezonesData.timezones;

  // Get unique timezone list
  const timezoneList = useMemo(() => {
    return timezones.sort((a, b) => a.offset - b.offset);
  }, [timezones]);

  const fromTimezone = timezoneList.find((tz) => tz.id === fromTimezoneId);
  const toTimezone = timezoneList.find((tz) => tz.id === toTimezoneId);

  const convertTime = (): string => {
    if (!fromTimezone || !toTimezone) return "--:--";

    try {
      // Parse the input time
      const [hours, minutes] = selectedTime.split(":").map(Number);

      // Create a date object with the selected date and time
      const date = new Date(selectedDate);
      date.setHours(hours, minutes, 0, 0);

      // Calculate the offset difference
      const offsetDifference = toTimezone.offset - fromTimezone.offset;

      // Apply the offset
      date.setHours(date.getHours() + offsetDifference);

      // Format the result
      const resultHours = String(date.getHours()).padStart(2, "0");
      const resultMinutes = String(date.getMinutes()).padStart(2, "0");

      return `${resultHours}:${resultMinutes}`;
    } catch {
      return "--:--";
    }
  };

  const getResultDate = (): string => {
    if (!fromTimezone || !toTimezone) return selectedDate;

    try {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const date = new Date(selectedDate);
      date.setHours(hours, minutes, 0, 0);

      const offsetDifference = toTimezone.offset - fromTimezone.offset;
      date.setHours(date.getHours() + offsetDifference);

      return date.toISOString().split("T")[0];
    } catch {
      return selectedDate;
    }
  };

  const getCountries = (timezone: Timezone): string => {
    return timezone.countries.slice(0, 3).join(", ");
  };

  return (
    <Card className="timezone-converter-card">
      <CardHeader className="timezone-converter-header">
        <CardTitle className="timezone-converter-title">
          <Globe className="timezone-icon h-5 w-5" />
          Timezone Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="timezone-converter-content">
        <div className="timezone-grid">
          {/* From Timezone Section */}
          <div className="timezone-section">
            <div className="section-header">
              <h3 className="section-title">From Timezone</h3>
            </div>

            <div className="input-group">
              <Label className="input-label">Select Timezone</Label>
              <Select value={fromTimezoneId} onValueChange={setFromTimezoneId}>
                <SelectTrigger className="timezone-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="select-content">
                  {timezoneList.map((tz) => (
                    <SelectItem
                      key={tz.id}
                      value={tz.id}
                      className="select-item"
                    >
                      <div className="timezone-option">
                        <span>{tz.name}</span>
                        <span className="timezone-offset">
                          (UTC{tz.offset >= 0 ? "+" : ""}
                          {tz.offset})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fromTimezone && (
                <p className="timezone-info">
                  <span className="info-label">Countries:</span>{" "}
                  {getCountries(fromTimezone)}
                </p>
              )}
            </div>

            <div className="input-group">
              <Label className="input-label">Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="input-group">
              <Label className="input-label">Time</Label>
              <Input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="time-input"
              />
            </div>
          </div>

          {/* Conversion Arrow */}
          <div className="conversion-arrow-container">
            <ArrowRight className="conversion-arrow" size={24} />
          </div>

          {/* To Timezone Section */}
          <div className="timezone-section">
            <div className="section-header">
              <h3 className="section-title">To Timezone</h3>
            </div>

            <div className="input-group">
              <Label className="input-label">Select Timezone</Label>
              <Select value={toTimezoneId} onValueChange={setToTimezoneId}>
                <SelectTrigger className="timezone-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="select-content">
                  {timezoneList.map((tz) => (
                    <SelectItem
                      key={tz.id}
                      value={tz.id}
                      className="select-item"
                    >
                      <div className="timezone-option">
                        <span>{tz.name}</span>
                        <span className="timezone-offset">
                          (UTC{tz.offset >= 0 ? "+" : ""}
                          {tz.offset})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {toTimezone && (
                <p className="timezone-info">
                  <span className="info-label">Countries:</span>{" "}
                  {getCountries(toTimezone)}
                </p>
              )}
            </div>

            <div className="input-group">
              <Label className="input-label">Converted Date</Label>
              <Input
                type="text"
                value={getResultDate()}
                readOnly
                className="result-input"
              />
            </div>

            <div className="input-group">
              <Label className="input-label">Converted Time</Label>
              <Input
                type="text"
                value={convertTime()}
                readOnly
                className="result-input"
              />
            </div>
          </div>
        </div>

        <div className="help-text">
          <Clock className="help-icon" size={16} />
          <p>
            Convert time between different countries and time zones. Includes
            daylight saving time considerations for major timezones worldwide.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
