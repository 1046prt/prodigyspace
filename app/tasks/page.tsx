"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskManager } from "@/components/task-manager";
import { StudyPlanner } from "@/components/study-planner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTasks } from "@/hooks/use-tasks";
import {
  CheckSquare,
  Calendar,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Clock,
  Target,
  Award,
  BarChart3,
  PlayCircle,
} from "lucide-react";
import "@/styles/tasks.css";

export default function TasksPage() {
  const {
    tasks,
    studySessions,
    assignments,
    addTask,
    updateTask,
    deleteTask,
    addStudySession,
  } = useTasks();

  // Calculate statistics
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const overdueAssignments = assignments.filter(
    (a) => a.dueDate < new Date() && a.status !== "completed",
  ).length;
  const totalStudyTime = studySessions.reduce((acc, s) => acc + s.duration, 0);
  const completionRate =
    tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="tasks">
      <div className="tasks-container">
        <div className="tasks-header">
          <div className="tasks-header-content">
            <h1 className="tasks-title">Task Management & Study Hub</h1>
            <p className="tasks-subtitle">
              Master your academic journey with intelligent task organization,
              progress tracking, and study analytics.
            </p>
          </div>

          {/* Stats Overview Cards */}
          <div className="tasks-stats-grid">
            <Card className="stat-card stat-card-primary">
              <CardContent className="stat-card-content">
                <div className="stat-icon">
                  <Target className="h-5 w-5" />
                </div>
                <div className="stat-info">
                  <p className="stat-value">{tasks.length}</p>
                  <p className="stat-label">Total Tasks</p>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card stat-card-success">
              <CardContent className="stat-card-content">
                <div className="stat-icon">
                  <CheckSquare className="h-5 w-5" />
                </div>
                <div className="stat-info">
                  <p className="stat-value">{completedTasks}</p>
                  <p className="stat-label">Completed</p>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card stat-card-warning">
              <CardContent className="stat-card-content">
                <div className="stat-icon">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="stat-info">
                  <p className="stat-value">
                    {Math.round(totalStudyTime / 60)}h
                  </p>
                  <p className="stat-label">Study Time</p>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card stat-card-info">
              <CardContent className="stat-card-content">
                <div className="stat-icon">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="stat-info">
                  <p className="stat-value">{Math.round(completionRate)}%</p>
                  <p className="stat-label">Completion</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="tasks" className="tasks-tabs">
          <TabsList className="tasks-tabs-list">
            <TabsTrigger value="tasks" className="tasks-tab-trigger">
              <CheckSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
              <span className="tasks-tab-count">({tasks.length})</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="tasks-tab-trigger">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Planner</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="tasks-tab-trigger">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Assignments</span>
              <span className="tasks-tab-count">({assignments.length})</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="tasks-tab-trigger">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Sessions</span>
              <span className="tasks-tab-count">({studySessions.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="tasks-tab-content">
            <TaskManager
              tasks={tasks}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          </TabsContent>

          <TabsContent value="planner" className="tasks-tab-content">
            <StudyPlanner
              studySessions={studySessions}
              tasks={tasks}
              onAddSession={addStudySession}
            />
          </TabsContent>

          <TabsContent value="assignments" className="tasks-tab-content">
            <div className="assignments-section">
              <div className="section-header">
                <h2 className="section-title">
                  <GraduationCap className="h-5 w-5" />
                  Assignment Tracker
                </h2>
                {overdueAssignments > 0 && (
                  <Badge variant="destructive" className="pulse-animation">
                    {overdueAssignments} Overdue
                  </Badge>
                )}
              </div>

              {assignments.length === 0 ? (
                <Card className="empty-state-card">
                  <CardContent className="empty-state-content">
                    <GraduationCap className="empty-state-icon" />
                    <h3>No Assignments Yet</h3>
                    <p>
                      Start by creating tasks with category 'Assignment' to see
                      them here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="assignments-grid">
                  {assignments.map((assignment) => {
                    const daysUntilDue = Math.ceil(
                      (assignment.dueDate.getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24),
                    );
                    const isOverdue = daysUntilDue < 0;
                    const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

                    return (
                      <Card
                        key={assignment.id}
                        className={`assignment-card ${
                          isOverdue ? "overdue" : isDueSoon ? "due-soon" : ""
                        }`}
                      >
                        <CardHeader className="assignment-card-header">
                          <div className="assignment-header-top">
                            <CardTitle className="assignment-title">
                              {assignment.title}
                            </CardTitle>
                            <Badge
                              className={`assignment-badge ${
                                isOverdue
                                  ? "badge-overdue"
                                  : isDueSoon
                                    ? "badge-due-soon"
                                    : "badge-normal"
                              }`}
                            >
                              {isOverdue
                                ? `${Math.abs(daysUntilDue)} days overdue`
                                : daysUntilDue === 0
                                  ? "Due today"
                                  : `${daysUntilDue} days left`}
                            </Badge>
                          </div>
                          <p className="assignment-course">
                            {assignment.course}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="assignment-progress">
                            <div className="progress-info">
                              <span>Progress</span>
                              <span>{assignment.progress || 0}%</span>
                            </div>
                            <Progress
                              value={assignment.progress || 0}
                              className="assignment-progress-bar"
                            />
                          </div>
                          <div className="assignment-meta">
                            <div className="meta-item">
                              <Calendar className="h-4 w-4" />
                              Due {assignment.dueDate.toLocaleDateString()}
                            </div>
                            {assignment.estimatedTime && (
                              <div className="meta-item">
                                <Clock className="h-4 w-4" />
                                {assignment.estimatedTime}h estimated
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="tasks-tab-content">
            <div className="sessions-section">
              <div className="section-header">
                <h2 className="section-title">
                  <BarChart3 className="h-5 w-5" />
                  Study Analytics
                </h2>
                <Badge className="session-count-badge">
                  {studySessions.length} Sessions Completed
                </Badge>
              </div>

              {studySessions.length === 0 ? (
                <Card className="empty-state-card">
                  <CardContent className="empty-state-content">
                    <PlayCircle className="empty-state-icon" />
                    <h3>No Study Sessions Yet</h3>
                    <p>
                      Start your first study session to see detailed analytics
                      here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="sessions-analytics">
                  {/* Weekly Summary */}
                  <Card className="analytics-card">
                    <CardHeader>
                      <CardTitle className="analytics-title">
                        <Award className="h-5 w-5" />
                        This Week's Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="analytics-stats">
                        <div className="analytics-stat">
                          <span className="stat-number">
                            {studySessions.length}
                          </span>
                          <span className="stat-text">Sessions</span>
                        </div>
                        <div className="analytics-stat">
                          <span className="stat-number">
                            {Math.round(totalStudyTime / 60)}
                          </span>
                          <span className="stat-text">Hours</span>
                        </div>
                        <div className="analytics-stat">
                          <span className="stat-number">
                            {studySessions.length > 0
                              ? Math.round(
                                  totalStudyTime / studySessions.length,
                                )
                              : 0}
                          </span>
                          <span className="stat-text">Avg. Min/Session</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Sessions */}
                  <Card className="analytics-card">
                    <CardHeader>
                      <CardTitle className="analytics-title">
                        <Clock className="h-5 w-5" />
                        Recent Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="recent-sessions">
                        {studySessions
                          .slice(-5)
                          .reverse()
                          .map((session) => (
                            <div key={session.id} className="session-item">
                              <div className="session-info">
                                <h4 className="session-subject">
                                  {session.subject}
                                </h4>
                                <p className="session-topic">{session.topic}</p>
                              </div>
                              <div className="session-meta">
                                <Badge className="session-duration">
                                  {session.duration} min
                                </Badge>
                                <span className="session-date">
                                  {session.startTime.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
