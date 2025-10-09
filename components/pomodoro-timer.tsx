"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer, Play, Pause, Square, Settings } from "lucide-react";
import { usePomodoro } from "@/hooks/use-pomodoro";
import styles from "@/styles/pomodoro-timer.css";

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

  return (
    <Card className={styles.timerCard}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.titleContainer}>
          <Timer className={styles.timerIcon} />
          Pomodoro Timer
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className={styles.settingsButton}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSettings && (
          <div className={styles.settingsContainer}>
            <div className={styles.settingsGrid}>
              <div className={styles.settingGroup}>
                <Label className={styles.settingLabel}>
                  Work Duration (min)
                </Label>
                <Input
                  type="number"
                  value={settingsForm.workDuration}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      workDuration: Number.parseInt(e.target.value) || 25,
                    })
                  }
                  className={styles.settingInput}
                />
              </div>
              <div className={styles.settingGroup}>
                <Label className={styles.settingLabel}>Short Break (min)</Label>
                <Input
                  type="number"
                  value={settingsForm.shortBreakDuration}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      shortBreakDuration: Number.parseInt(e.target.value) || 5,
                    })
                  }
                  className={styles.settingInput}
                />
              </div>
              <div className={styles.settingGroup}>
                <Label className={styles.settingLabel}>Long Break (min)</Label>
                <Input
                  type="number"
                  value={settingsForm.longBreakDuration}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      longBreakDuration: Number.parseInt(e.target.value) || 15,
                    })
                  }
                  className={styles.settingInput}
                />
              </div>
              <div className={styles.settingGroup}>
                <Label className={styles.settingLabel}>
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
                  className={styles.settingInput}
                />
              </div>
            </div>
            <Button
              onClick={handleSettingsUpdate}
              className={styles.saveSettingsButton}
            >
              Save Settings
            </Button>
          </div>
        )}

        <div className={styles.timerDisplay}>
          <div className={styles.timeText}>{formatTime(timeLeft)}</div>

          {currentSession && (
            <div className={styles.sessionTypeText}>
              {currentSession.type === "work" ? "Work Session" : "Break Time"}
            </div>
          )}

          <div className={styles.controlsContainer}>
            {!currentSession ? (
              <Button
                onClick={() => startSession(getNextSessionType())}
                className={styles.startButton}
              >
                <Play className="h-4 w-4" />
                Start {getNextSessionType() === "work" ? "Work" : "Break"}
              </Button>
            ) : (
              <>
                {isRunning ? (
                  <Button
                    onClick={pauseSession}
                    variant="outline"
                    className={styles.pauseButton}
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={resumeSession}
                    className={styles.resumeButton}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  onClick={stopSession}
                  variant="destructive"
                  className={styles.stopButton}
                >
                  <Square className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.workSessionsCount}>{workSessions}</div>
            <div className={styles.statLabel}>Work Sessions</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.breakSessionsCount}>{breakSessions}</div>
            <div className={styles.statLabel}>Break Sessions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
