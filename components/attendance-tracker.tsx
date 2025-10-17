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
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading attendance data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Attendance Tracker
              </CardTitle>
              <CardDescription>
                Track your class attendance and maintain your target percentage
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
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
                  <Button onClick={handleAddSubject} className="w-full">
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
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No subjects added yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your attendance by adding a subject
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Subject
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const stats = calculateStats(subject);

            return (
              <Card key={subject.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.attendedClasses}/{subject.totalClasses} classes
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSubject(subject.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Attendance Percentage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Current Attendance
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={stats.isOnTrack ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {stats.currentPercentage.toFixed(1)}%
                        </Badge>
                        {stats.isOnTrack ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                    </div>
                    <Progress
                      value={Math.min(stats.currentPercentage, 100)}
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <Target className="h-3 w-3" />
                        <span>
                          Can skip {stats.classesToSkip} more class
                          {stats.classesToSkip !== 1 ? "es" : ""}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <Target className="h-3 w-3" />
                        <span>
                          Need to attend {stats.classesNeeded} more class
                          {stats.classesNeeded !== 1 ? "es" : ""} consecutively
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => markPresent(subject.id)}
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Present
                    </Button>
                    <Button
                      onClick={() => markAbsent(subject.id)}
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                    >
                      <X className="h-3 w-3 mr-1" />
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Overall Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{subjects.length}</div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {subjects.reduce((sum, s) => sum + s.totalClasses, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Classes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {subjects.reduce((sum, s) => sum + s.attendedClasses, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Attended</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {subjects.filter((s) => calculateStats(s).isOnTrack).length}
                </div>
                <div className="text-sm text-muted-foreground">On Track</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
