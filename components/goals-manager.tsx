"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Plus,
  Target as TargetIcon,
  Check,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { WellbeingGoal } from "@/types/wellbeing";

import "@/styles/goals-manager.css";

interface GoalsManagerProps {
  goals: WellbeingGoal[];
  onAddGoal: (goal: Omit<WellbeingGoal, "id" | "createdAt">) => void;
  onUpdateProgress: (goalId: string, progress: number) => void;
}

const goalCategories = [
  { value: "mood", label: "Mood" },
  { value: "stress", label: "Stress Management" },
  { value: "focus", label: "Focus & Concentration" },
  { value: "sleep", label: "Sleep Quality" },
  { value: "exercise", label: "Physical Activity" },
];

export function GoalsManager({
  goals,
  onAddGoal,
  onUpdateProgress,
}: GoalsManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<WellbeingGoal["category"]>("mood");
  const [target, setTarget] = useState(10);

  const [unit, setUnit] = useState("sessions");
  const [deadline, setDeadline] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && target > 0 && deadline) {
      onAddGoal({
        title,
        description,
        category,
        target,
        current: 0,
        unit,
        deadline,
      });
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("mood");
      setTarget(10);
      setUnit("sessions");
      setDeadline(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
      setShowAddForm(false);
    }
  };

  const handleProgressUpdate = (goalId: string, increment: number) => {
    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      const newProgress = Math.min(goal.current + increment, goal.target);
      onUpdateProgress(goalId, newProgress);
    }
  };

  const getProgressPercentage = (goal: WellbeingGoal) => {
    return Math.round((goal.current / goal.target) * 100);
  };

  const isGoalCompleted = (goal: WellbeingGoal) => {
    return goal.current >= goal.target;
  };

  const isGoalOverdue = (goal: WellbeingGoal) => {
    return new Date() > new Date(goal.deadline) && !isGoalCompleted(goal);
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2 className="goals-title">Well-being Goals</h2>
        <Button
          className={showAddForm ? "cancel-goal-btn" : "add-goal-btn"}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="goal-btn-icon" />
          {showAddForm ? "Cancel" : "Add Goal"}
        </Button>
      </div>

      {showAddForm && (
        <Card className="goal-form-card">
          <CardHeader className="goal-form-header">
            <CardTitle className="goal-form-title">Create New Goal</CardTitle>
          </CardHeader>
          <CardContent className="goal-form-content">
            <form onSubmit={handleSubmit} className="goal-form">
              <div className="goal-form-group">
                <Label htmlFor="title" className="goal-form-label">
                  Goal Title
                </Label>
                <Input
                  id="title"
                  className="goal-form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Meditate for 10 days"
                  required
                />
              </div>

              <div className="goal-form-group">
                <Label htmlFor="description" className="goal-form-label">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="goal-form-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your goal..."
                />
              </div>

              <div className="goal-form-grid">
                <div className="goal-form-group">
                  <Label htmlFor="category" className="goal-form-label">
                    Category
                  </Label>
                  <Select
                    value={category}
                    onValueChange={(value: WellbeingGoal["category"]) =>
                      setCategory(value)
                    }
                  >
                    <SelectTrigger className="goal-form-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {goalCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="goal-form-group">
                  <Label htmlFor="target" className="goal-form-label">
                    Target
                  </Label>
                  <Input
                    id="target"
                    className="goal-form-input"
                    type="number"
                    min="1"
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="goal-form-grid">
                <div className="goal-form-group">
                  <Label htmlFor="unit" className="goal-form-label">
                    Unit
                  </Label>
                  <Input
                    id="unit"
                    className="goal-form-input"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g., sessions, minutes, days"
                    required
                  />
                </div>

                <div className="goal-form-group">
                  <Label className="goal-form-label">Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "goal-date-picker",
                          !deadline && "goal-date-picker-empty"
                        )}
                      >
                        <CalendarIcon className="calendar-icon" />
                        {deadline ? (
                          format(deadline, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="goal-form-actions">
                <Button type="submit" className="goal-submit-btn add-goal-btn">
                  Create Goal
                </Button>
                <Button
                  type="button"
                  className="cancel-goal-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {goals.length === 0 ? (
        <div className="goals-empty-state">
          <TargetIcon className="goals-empty-icon" />
          <h3 className="goals-empty-title">No goals yet</h3>
          <p className="goals-empty-description">
            Create your first well-being goal to get started on your path to
            better health.
          </p>
          <Button
            className="goals-empty-btn add-goal-btn"
            onClick={() => setShowAddForm(true)}
          >
            Create Your First Goal
          </Button>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className={cn(
                "goal-card",
                isGoalOverdue(goal) ? "goal-card-overdue" : ""
              )}
            >
              <CardHeader className="goal-card-header">
                <div className="goal-card-title-row">
                  <div>
                    <CardTitle className="goal-card-title">
                      {goal.title}
                    </CardTitle>
                    {goal.description && (
                      <p className="goal-card-description">
                        {goal.description}
                      </p>
                    )}
                  </div>
                  <span className="goal-card-tag">
                    {
                      goalCategories.find((c) => c.value === goal.category)
                        ?.label
                    }
                  </span>
                </div>
              </CardHeader>
              <CardContent className="goal-card-content">
                <div className="goal-progress-container">
                  <div className="goal-progress-header">
                    <span>
                      {goal.current} of {goal.target} {goal.unit}
                    </span>
                    <span>{getProgressPercentage(goal)}%</span>
                  </div>
                  <div className="goal-progress-bar">
                    <div
                      className={`goal-progress-fill progress-${
                        Math.round(getProgressPercentage(goal) / 5) * 5
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="goal-dates">
                  <span>
                    Deadline: {format(new Date(goal.deadline), "MMM d, yyyy")}
                  </span>
                  <span>
                    Created: {format(new Date(goal.createdAt), "MMM d, yyyy")}
                  </span>
                </div>

                {!isGoalCompleted(goal) && (
                  <div className="goal-actions">
                    <Button
                      className="goal-action-btn goal-action-primary"
                      onClick={() => handleProgressUpdate(goal.id, 1)}
                      disabled={isGoalCompleted(goal)}
                    >
                      +1 {goal.unit}
                    </Button>
                    <Button
                      className="goal-action-btn goal-action-secondary"
                      onClick={() => handleProgressUpdate(goal.id, 5)}
                      disabled={isGoalCompleted(goal)}
                    >
                      +5 {goal.unit}
                    </Button>
                  </div>
                )}

                {isGoalCompleted(goal) && (
                  <div className="goal-status-complete">
                    <Check className="goal-status-icon" />
                    Goal completed! 🎉
                  </div>
                )}

                {isGoalOverdue(goal) && !isGoalCompleted(goal) && (
                  <div className="goal-status-overdue">
                    <AlertTriangle className="goal-status-icon" />
                    Goal overdue!
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
