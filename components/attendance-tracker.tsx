"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAttendance } from "@/hooks/use-attendance";
import {
  Plus,
  Check,
  X,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Calendar,
  BookOpen,
  Target,
  Trash2,
} from "lucide-react";

export function AttendanceTracker() {
  const {
    subjects,
    loading,
    addSubject,
    markPresent,
    markAbsent,
    deleteSubject,
    calculateStats,
  } = useAttendance();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: "",
    totalClasses: "",
    attendedClasses: "",
    targetPercentage: "75",
  });

  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleAddSubject = () => {
    // Reset any previous errors
    setError(null);

    // Validate inputs
    if (!newSubject.name.trim()) {
      setError("Subject name is required");
      return;
    }

    const total = parseInt(newSubject.totalClasses) || 0;
    const attended = parseInt(newSubject.attendedClasses) || 0;
    const target = parseInt(newSubject.targetPercentage) || 75;

    if (attended > total) {
      setError("Attended classes cannot be more than total classes");
      return;
    }

    try {
      // Check for duplicate names
      const duplicateName = subjects.some(
        (subject) =>
          subject.name.toLowerCase() === newSubject.name.trim().toLowerCase()
      );

      if (duplicateName) {
        setError("A subject with this name already exists");
        return;
      }

      // Call the addSubject function with the proper values
      addSubject(newSubject.name.trim(), total, attended, target);

      // Show success feedback
      setFeedback({
        message: `Added subject: ${newSubject.name}`,
        type: "success",
      });

      // Reset form first
      setNewSubject({
        name: "",
        totalClasses: "",
        attendedClasses: "",
        targetPercentage: "75",
      });

      // Close the dialog immediately
      setIsAddDialogOpen(false);

      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error("Failed to add subject:", err);
      setError(
        `Failed to add subject: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };
  if (loading) {
    return (
      <Card className="attendance-loading-card">
        <CardContent>
          <div className="attendance-loading-content">
            <div className="attendance-loading-spinner"></div>
            <div className="attendance-loading-text">
              Loading attendance data...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="attendance-container">
      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`attendance-feedback attendance-feedback-${feedback.type}`}
        >
          {feedback.type === "success" ? (
            <Check className="attendance-feedback-icon" />
          ) : (
            <X className="attendance-feedback-icon" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Header */}
      <Card className="attendance-header">
        <CardHeader>
          <div className="attendance-header-content">
            <div>
              <CardTitle className="attendance-title">
                <GraduationCap className="attendance-title-icon" />
                <span className="attendance-title-text">
                  Attendance Tracker
                </span>
              </CardTitle>
              <CardDescription className="attendance-subtitle">
                Track your class attendance and maintain your target percentage
              </CardDescription>
            </div>
            <Button
              className="attendance-btn attendance-btn-primary attendance-btn-scale"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="attendance-btn-icon" />
              Add Subject
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogContent
                className="attendance-dialog-content"
                showCloseButton={false}
              >
                <button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="attendance-dialog-close-btn"
                  aria-label="Close dialog"
                >
                  <X />
                </button>
                <DialogHeader className="attendance-dialog-header">
                  <DialogTitle className="attendance-dialog-title">
                    <Plus className="attendance-dialog-icon" />
                    Add New Subject
                  </DialogTitle>
                  <DialogDescription className="attendance-dialog-description">
                    Enter the subject details and current attendance status
                  </DialogDescription>
                </DialogHeader>
                <div className="attendance-dialog-form">
                  <div className="attendance-form-group">
                    <Label
                      htmlFor="subject-name"
                      className="attendance-form-label"
                    >
                      Subject Name
                    </Label>
                    <Input
                      id="subject-name"
                      placeholder="e.g., Mathematics"
                      className="attendance-form-input"
                      value={newSubject.name}
                      onChange={(e) =>
                        setNewSubject((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="attendance-form-row">
                    <div className="attendance-form-group">
                      <Label
                        htmlFor="total-classes"
                        className="attendance-form-label"
                      >
                        Total Classes
                      </Label>
                      <Input
                        id="total-classes"
                        type="number"
                        min="0"
                        placeholder="0"
                        className="attendance-form-input"
                        value={newSubject.totalClasses}
                        onChange={(e) =>
                          setNewSubject((prev) => ({
                            ...prev,
                            totalClasses: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="attendance-form-group">
                      <Label
                        htmlFor="attended-classes"
                        className="attendance-form-label"
                      >
                        Classes Attended
                      </Label>
                      <Input
                        id="attended-classes"
                        type="number"
                        min="0"
                        max={newSubject.totalClasses || "0"}
                        placeholder="0"
                        className="attendance-form-input"
                        value={newSubject.attendedClasses}
                        onChange={(e) =>
                          setNewSubject((prev) => ({
                            ...prev,
                            attendedClasses: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="attendance-form-group">
                    <div className="attendance-form-label-container">
                      <Label
                        htmlFor="target-percentage"
                        className="attendance-form-label"
                      >
                        Target Percentage
                      </Label>
                      <span className="attendance-target-explanation">
                        Minimum attendance goal
                      </span>
                    </div>
                    <div className="attendance-target-container">
                      <div
                        className="attendance-percentage-preview"
                        style={{
                          background: `conic-gradient(
                          var(--color-primary-400) ${newSubject.targetPercentage}%, 
                          var(--muted) ${newSubject.targetPercentage}% 100%
                        )`,
                        }}
                      >
                        <div className="attendance-percentage-inner">
                          <span className="attendance-percentage-value">
                            {newSubject.targetPercentage}%
                          </span>
                        </div>
                      </div>
                      <div className="attendance-slider-controls">
                        <div className="attendance-range-container">
                          <Input
                            id="target-percentage"
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            className="attendance-range-input"
                            style={
                              {
                                "--value": newSubject.targetPercentage,
                              } as React.CSSProperties
                            }
                            value={newSubject.targetPercentage}
                            onChange={(e) =>
                              setNewSubject((prev) => ({
                                ...prev,
                                targetPercentage: e.target.value,
                              }))
                            }
                          />
                          <div className="attendance-range-marks">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                          </div>
                        </div>
                        <div className="attendance-preset-buttons">
                          {[75, 80, 85, 90].map((value) => (
                            <button
                              key={value}
                              type="button"
                              className={`attendance-preset-btn ${
                                parseInt(newSubject.targetPercentage) === value
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setNewSubject((prev) => ({
                                  ...prev,
                                  targetPercentage: value.toString(),
                                }))
                              }
                            >
                              {value}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {error && (
                    <div className="attendance-error-message">{error}</div>
                  )}
                  <Button
                    onClick={handleAddSubject}
                    className="attendance-dialog-submit-btn"
                  >
                    <Plus className="attendance-btn-icon" />
                    Add Subject
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Subjects List */}
      {subjects.length === 0 ? (
        <Card className="attendance-empty-state">
          <CardContent className="attendance-empty-content">
            <div className="attendance-empty-icon-container">
              <BookOpen className="attendance-empty-icon" />
            </div>
            <h3 className="attendance-empty-title">No subjects added yet</h3>
            <p className="attendance-empty-description">
              Start tracking your attendance by adding a subject
            </p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="attendance-btn attendance-btn-primary attendance-btn-first"
            >
              <Plus className="attendance-btn-icon" />
              Add Your First Subject
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="attendance-subjects-grid">
          {subjects.map((subject) => {
            const stats = calculateStats(subject);

            return (
              <Card
                key={subject.id}
                className="relative attendance-subject-card"
              >
                <CardHeader className="attendance-subject-header-inner">
                  <div className="attendance-subject-header-content">
                    <div>
                      <CardTitle className="attendance-subject-name">
                        {subject.name}
                      </CardTitle>
                      <CardDescription className="attendance-classes-info">
                        <BookOpen className="attendance-classes-icon" />
                        <span>
                          {subject.attendedClasses}/{subject.totalClasses}{" "}
                          classes
                        </span>
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="attendance-delete-btn"
                        >
                          <Trash2 className="attendance-icon-small" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="attendance-delete-dialog">
                        <DialogHeader>
                          <DialogTitle>Delete Subject</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete &ldquo;
                            {subject.name}&rdquo;? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="attendance-delete-actions">
                          <Button
                            variant="outline"
                            onClick={() => {
                              const closeButton = document.querySelector(
                                '.attendance-delete-dialog button[data-state="open"]'
                              ) as HTMLButtonElement | null;
                              if (closeButton) closeButton.click();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              deleteSubject(subject.id);
                              const closeButton = document.querySelector(
                                '.attendance-delete-dialog button[data-state="open"]'
                              ) as HTMLButtonElement | null;
                              if (closeButton) closeButton.click();
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="attendance-subject-content">
                  {/* Attendance Percentage */}
                  <div className="space-y-2 attendance-progress-section">
                    <div className="attendance-progress-header">
                      <span className="attendance-progress-label">
                        Current Attendance
                      </span>
                      <div className="attendance-progress-value-container">
                        <Badge
                          variant={stats.isOnTrack ? "default" : "destructive"}
                          className="attendance-progress-value"
                        >
                          {stats.currentPercentage.toFixed(1)}%
                        </Badge>
                        {stats.isOnTrack ? (
                          <TrendingUp className="attendance-trend-icon attendance-trend-up" />
                        ) : (
                          <TrendingDown className="attendance-trend-icon attendance-trend-down" />
                        )}
                      </div>
                    </div>
                    <div className="attendance-progress-bar">
                      <Progress
                        value={Math.min(stats.currentPercentage, 100)}
                        max={100}
                        className={`h-2 attendance-progress-fill ${
                          stats.isOnTrack
                            ? "attendance-progress-fill-on-track"
                            : "attendance-progress-fill-danger"
                        }`}
                      />
                    </div>
                    <div className="attendance-target-info">
                      <span>Target: {subject.targetPercentage}%</span>
                      <span>
                        {stats.currentPercentage >= subject.targetPercentage
                          ? "On Track"
                          : "Below Target"}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    {stats.isOnTrack ? (
                      <div className="attendance-trend attendance-trend-up">
                        <Target className="attendance-target-icon" />
                        <span>
                          Can skip {stats.classesToSkip} more class
                          {stats.classesToSkip !== 1 ? "es" : ""}
                        </span>
                      </div>
                    ) : (
                      <div className="attendance-trend attendance-trend-down">
                        <Target className="attendance-target-icon" />
                        <span>
                          Need to attend {stats.classesNeeded} more class
                          {stats.classesNeeded !== 1 ? "es" : ""} consecutively
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="attendance-actions attendance-footer">
                    <Button
                      onClick={() => {
                        markPresent(subject.id);
                        setFeedback({
                          message: `Marked ${subject.name} as present`,
                          type: "success",
                        });
                        setTimeout(() => setFeedback(null), 3000);
                      }}
                      size="sm"
                      className="attendance-btn attendance-btn-present"
                    >
                      <Check className="attendance-icon-small" />
                      Present
                    </Button>
                    <Button
                      onClick={() => {
                        markAbsent(subject.id);
                        setFeedback({
                          message: `Marked ${subject.name} as absent`,
                          type: "success",
                        });
                        setTimeout(() => setFeedback(null), 3000);
                      }}
                      variant="destructive"
                      size="sm"
                      className="attendance-btn attendance-btn-absent"
                    >
                      <X className="attendance-icon-small" />
                      Absent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Overall Stats */}
      {subjects.length > 0 && (
        <Card className="attendance-stats-card-container">
          <CardHeader>
            <CardTitle className="attendance-stats-title">
              <Calendar className="attendance-stats-icon" />
              Overall Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="attendance-stats-grid">
              <div className="attendance-stat-card">
                <div className="attendance-stat-value">{subjects.length}</div>
                <div className="attendance-stat-label">Subjects</div>
              </div>
              <div className="attendance-stat-card">
                <div className="attendance-stat-value">
                  {subjects.reduce((sum, s) => sum + s.totalClasses, 0)}
                </div>
                <div className="attendance-stat-label">Total Classes</div>
              </div>
              <div className="attendance-stat-card">
                <div className="attendance-stat-value">
                  {subjects.reduce((sum, s) => sum + s.attendedClasses, 0)}
                </div>
                <div className="attendance-stat-label">Attended</div>
              </div>
              <div className="attendance-stat-card">
                <div className="attendance-stat-value attendance-stat-value-on-track">
                  {subjects.filter((s) => calculateStats(s).isOnTrack).length}
                </div>
                <div className="attendance-stat-label">On Track</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
