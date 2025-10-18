"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  FileText,
  Users,
  Heart,
  CheckSquare,
  BookOpen,
  TrendingUp,
  Clock,
  GraduationCap,
} from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useNotes } from "@/hooks/use-notes";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useWellbeing } from "@/hooks/use-wellbeing";
import { useAttendance } from "@/hooks/use-attendance";
import "@/styles/homepage.css";

export default function HomePage() {
  const { tasks } = useTasks();
  const { notes, scannedDocs } = useNotes();
  const { studyGroups, projects } = useCollaboration();
  const { moodEntries, meditationSessions } = useWellbeing();
  const { subjects, calculateStats } = useAttendance();

  useEffect(() => {
    // Register service worker for PWA functionality
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status !== "completed"
  ).length;
  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      task.status !== "completed" &&
      new Date(task.dueDate) < new Date()
  ).length;

  const totalStudyTime = meditationSessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const averageMood =
    moodEntries.length > 0
      ? moodEntries.reduce((sum, entry) => sum + entry.mood, 0) /
        moodEntries.length
      : 0;

  const upcomingTasks = tasks
    .filter((task) => task.dueDate && task.status !== "completed")
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
    )
    .slice(0, 3);

  const recentNotes = notes
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);

  // Calculate attendance stats
  const onTrackSubjects = subjects.filter(
    (subject) => calculateStats(subject).isOnTrack
  ).length;

  const features = [
    {
      icon: FileText,
      title: "Notes & Documents",
      description: "Smart note-taking with document scanning and organization",
      color: "text-blue-600",
      href: "/notes",
      stats: `${notes.length} notes, ${scannedDocs.length} docs`,
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Advanced task tracking with study planning and reminders",
      color: "text-green-600",
      href: "/tasks",
      stats: `${completedTasks}/${tasks.length} completed`,
    },
    {
      icon: GraduationCap,
      title: "Attendance Tracker",
      description: "Monitor class attendance and maintain target percentages",
      color: "text-orange-600",
      href: "/attendance",
      stats: `${onTrackSubjects}/${subjects.length} on track`,
    },
    {
      icon: Users,
      title: "Collaboration Hub",
      description: "Study groups, project management, and peer communication",
      color: "text-purple-600",
      href: "/collaboration",
      stats: `${studyGroups.length} groups, ${projects.length} projects`,
    },
    {
      icon: Heart,
      title: "Well-being Center",
      description: "Mental health tracking, meditation, and stress management",
      color: "text-pink-600",
      href: "/wellbeing",
      stats: `${moodEntries.length} mood entries, ${totalStudyTime}min meditation`,
    },
  ];

  return (
    <div className="homepage">
      <div className="homepage-container">
        <header className="homepage-header">
          <div className="homepage-logo-container">
            <div className="homepage-logo-icon">
              <BookOpen />
            </div>
            <h1 className="homepage-logo-title">ProdigySpace</h1>
          </div>
          <p className="homepage-subtitle">
            Your comprehensive digital workspace for academic success,
            collaboration, and well-being
          </p>
        </header>

        <div className="homepage-stats-grid">
          <div className="homepage-stat-card">
            <div className="homepage-stat-value homepage-stat-value-completed">
              {completedTasks}
            </div>
            <div className="homepage-stat-label">Tasks Completed</div>
          </div>
          <div className="homepage-stat-card">
            <div className="homepage-stat-value homepage-stat-value-notes">
              {notes.length}
            </div>
            <div className="homepage-stat-label">Notes Created</div>
          </div>
          <div className="homepage-stat-card">
            <div className="homepage-stat-value homepage-stat-value-groups">
              {studyGroups.length}
            </div>
            <div className="homepage-stat-label">Study Groups</div>
          </div>
          <div className="homepage-stat-card">
            <div className="homepage-stat-value homepage-stat-value-mood">
              {averageMood.toFixed(1)}
            </div>
            <div className="homepage-stat-label">Avg Mood</div>
          </div>
          <div className="homepage-stat-card">
            <div className="homepage-stat-value homepage-stat-value-attendance">
              {subjects.length > 0
                ? Math.round((onTrackSubjects / subjects.length) * 100)
                : 0}
              %
            </div>
            <div className="homepage-stat-label">Attendance On Track</div>
          </div>
        </div>

        <div className="homepage-features-grid">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href} className="homepage-feature-card">
              <div className="homepage-feature-header">
                <div className="homepage-feature-icon-container">
                  <div className="homepage-feature-icon-bg">
                    <feature.icon className={feature.color} />
                  </div>
                  <div>
                    <h3 className="homepage-feature-title">
                      {feature.title}
                    </h3>
                    <span className="homepage-feature-badge">
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </div>
              <p className="homepage-feature-description">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="homepage-content-grid">
          {/* Upcoming Tasks */}
          <div className="homepage-section-card">
            <div style={{ padding: 'var(--space-6)' }}>
              <h3 className="homepage-section-header">
                <Clock />
                Upcoming Tasks
              </h3>
              {upcomingTasks.length === 0 ? (
                <p style={{ 
                  color: 'var(--foreground-muted)', 
                  textAlign: 'center', 
                  padding: 'var(--space-4) 0' 
                }}>
                  No upcoming tasks
                </p>
              ) : (
                <div>
                  {upcomingTasks.map((task) => {
                    const daysUntilDue = Math.ceil(
                      (new Date(task.dueDate!).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div key={task.id} className="homepage-task-item">
                        <div className="homepage-task-details">
                          <h4 className="homepage-task-title">{task.title}</h4>
                          <div className="homepage-task-badges">
                            <span className="homepage-task-badge">
                              {task.category}
                            </span>
                            <span className="homepage-task-badge">
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`homepage-task-due-date ${
                            daysUntilDue < 0
                              ? "homepage-task-due-date-overdue"
                              : daysUntilDue < 3
                              ? "homepage-task-due-date-soon"
                              : "homepage-task-due-date-normal"
                          }`}
                        >
                          {daysUntilDue < 0
                            ? `${Math.abs(daysUntilDue)}d overdue`
                            : daysUntilDue === 0
                            ? "Due today"
                            : `${daysUntilDue}d left`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <Link href="/tasks">
                <button className="homepage-view-all-button">
                  View All Tasks
                </button>
              </Link>
            </div>
          </div>

          {/* Recent Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="mainpage-section-header">
                <FileText className="h-5 w-5" />
                Recent Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentNotes.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No notes yet
                </p>
              ) : (
                <div className="space-y-3">
                  {recentNotes.map((note) => (
                    <div key={note.id} className="mainpage-note-item">
                      <div className="mainpage-note-details">
                        <div className="mainpage-note-title">{note.title}</div>
                        <p className="mainpage-note-content">
                          {note.content || "No content"}
                        </p>
                        <div className="mainpage-note-badges">
                          <Badge
                            variant="outline"
                            className="mainpage-note-badge"
                          >
                            {note.category}
                          </Badge>
                          {note.isPinned && (
                            <Badge
                              variant="outline"
                              className="mainpage-note-badge"
                            >
                              Pinned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/notes">
                <Button
                  variant="outline"
                  className="mainpage-view-all-button"
                  size="sm"
                >
                  View All Notes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {tasks.length > 0 && (
          <Card className="mainpage-progress-section">
            <CardHeader>
              <CardTitle className="mainpage-section-header">
                <TrendingUp className="h-5 w-5" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mainpage-progress-grid">
                <div>
                  <div className="mainpage-progress-header">
                    <span>Task Completion</span>
                    <span>
                      {completedTasks}/{tasks.length}
                    </span>
                  </div>
                  <Progress
                    value={(completedTasks / tasks.length) * 100}
                    className="mainpage-progress-bar"
                  />
                </div>
                <div>
                  <div className="mainpage-progress-header">
                    <span>Pending Tasks</span>
                    <span>{pendingTasks}</span>
                  </div>
                  <Progress
                    value={(pendingTasks / tasks.length) * 100}
                    className="mainpage-progress-bar"
                  />
                </div>
                <div>
                  <div className="mainpage-progress-header">
                    <span>Overdue Tasks</span>
                    <span className="text-red-600">{overdueTasks}</span>
                  </div>
                  <Progress
                    value={(overdueTasks / tasks.length) * 100}
                    className="mainpage-progress-bar mainpage-progress-bar-overdue"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
