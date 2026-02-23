"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Users,
  Heart,
  CheckSquare,
  TrendingUp,
  Clock,
  GraduationCap,
  AlarmClock,
  Calculator,
  DollarSign,
} from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useNotes } from "@/hooks/use-notes";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useWellbeing } from "@/hooks/use-wellbeing";
import { useAttendance } from "@/hooks/use-attendance";
import "@/styles/homepage.css";
import "@/styles/app.css";

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
        .then(() => {
          // Service worker registered successfully
        })
        .catch(() => {
          // Service worker registration failed
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

  const totalStudyTime = Array.isArray(meditationSessions)
    ? meditationSessions.reduce((sum, session) => sum + (session?.duration || 0), 0)
    : 0;

  const averageMood = Array.isArray(moodEntries) && moodEntries.length > 0
    ? moodEntries.reduce((sum, entry) => sum + (entry?.mood || 0), 0) / moodEntries.length
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
        color: "feature-color-blue",
        href: "/notes",
        stats: `${notes.length} notes, ${scannedDocs.length} docs`,
      },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Advanced task tracking with study planning and reminders",
      color: "feature-color-green",
      href: "/tasks",
      stats: `${completedTasks}/${tasks.length} completed`,
    },
    {
      icon: CheckSquare,
      title: "Todo Manager",
      description: "Simple and efficient todo list management",
      color: "feature-color-emerald",
      href: "/todos",
      stats: "Quick task tracking",
    },
    {
      icon: GraduationCap,
      title: "Attendance Tracker",
      description: "Monitor class attendance and maintain target percentages",
      color: "feature-color-orange",
      href: "/attendance",
      stats: `${onTrackSubjects}/${subjects.length} on track`,
    },
    {
      icon: Users,
      title: "Collaboration Hub",
      description: "Study groups, project management, and peer communication",
      color: "feature-color-purple",
      href: "/collaboration",
      stats: `${studyGroups.length} groups, ${projects.length} projects`,
    },
    {
      icon: Heart,
      title: "Well-being Center",
      description: "Mental health tracking, meditation, and stress management",
      color: "feature-color-pink",
      href: "/wellbeing",
      stats: `${moodEntries.length} mood entries, ${totalStudyTime}min meditation`,
    },
    {
      icon: DollarSign,
      title: "Expense Tracker",
      description: "Track and manage your educational expenses and budgets",
      color: "feature-color-yellow",
      href: "/expenses",
      stats: "Financial management",
    },
    {
      icon: AlarmClock,
      title: "Alarm Manager",
      description: "Set up study alarms and deadline reminders",
      color: "feature-color-red",
      href: "/alarms",
      stats: "Never miss deadlines",
    },
    {
      icon: Calculator,
      title: "Utilities",
      description: "Unit converter, calculator and other useful tools",
      color: "feature-color-indigo",
      href: "/utilities",
      stats: "Helpful tools",
    },
  ];

  return (
    <div className="homepage">
      <div className="homepage-container">
        <header className="homepage-header">
          <div className="homepage-logo-container">
            <div className="homepage-logo-icon">
              <Image
                src="/logo.png"
                alt="ProdigySpace Logo"
                className="homepage-logo-image"
                width={48}
                height={48}
              />
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
            <Link
              key={index}
              href={feature.href}
              className="homepage-feature-card"
            >
              <div className="homepage-feature-header">
                <div className="homepage-feature-icon-container">
                  <div className="homepage-feature-icon-bg">
                    <feature.icon className={feature.color} />
                  </div>
                  <div>
                    <h3 className="homepage-feature-title">{feature.title}</h3>
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
              <div className="section-padding-6">
              <h3 className="homepage-section-header">
                <Clock />
                Upcoming Tasks
              </h3>
              {upcomingTasks.length === 0 ? (
                <p className="muted-centered">No upcoming tasks</p>
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
          <div className="homepage-section-card">
              <div className="section-padding-6">
              <h3 className="homepage-section-header">
                <FileText />
                Recent Notes
              </h3>
              {recentNotes.length === 0 ? (
                <p className="muted-centered">No notes yet</p>
              ) : (
                <div>
                  {recentNotes.map((note) => (
                    <div key={note.id} className="homepage-note-item">
                      <div className="homepage-note-details">
                        <div className="homepage-note-title">{note.title}</div>
                        <p className="homepage-note-content">
                          {note.content || "No content"}
                        </p>
                        <div className="homepage-note-badges">
                          <span className="homepage-note-badge">
                            {note.category}
                          </span>
                          {note.isPinned && (
                            <span className="homepage-note-badge">Pinned</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/notes">
                <button className="homepage-view-all-button">
                  View All Notes
                </button>
              </Link>
            </div>
          </div>
        </div>

        {tasks.length > 0 && (
                <Card className="mainpage-progress-section">
            <CardHeader>
              <CardTitle className="mainpage-section-header">
                <TrendingUp className="icon-size" />
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
                    <span className="text-red">{overdueTasks}</span>
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
