"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer, Play, Pause, Square, Settings } from "lucide-react";
import { usePomodoro } from "@/hooks/use-pomodoro";
import "@/styles/pomodoro-timer.css";

export function PomodoroTimer() {
  const {
    settings,
    currentSession,
    timeLeft,
    isRunning,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    updateSettings,
    formatTime,
    getTodaySessions,
  } = usePomodoro();

  const [showSettings, setShowSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState(settings);

  const todaySessions = getTodaySessions();
  const workSessions = todaySessions.filter((s) => s.type === "work").length;
  const breakSessions = todaySessions.filter((s) => s.type === "break").length;

  const handleSettingsUpdate = () => {
    updateSettings(settingsForm);
    setShowSettings(false);
  };

  const getNextSessionType = (): "work" | "break" => {
    if (!currentSession) {
      return workSessions === 0 ? "work" : "break";
    }
    return currentSession.type === "work" ? "break" : "work";
  };

  // Calculate progress percentage
  const timerProgress = currentSession
    ? ((currentSession.duration * 60 - timeLeft) /
        (currentSession.duration * 60)) *
      100
    : 0;

  return (
    <Card className="pomodoro-card">
      <CardHeader className="pomodoro-header flex flex-row items-center justify-between">
        <CardTitle className="pomodoro-title">
          <Timer className="timer-icon icon-md" />
          Pomodoro Timer
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="settings-button"
          aria-label="Settings"
        >
          <Settings className="icon-sm" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-6 pt-4 pb-8">
        {showSettings && (
          <div className="settings-container">
            <div className="settings-grid">
              <div className="setting-group">
                <Label className="setting-label">Work Duration (min)</Label>
                <Input
                  type="number"
                  value={settingsForm.workDuration}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      workDuration: Number.parseInt(e.target.value) || 25,
                    })
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-group">
                <Label className="setting-label">Short Break (min)</Label>
                <Input
                  type="number"
                  value={settingsForm.shortBreakDuration}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      shortBreakDuration: Number.parseInt(e.target.value) || 5,
                    })
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-group">
                <Label className="setting-label">Long Break (min)</Label>
                <Input
                  type="number"
                  value={settingsForm.longBreakDuration}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      longBreakDuration: Number.parseInt(e.target.value) || 15,
                    })
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-group">
                <Label className="setting-label">
                  Sessions Until Long Break
                </Label>
                <Input
                  type="number"
                  value={settingsForm.sessionsUntilLongBreak}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      sessionsUntilLongBreak:
                        Number.parseInt(e.target.value) || 4,
                    })
                  }
                  className="setting-input"
                />
              </div>
            </div>
            <Button
              onClick={handleSettingsUpdate}
              className="save-settings-button"
            >
              Save Settings
            </Button>
          </div>
        )}

        <div className={`timer-display ${isRunning ? "running" : ""}`}>
          <div className="timer-progress">
            <div
              className="timer-progress-fill"
              style={{ width: `${timerProgress}%` }}
            ></div>
          </div>
          <div className="time-text">{formatTime(timeLeft)}</div>

          {currentSession && (
            <div className="session-type">
              {currentSession.type === "work" ? "Work Session" : "Break Time"}
            </div>
          )}

          <div className="controls">
            {!currentSession ? (
              <button
                onClick={() => startSession(getNextSessionType())}
                className="start-button"
                aria-label={`Start ${getNextSessionType()} session`}
              >
                <Play />
              </button>
            ) : (
              <>
                {isRunning ? (
                  <button
                    onClick={pauseSession}
                    className="pause-button"
                    aria-label="Pause session"
                  >
                    <Pause />
                  </button>
                ) : (
                  <button
                    onClick={resumeSession}
                    className="resume-button"
                    aria-label="Resume session"
                  >
                    <Play />
                  </button>
                )}
                <button
                  onClick={stopSession}
                  className="stop-button"
                  aria-label="Stop session"
                >
                  <Square />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="work-count">{workSessions}</div>
            <div className="stat-label">Work Sessions</div>
          </div>
          <div className="stat-card">
            <div className="break-count">{breakSessions}</div>
            <div className="stat-label">Break Sessions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
