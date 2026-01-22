"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  Clock,
  Calendar,
  FileText,
  Palette,
  Zap,
  Timer,
  Ruler,
  Hash,
  Globe,
  Wifi,
  Monitor,
} from "lucide-react";
import { UnitConverter } from "@/components/unit-converter";
import { useState, useEffect } from "react";
import "@/styles/utilities.css";

export default function UtilitiesPage() {
  const [calculatorInput, setCalculatorInput] = useState("");
  const [calculatorResult, setCalculatorResult] = useState("");
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pomodoro timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        }
      }, 1000);
    } else if (timerMinutes === 0 && timerSeconds === 0) {
      setIsTimerRunning(false);
      // Timer finished - could add notification here
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  const handleCalculatorInput = (value: string) => {
    if (value === "=") {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(calculatorInput);
        setCalculatorResult(result.toString());
      } catch {
        setCalculatorResult("Error");
      }
    } else if (value === "C") {
      setCalculatorInput("");
      setCalculatorResult("");
    } else {
      setCalculatorInput(calculatorInput + value);
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const quickTools = [
    {
      title: "Unit Converter",
      description: "Convert between different units",
      icon: Ruler,
      color: "blue-badge",
    },
    {
      title: "Color Picker",
      description: "Pick and convert colors",
      icon: Palette,
      color: "purple-badge",
    },
    {
      title: "Text Counter",
      description: "Count words and characters",
      icon: Hash,
      color: "green-badge",
    },
    {
      title: "QR Generator",
      description: "Generate QR codes",
      icon: Globe,
      color: "orange-badge",
    },
    {
      title: "Password Generator",
      description: "Generate secure passwords",
      icon: Zap,
      color: "red-badge",
    },
    {
      title: "Base64 Encoder",
      description: "Encode/decode Base64",
      icon: FileText,
      color: "indigo-badge",
    },
  ];

  const systemInfo = {
    browser:
      typeof navigator !== "undefined"
        ? navigator.userAgent.split(" ")[0]
        : "Unknown",
    platform: typeof navigator !== "undefined" ? navigator.platform : "Unknown",
    language: typeof navigator !== "undefined" ? navigator.language : "Unknown",
    cookiesEnabled:
      typeof navigator !== "undefined" ? navigator.cookieEnabled : false,
    onlineStatus: typeof navigator !== "undefined" ? navigator.onLine : false,
    screenResolution:
      typeof screen !== "undefined"
        ? `${screen.width}x${screen.height}`
        : "Unknown",
    colorDepth: typeof screen !== "undefined" ? screen.colorDepth : 0,
    timezone:
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "Unknown",
  };

  return (
    <div className="utilities-page">
      <div className="utilities-container">
        <div className="utilities-header">
          <h1 className="utilities-title">Utilities & Tools</h1>
          <p className="utilities-subtitle">
            Helpful tools and utilities for your daily tasks
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="utilities-tabs-list">
            <TabsTrigger value="calculator" className="utilities-tab-trigger">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="timer" className="utilities-tab-trigger">
              <Timer className="h-4 w-4" />
              Timer
            </TabsTrigger>
            <TabsTrigger value="tools" className="utilities-tab-trigger">
              <Ruler className="h-4 w-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="system" className="utilities-tab-trigger">
              <Monitor className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            <div className="utilities-grid utilities-grid-lg-2">
              <Card>
                <CardHeader>
                  <CardTitle className="utilities-card-title">
                    <Calculator className="h-5 w-5" />
                    Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="calculator-display">
                      <div className="calculator-input">
                        {calculatorInput || "0"}
                      </div>
                      <div className="calculator-result">
                        {calculatorResult || "0"}
                      </div>
                    </div>
                    <div className="calculator-buttons">
                      {["C", "±", "%", "÷"].map((btn) => (
                        <Button
                          key={btn}
                          variant="outline"
                          onClick={() => handleCalculatorInput(btn)}
                          className="calculator-button"
                        >
                          {btn}
                        </Button>
                      ))}
                      {["7", "8", "9", "×"].map((btn) => (
                        <Button
                          key={btn}
                          variant="outline"
                          onClick={() =>
                            handleCalculatorInput(btn === "×" ? "*" : btn)
                          }
                          className="calculator-button"
                        >
                          {btn}
                        </Button>
                      ))}
                      {["4", "5", "6", "-"].map((btn) => (
                        <Button
                          key={btn}
                          variant="outline"
                          onClick={() => handleCalculatorInput(btn)}
                          className="calculator-button"
                        >
                          {btn}
                        </Button>
                      ))}
                      {["1", "2", "3", "+"].map((btn) => (
                        <Button
                          key={btn}
                          variant="outline"
                          onClick={() => handleCalculatorInput(btn)}
                          className="calculator-button"
                        >
                          {btn}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handleCalculatorInput("0")}
                        className="calculator-button calculator-button-wide"
                      >
                        0
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleCalculatorInput(".")}
                        className="calculator-button"
                      >
                        .
                      </Button>
                      <Button
                        onClick={() => handleCalculatorInput("=")}
                        className="calculator-button"
                      >
                        =
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="utilities-card-title">
                    <Clock className="h-5 w-5" />
                    World Clock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="world-clock-current">
                      <div className="world-clock-time">
                        {currentTime.toLocaleTimeString()}
                      </div>
                      <div className="world-clock-date">
                        {currentTime.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="world-clock-grid">
                      <div className="world-clock-zone">
                        <div className="world-clock-zone-name">New York</div>
                        <div className="world-clock-zone-time">
                          {new Date().toLocaleTimeString("en-US", {
                            timeZone: "America/New_York",
                          })}
                        </div>
                      </div>
                      <div className="world-clock-zone">
                        <div className="world-clock-zone-name">London</div>
                        <div className="world-clock-zone-time">
                          {new Date().toLocaleTimeString("en-US", {
                            timeZone: "Europe/London",
                          })}
                        </div>
                      </div>
                      <div className="world-clock-zone">
                        <div className="world-clock-zone-name">Tokyo</div>
                        <div className="world-clock-zone-time">
                          {new Date().toLocaleTimeString("en-US", {
                            timeZone: "Asia/Tokyo",
                          })}
                        </div>
                      </div>
                      <div className="world-clock-zone">
                        <div className="world-clock-zone-name">Sydney</div>
                        <div className="world-clock-zone-time">
                          {new Date().toLocaleTimeString("en-US", {
                            timeZone: "Australia/Sydney",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timer" className="space-y-4">
            <div className="utilities-grid utilities-grid-lg-2">
              <Card>
                <CardHeader>
                  <CardTitle className="utilities-card-title">
                    <Timer className="h-5 w-5" />
                    Pomodoro Timer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="timer-container">
                    <div className="timer-display">
                      {formatTime(timerMinutes, timerSeconds)}
                    </div>
                    <div className="timer-controls">
                      <Button
                        onClick={startTimer}
                        disabled={isTimerRunning}
                        className="timer-button"
                      >
                        Start
                      </Button>
                      <Button
                        onClick={pauseTimer}
                        disabled={!isTimerRunning}
                        variant="outline"
                        className="timer-button"
                      >
                        Pause
                      </Button>
                      <Button
                        onClick={resetTimer}
                        variant="outline"
                        className="timer-button"
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="timer-presets">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTimerMinutes(25);
                          setTimerSeconds(0);
                          setIsTimerRunning(false);
                        }}
                      >
                        25 min
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTimerMinutes(15);
                          setTimerSeconds(0);
                          setIsTimerRunning(false);
                        }}
                      >
                        15 min
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTimerMinutes(5);
                          setTimerSeconds(0);
                          setIsTimerRunning(false);
                        }}
                      >
                        5 min
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="utilities-card-title">
                    <Calendar className="h-5 w-5" />
                    Quick Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="calendar-container">
                    <div className="calendar-header">
                      {currentTime.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="calendar-grid">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div key={day} className="calendar-day-header">
                            {day}
                          </div>
                        )
                      )}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <div
                            key={day}
                            className={`calendar-day ${
                              day === currentTime.getDate()
                                ? "calendar-day-current"
                                : ""
                            }`}
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            <div className="utilities-grid utilities-grid-lg-2">
              <UnitConverter />

              <div className="utilities-grid utilities-grid-md-1">
                {quickTools.map((tool, index) => (
                  <Card key={index} className="utilities-tool-card">
                    <CardHeader className="pb-3">
                      <div className="utilities-tool-header">
                        <div className="utilities-tool-icon">
                          <tool.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {tool.title}
                          </CardTitle>
                          <Badge className={tool.color} variant="secondary">
                            Coming Soon
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="utilities-tool-description">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="utilities-grid utilities-grid-md-2">
              <Card>
                <CardHeader>
                  <CardTitle className="utilities-card-title">
                    <Monitor className="h-5 w-5" />
                    System Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="system-info-grid">
                    <div className="system-info-item">
                      <span className="system-info-label">Browser:</span>
                      <span className="system-info-value">
                        {systemInfo.browser}
                      </span>
                    </div>
                    <div className="system-info-item">
                      <span className="system-info-label">Platform:</span>
                      <span className="system-info-value">
                        {systemInfo.platform}
                      </span>
                    </div>
                    <div className="system-info-item">
                      <span className="system-info-label">Language:</span>
                      <span className="system-info-label">
                        {systemInfo.language}
                      </span>
                    </div>
                    <div className="system-info-item">
                      <span className="system-info-label">Cookies:</span>
                      <span className="system-info-value">
                        {systemInfo.cookiesEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    <div className="system-info-item">
                      <span className="system-info-label">Online:</span>
                      <span className="system-info-value">
                        {systemInfo.onlineStatus ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="system-info-item">
                      <span className="system-info-label">Screen:</span>
                      <span className="system-info-value">
                        {systemInfo.screenResolution}
                      </span>
                    </div>
                    <div className="system-info-item">
                      <span className="system-info-label">Color Depth:</span>
                      <span className="system-info-value">
                        {systemInfo.colorDepth} bit
                      </span>
                    </div>
                    <div className="system-info-item">
                      <span className="system-info-label">Timezone:</span>
                      <span className="system-info-value">
                        {systemInfo.timezone}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="utilities-card-title">
                    <Wifi className="h-5 w-5" />
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="network-status">
                      <span>Connection Status</span>
                      <Badge
                        variant={
                          systemInfo.onlineStatus ? "default" : "destructive"
                        }
                      >
                        {systemInfo.onlineStatus ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <div className="network-placeholder">
                      <Wifi className="network-icon" />
                      <p className="network-placeholder-text">
                        Network diagnostics and speed test tools would appear
                        here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
