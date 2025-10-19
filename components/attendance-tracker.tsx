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

  const handleAddSubject = () => {
    if (!newSubject.name.trim()) return;

    const total = parseInt(newSubject.totalClasses) || 0;
    const attended = parseInt(newSubject.attendedClasses) || 0;
    const target = parseInt(newSubject.targetPercentage) || 75;

    if (attended > total) return;

    addSubject(newSubject.name, total, attended, target);

    setNewSubject({
      name: "",
      totalClasses: "",
      attendedClasses: "",
      targetPercentage: "75",
    });
    setIsAddDialogOpen(false);
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="attendance-btn attendance-btn-primary attendance-btn-scale">
                  <Plus className="attendance-btn-icon" />
                  Add Subject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Subject</DialogTitle>
                  <DialogDescription>
                    Enter the subject details and current attendance status
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject-name">Subject Name</Label>
                    <Input
                      id="subject-name"
                      placeholder="e.g., Mathematics"
                      value={newSubject.name}
                      onChange={(e) =>
                        setNewSubject((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="total-classes">Total Classes</Label>
                      <Input
                        id="total-classes"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={newSubject.totalClasses}
                        onChange={(e) =>
                          setNewSubject((prev) => ({
                            ...prev,
                            totalClasses: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="attended-classes">Classes Attended</Label>
                      <Input
                        id="attended-classes"
                        type="number"
                        min="0"
                        max={newSubject.totalClasses || "0"}
                        placeholder="0"
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
                  <div>
                    <Label htmlFor="target-percentage">Target Percentage</Label>
                    <Input
                      id="target-percentage"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="75"
                      value={newSubject.targetPercentage}
                      onChange={(e) =>
                        setNewSubject((prev) => ({
                          ...prev,
                          targetPercentage: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button
                    onClick={handleAddSubject}
                    className="attendance-add-button"
                  >
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
              className="attendance-btn attendance-btn-primary attendance-btn-first pulse-animation"
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSubject(subject.id)}
                      className="attendance-delete-btn"
                    >
                      <Trash2 className="attendance-icon-small" />
                    </Button>
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
                      onClick={() => markPresent(subject.id)}
                      size="sm"
                      className="attendance-btn attendance-btn-present"
                    >
                      <Check className="attendance-icon-small" />
                      Present
                    </Button>
                    <Button
                      onClick={() => markAbsent(subject.id)}
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
