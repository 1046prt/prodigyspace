"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator as CalculatorIcon,
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
import { Calculator } from "@/components/calculator";
import { TimezoneConverter } from "@/components/timezone-converter";
import { QrGenerator } from "@/components/qr-generator";
import { useState, useEffect } from "react";
import {
  getCurrentDate,
  formatTimerTime,
  getAllTimeZones,
  getCurrentDateString,
  getCurrentMonthDays,
  getCurrentMonthYear,
  getTimeSystemInfo,
  WORLD_CLOCK_TIMEZONES,
} from "@/lib/date-utils";
import { FeatureCard, PageHeader } from "@/components/ui-elements";
import "@/styles/utilities.css";

export default function UtilitiesPage() {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [worldTimes, setWorldTimes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("calculator");
  const [isClient, setIsClient] = useState(false);

  // Update current time every second
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(getCurrentDate());
    setWorldTimes(getAllTimeZones());
    const timer = setInterval(() => {
      setCurrentTime(getCurrentDate());
      setWorldTimes(getAllTimeZones());
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

  const quickTools = [
    {
      title: "Unit Converter",
      description: "Convert between different units",
      icon: Ruler,
      color: "blue-badge",
    },
    {
      title: "Timezone Converter",
      description: "Convert time across global timezones",
      icon: Globe,
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
      icon: Wifi,
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
      isClient && typeof navigator !== "undefined"
        ? navigator.userAgent.split(" ")[0]
        : "Unknown",
    platform:
      isClient && typeof navigator !== "undefined"
        ? navigator.platform
        : "Unknown",
    cookiesEnabled:
      isClient && typeof navigator !== "undefined"
        ? navigator.cookieEnabled
        : false,
    onlineStatus:
      isClient && typeof navigator !== "undefined" ? navigator.onLine : false,
    screenResolution:
      isClient && typeof screen !== "undefined"
        ? `${screen.width}x${screen.height}`
        : "Unknown",
    colorDepth:
      isClient && typeof screen !== "undefined" ? screen.colorDepth : 0,
    ...(isClient
      ? getTimeSystemInfo()
      : { timezone: "Unknown", language: "Unknown" }),
  };

  // UTC offset label not currently used in UI — keep function available if needed later
  // const utcOffsetLabel = (() => {
  //   if (!currentTime) return "—";
  //   const utcOffsetMinutes = -currentTime.getTimezoneOffset();
  //   const utcOffsetSign = utcOffsetMinutes >= 0 ? "+" : "-";
  //   const utcOffsetHours = Math.floor(Math.abs(utcOffsetMinutes) / 60)
  //     .toString()
  //     .padStart(2, "0");
  //   const utcOffsetRemainingMinutes = Math.abs(utcOffsetMinutes % 60)
  //     .toString()
  //     .padStart(2, "0");
  //   return `${utcOffsetSign}${utcOffsetHours}:${utcOffsetRemainingMinutes}`;
  // })();

  return (
    <div className="utilities-page">
      <div className="utilities-container">
        <PageHeader
          title="Utilities & Tools"
          subtitle="Helpful tools and utilities for your daily tasks"
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="utilities-tabs-list">
            <TabsTrigger value="calculator" className="utilities-tab-trigger">
              <CalculatorIcon className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="timer" className="utilities-tab-trigger">
              <Timer className="h-4 w-4" />
              Timer
            </TabsTrigger>
            <TabsTrigger
              value="time-conversion"
              className="utilities-tab-trigger"
            >
              <Globe className="h-4 w-4" />
              Time Conversion
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
              <Calculator className="utilities-calculator" />
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
                      {formatTimerTime(timerMinutes, timerSeconds)}
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
                      {getCurrentMonthYear()}
                    </div>
                    <div className="calendar-grid">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div key={day} className="calendar-day-header">
                            {day}
                          </div>
                        ),
                      )}
                      {getCurrentMonthDays().map((day) => (
                        <div
                          key={day}
                          className={`calendar-day ${
                            day === currentTime?.getDate()
                              ? "calendar-day-current"
                              : ""
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="time-conversion" className="space-y-4">
            <div className="utilities-grid utilities-grid-lg-2">
              <TimezoneConverter />
              <Card className="world-clock-card">
                <CardHeader>
                  <CardTitle className="utilities-card-title">
                    <Clock className="h-5 w-5" />
                    World Clock
                  </CardTitle>
                </CardHeader>
                <CardContent className="world-clock-body">
                  <div className="space-y-4 world-clock-content">
                    <div className="world-clock-current">
                      <div className="world-clock-time">
                        {currentTime
                          ? currentTime.toLocaleTimeString()
                          : "Loading..."}
                      </div>
                      <div className="world-clock-date">
                        {currentTime ? getCurrentDateString() : ""}
                      </div>
                    </div>
                    <div className="world-clock-grid">
                      {Object.entries(WORLD_CLOCK_TIMEZONES).map(([city]) => (
                        <div key={city} className="world-clock-zone">
                          <div className="world-clock-zone-name">{city}</div>
                          <div className="world-clock-zone-time">
                            {worldTimes[city] || "Loading..."}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="utilities-tools-section">
            <div className="utilities-tools-block">
              <div className="utilities-tools-heading">
                <div>
                  <h3 className="utilities-tools-title">Core Utilities</h3>
                  <p className="utilities-tools-subtitle">
                    Everyday converters to keep your workflow moving.
                  </p>
                </div>
                <Badge className="utilities-tools-pill" variant="secondary">
                  Live
                </Badge>
              </div>
              <div className="utilities-grid utilities-grid-lg-2 utilities-tools-primary">
                <UnitConverter />
                <TimezoneConverter />
                <QrGenerator />
              </div>
            </div>

            <div className="utilities-tools-block">
              <div className="utilities-tools-heading">
                <div>
                  <h3 className="utilities-tools-title">Quick Tools</h3>
                  <p className="utilities-tools-subtitle">
                    Small helpers you can launch in seconds.
                  </p>
                </div>
                <Badge className="utilities-tools-pill" variant="secondary">
                  Coming Soon
                </Badge>
              </div>
              <div className="utilities-grid utilities-grid-md-3 utilities-tools-grid">
                {quickTools.map((tool, index) => (
                  <FeatureCard
                    key={index}
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    badgeColor={tool.color}
                  />
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
                      <span className="system-info-value">
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
