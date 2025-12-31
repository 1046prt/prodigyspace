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
  Settings,
  Zap,
  Timer,
  Ruler,
  Hash,
  Globe,
  Wifi,
  Monitor,
} from "lucide-react";
import { useState, useEffect } from "react";

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
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Color Picker",
      description: "Pick and convert colors",
      icon: Palette,
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Text Counter",
      description: "Count words and characters",
      icon: Hash,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "QR Generator",
      description: "Generate QR codes",
      icon: Globe,
      color: "bg-orange-100 text-orange-800",
    },
    {
      title: "Password Generator",
      description: "Generate secure passwords",
      icon: Zap,
      color: "bg-red-100 text-red-800",
    },
    {
      title: "Base64 Encoder",
      description: "Encode/decode Base64",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-800",
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Utilities & Tools
          </h1>
          <p className="text-muted-foreground mt-2">
            Helpful tools and utilities for your daily tasks
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Timer
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-right text-sm text-muted-foreground mb-1">
                        {calculatorInput || "0"}
                      </div>
                      <div className="text-right text-2xl font-bold">
                        {calculatorResult || "0"}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["C", "±", "%", "÷"].map((btn) => (
                        <Button
                          key={btn}
                          variant="outline"
                          onClick={() => handleCalculatorInput(btn)}
                          className="h-12"
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
                          className="h-12"
                        >
                          {btn}
                        </Button>
                      ))}
                      {["4", "5", "6", "-"].map((btn) => (
                        <Button
                          key={btn}
                          variant="outline"
                          onClick={() => handleCalculatorInput(btn)}
                          className="h-12"
                        >
                          {btn}
                        </Button>
                      ))}
                      {["1", "2", "3", "+"].map((btn) => (
                        <Button
                          key={btn}
                          variant="outline"
                          onClick={() => handleCalculatorInput(btn)}
                          className="h-12"
                        >
                          {btn}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handleCalculatorInput("0")}
                        className="h-12 col-span-2"
                      >
                        0
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleCalculatorInput(".")}
                        className="h-12"
                      >
                        .
                      </Button>
                      <Button
                        onClick={() => handleCalculatorInput("=")}
                        className="h-12"
                      >
                        =
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    World Clock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        {currentTime.toLocaleTimeString()}
                      </div>
                      <div className="text-muted-foreground">
                        {currentTime.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold">New York</div>
                        <div className="text-sm">
                          {new Date().toLocaleTimeString("en-US", {
                            timeZone: "America/New_York",
                          })}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold">London</div>
                        <div className="text-sm">
                          {new Date().toLocaleTimeString("en-US", {
                            timeZone: "Europe/London",
                          })}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold">Tokyo</div>
                        <div className="text-sm">
                          {new Date().toLocaleTimeString("en-US", {
                            timeZone: "Asia/Tokyo",
                          })}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold">Sydney</div>
                        <div className="text-sm">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="h-5 w-5" />
                    Pomodoro Timer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <div className="text-6xl font-bold text-primary">
                      {formatTime(timerMinutes, timerSeconds)}
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button
                        onClick={startTimer}
                        disabled={isTimerRunning}
                        className="w-20"
                      >
                        Start
                      </Button>
                      <Button
                        onClick={pauseTimer}
                        disabled={!isTimerRunning}
                        variant="outline"
                        className="w-20"
                      >
                        Pause
                      </Button>
                      <Button
                        onClick={resetTimer}
                        variant="outline"
                        className="w-20"
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="flex justify-center gap-2">
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
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Quick Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-bold">
                      {currentTime.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-sm">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="p-2 font-semibold text-center"
                          >
                            {day}
                          </div>
                        )
                      )}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <div
                            key={day}
                            className={`p-2 text-center rounded ${
                              day === currentTime.getDate()
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickTools.map((tool, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <Badge className={tool.color} variant="secondary">
                          Coming Soon
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    System Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Browser:</span>
                      <span className="font-medium">{systemInfo.browser}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform:</span>
                      <span className="font-medium">{systemInfo.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="font-medium">{systemInfo.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cookies:</span>
                      <span className="font-medium">
                        {systemInfo.cookiesEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Online:</span>
                      <span className="font-medium">
                        {systemInfo.onlineStatus ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Screen:</span>
                      <span className="font-medium">
                        {systemInfo.screenResolution}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Color Depth:
                      </span>
                      <span className="font-medium">
                        {systemInfo.colorDepth} bit
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timezone:</span>
                      <span className="font-medium">{systemInfo.timezone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Connection Status</span>
                      <Badge
                        variant={
                          systemInfo.onlineStatus ? "default" : "destructive"
                        }
                      >
                        {systemInfo.onlineStatus ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <div className="text-center py-8">
                      <Wifi className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
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
