"use client";

import { WaterTracker } from "@/components/water-tracker";
import { PomodoroTimer } from "@/components/pomodoro-timer";
import { BookmarkManager } from "@/components/bookmark-manager";
import { DocumentScanner } from "@/components/document-scanner";
import { StudyPlanner } from "@/components/study-planner";
import { GoalsManager } from "@/components/goals-manager";
import { UnitConverter } from "@/components/unit-converter";
import { AttendanceTracker } from "@/components/attendance-tracker";
import "@/styles/utilities.css";
import "@/styles/pomodoro-timer.css";
import "@/styles/bookmark-manager.css";
import "@/styles/attendance.css";

// Mock data for the new components
const mockScannedDocs = [
  {
    id: "1",
    name: "Math Notes",
    pages: ["/placeholder.svg"],
    category: "notes" as const,
    createdAt: new Date(),
  },
];

const mockStudySessions = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Calculus",
    startTime: new Date(),
    endTime: new Date(Date.now() + 60 * 60 * 1000),
    duration: 60,
    technique: "pomodoro" as const,
    productivity: 4 as const,
    distractions: 0,
  },
];

const mockTasks = [
  {
    id: "1",
    title: "Complete Assignment",
    description: "Finish math assignment",
    status: "todo" as const,
    priority: "high" as const,
    category: "assignment" as const,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    estimatedTime: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    subtasks: [],
    reminders: [],
  },
];

const mockGoals = [
  {
    id: "1",
    title: "Study for 30 days",
    description: "Consistent study habit",
    category: "focus" as const,
    target: 30,
    current: 15,
    unit: "days",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
];

export default function UtilitiesPage() {
  return (
    <div className="utilities">
      <div className="utilities-container">
        <div className="utilities-header">
          <h1 className="utilities-title">Student Utilities</h1>
          <p className="utilities-subtitle">
            Essential tools to boost your productivity and maintain healthy
            habits
          </p>
        </div>

        <div className="utilities-grid utilities-grid-md-3">
          <div className="utilities-card">
            <WaterTracker />
          </div>
          <div className="utilities-card">
            <PomodoroTimer />
          </div>
          <div className="utilities-card">
            <BookmarkManager />
          </div>

          {/* New Utilities */}
          <div className="utilities-card utilities-card-full">
            <UnitConverter />
          </div>
          <div className="utilities-card utilities-card-full">
            <AttendanceTracker />
          </div>
          <div className="utilities-card utilities-card-full">
            <DocumentScanner
              onSave={() => {
                /* Handle save document */
              }}
              scannedDocs={mockScannedDocs}
              onDelete={() => {
                /* Handle delete document */
              }}
            />
          </div>
          <div className="utilities-card utilities-card-full">
            <StudyPlanner
              studySessions={mockStudySessions}
              tasks={mockTasks}
              onAddSession={() => {
                /* Handle add session */
              }}
            />
          </div>
          <div className="utilities-card utilities-card-full">
            <GoalsManager
              goals={mockGoals}
              onAddGoal={() => {
                /* Handle add goal */
              }}
              onUpdateProgress={() => {
                /* Handle update progress */
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
