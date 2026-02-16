"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { CalendarIcon, Clock, BookOpen, Target } from "lucide-react";
import type { StudySession, Task } from "@/types/tasks";

interface StudyPlannerProps {
  studySessions: StudySession[];
  tasks: Task[];
  onAddSession: (session: Omit<StudySession, "id">) => void;
}

const studyTechniques = [
  { value: "pomodoro", label: "Pomodoro (25min focus)", icon: "🍅" },
  { value: "time-blocking", label: "Time Blocking", icon: "📅" },
  { value: "active-recall", label: "Active Recall", icon: "🧠" },
  { value: "spaced-repetition", label: "Spaced Repetition", icon: "🔄" },
];

import "@/styles/study-planner.css";
import "@/styles/study-planner-select.css";

export function StudyPlanner({ studySessions, tasks }: StudyPlannerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("week");

  const getSessionsForDate = (date: Date) => {
    return studySessions.filter((session) =>
      isSameDay(session.startTime, date)
    );
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    return eachDayOfInterval({ start, end });
  };

  const getTotalStudyTime = (date: Date) => {
    const sessions = getSessionsForDate(date);
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const getUpcomingTasks = () => {
    return tasks
      .filter((task) => task.status !== "completed" && task.dueDate)
      .sort((a, b) => a.dueDate!.getTime() - b.dueDate!.getTime())
      .slice(0, 5);
  };

  const weekDays = getWeekDays();
  const todaySessions = getSessionsForDate(selectedDate);
  const upcomingTasks = getUpcomingTasks();

  return (
    <div className="space-y-6 study-planner">
      <div className="study-planner-header">
        <h2 className="study-planner-title">Study Planner</h2>
        <div className="flex gap-2">
          <Select
            value={viewMode}
            onValueChange={(value: "day" | "week") => setViewMode(value)}
          >
            <SelectTrigger className="view-select-trigger w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="view-select-content">
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="calendar-card">
          <CardHeader>
            <CardTitle className="calendar-title flex items-center gap-2">
              <CalendarIcon className="calendar-icon icon-md" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="calendar-container p-3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="enhanced-calendar rounded-lg border shadow-sm"
                classNames={{
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day: "calendar-day-item",
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Study Schedule */}
        <Card className="schedule-card lg:col-span-2">
          <CardHeader className="schedule-card-header">
            <CardTitle className="schedule-title">
              {viewMode === "day"
                ? `Study Schedule - ${format(selectedDate, "EEEE, MMMM d")}`
                : `Week of ${format(weekDays[0], "MMM d")} - ${format(
                    weekDays[6],
                    "MMM d"
                  )}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === "day" ? (
              <div className="space-y-4">
                {todaySessions.length === 0 ? (
                  <div className="empty-schedule text-center py-8 px-4">
                    <div className="empty-schedule-icon-container mb-4">
                      <BookOpen className="empty-schedule-icon icon-xl icon-center" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      No study sessions scheduled for this day
                    </p>
                    <Button className="mt-2 enhanced-button" size="sm">
                      <CalendarIcon className="icon-sm icon-gap" />
                      Schedule Session
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todaySessions
                      .sort(
                        (a, b) => a.startTime.getTime() - b.startTime.getTime()
                      )
                      .map((session) => (
                        <div
                          key={session.id}
                          className="session-card p-4 rounded-md shadow-sm border border-slate-100"
                        >
                          <div className="grid grid-cols-[1fr_auto] gap-4">
                            <div>
                              <h4 className="session-subject font-semibold">
                                {session.subject}
                              </h4>
                              <p className="session-topic text-sm text-muted-foreground mt-1">
                                {session.topic}
                              </p>
                              <div className="session-time mt-2">
                                <Clock className="icon-xs text-primary" />
                                <span className="text-xs text-slate-600">
                                  {format(session.startTime, "HH:mm")} -{" "}
                                  {format(session.endTime, "HH:mm")}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-xs ml-2"
                                >
                                  {session.technique}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right flex flex-col justify-between">
                              <div className="session-duration text-primary font-medium">
                                {session.duration}min
                              </div>
                              <div className="session-productivity text-xs text-slate-500 mt-auto">
                                Productivity: {session.productivity}/5
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {weekDays.map((day) => {
                  const dayStudyTime = getTotalStudyTime(day);
                  const daySessions = getSessionsForDate(day);

                  return (
                    <div key={day.toISOString()} className="week-day">
                      <div className="grid grid-cols-[auto_1fr_auto] w-full items-center gap-4">
                        <div className="week-day-name">
                          <div className="text-center font-medium">
                            {format(day, "EEE")}
                          </div>
                          <div className="week-day-date">
                            {format(day, "d")}
                          </div>
                        </div>
                        <div className="week-day-stats">
                          <div className="week-day-info">
                            <Clock className="icon-sm text-primary" />
                            <span className="text-sm font-medium">
                              {dayStudyTime} minutes
                            </span>
                            <Badge variant="outline" className="text-xs ml-2">
                              {daySessions.length} sessions
                            </Badge>
                          </div>
                          <Progress
                            value={(dayStudyTime / 480) * 100}
                            className="mt-2 h-2 w-full"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDate(day)}
                          className={
                            isSameDay(day, selectedDate)
                              ? "week-day-button active"
                              : "week-day-button"
                          }
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Study Techniques & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="techniques-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="icon-md calendar-icon" />
              Study Techniques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studyTechniques.map((technique) => (
                <div key={technique.value} className="technique-item">
                  <span className="technique-icon">{technique.icon}</span>
                  <div>
                    <h4 className="technique-name">{technique.label}</h4>
                    <p className="technique-description">
                      {technique.value === "pomodoro" &&
                        "25 minutes focused work + 5 minute break"}
                      {technique.value === "time-blocking" &&
                        "Dedicated time blocks for specific subjects"}
                      {technique.value === "active-recall" &&
                        "Test yourself without looking at notes"}
                      {technique.value === "spaced-repetition" &&
                        "Review material at increasing intervals"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="tasks-card">
          <CardHeader>
            <CardTitle className="schedule-title">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingTasks.length === 0 ? (
              <div className="empty-schedule">
                <Target className="empty-schedule-icon icon-xl mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No upcoming tasks with due dates
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingTasks.map((task) => {
                  const daysUntilDue = Math.ceil(
                    (task.dueDate!.getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div key={task.id} className="task-item">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="task-title">{task.title}</h4>
                          <div className="task-badges">
                            <span className="task-badge">{task.category}</span>
                            <span className="task-badge">{task.priority}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={
                              daysUntilDue < 0
                                ? "task-due-date task-due-overdue"
                                : daysUntilDue < 3
                                ? "task-due-date task-due-soon"
                                : "task-due-date task-due-future"
                            }
                          >
                            {daysUntilDue < 0
                              ? `${Math.abs(daysUntilDue)}d overdue`
                              : daysUntilDue === 0
                              ? "Due today"
                              : `${daysUntilDue}d left`}
                          </div>
                          {task.estimatedTime && (
                            <div className="task-time">
                              {task.estimatedTime}min
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
