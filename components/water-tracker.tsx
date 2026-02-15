"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Plus, Minus, Settings } from "lucide-react";
import { useWaterTracker } from "@/hooks/use-water-tracker";
import "@/styles/water-tracker.css";

export function WaterTracker() {
  const {
    dailyGoal,
    addWaterIntake,
    removeWaterIntake,
    updateDailyGoal,
    getTodayIntake,
    getTodayIntakes,
  } = useWaterTracker();

  const [customAmount, setCustomAmount] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [goalInput, setGoalInput] = useState(dailyGoal.toString());

  const todayIntake = getTodayIntake();
  const todayIntakes = getTodayIntakes();
  const progress = Math.min((todayIntake / dailyGoal) * 100, 100); // Calculate percentage for custom progress bar

  const quickAmounts = [250, 500, 750, 1000];

  const handleCustomAdd = () => {
    const amount = Number.parseInt(customAmount);
    if (amount > 0) {
      addWaterIntake(amount);
      setCustomAmount("");
    }
  };

  const handleGoalUpdate = () => {
    const newGoal = Number.parseInt(goalInput);
    if (newGoal > 0) {
      updateDailyGoal(newGoal);
      setShowSettings(false);
    }
  };

  return (
    <Card className="water-tracker-card">
      <CardHeader className="water-tracker-header">
        <CardTitle className="water-tracker-title">
          <Droplets className="water-tracker-icon icon-md" />
          Water Tracker
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Settings"
        >
          <Settings className="icon-sm" />
        </Button>
      </CardHeader>
      <CardContent className="water-tracker-content">
        {showSettings && (
          <div className="settings-container">
            <Label htmlFor="goal" className="settings-label">
              Daily Goal (ml)
            </Label>
            <div className="settings-input-group">
              <Input
                id="goal"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                placeholder="2000"
                className="settings-input"
              />
              <Button onClick={handleGoalUpdate} className="settings-button">
                Save
              </Button>
            </div>
          </div>
        )}

        <div className="water-stats">
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-amount">
            {todayIntake}ml / {dailyGoal}ml
          </div>
          <div className="water-progress">
            <div
              className="water-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div
            className={`water-remaining ${
              progress >= 100 ? "goal-achieved" : ""
            }`}
          >
            {progress >= 100
              ? "Goal achieved! 🎉"
              : `${dailyGoal - todayIntake}ml remaining`}
          </div>
          <div className="water-wave"></div>
        </div>

        <div>
          <Label className="section-label">Quick Add</Label>
          <div className="quick-add-container">
            {quickAmounts.map((amount) => (
                <button
                key={amount}
                onClick={() => addWaterIntake(amount)}
                  className="quick-add-button"
              >
                <Plus className="icon-sm" />
                {amount}ml
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="section-label">Custom Amount</Label>
          <div className="custom-amount">
            <Input
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount in ml"
              type="number"
              className="custom-input"
            />
            <Button onClick={handleCustomAdd} className="add-button">
              Add
            </Button>
          </div>
        </div>

        {todayIntakes.length > 0 && (
          <div>
            <Label className="section-label">Today&apos;s Intake</Label>
            <div className="intakes-history">
              {todayIntakes
                .slice(-5)
                .reverse()
                .map((intake) => (
                  <div key={intake.id} className="intake-item">
                    <div>
                      <span className="intake-amount">{intake.amount}ml</span>
                      <span className="intake-time">
                        {" "}
                        at{" "}
                        {new Date(intake.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => removeWaterIntake(intake.id)}
                      aria-label="Delete intake"
                    >
                      <Minus className="icon-xs" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
