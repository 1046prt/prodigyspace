"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskManager } from "@/components/task-manager";
import { StudyPlanner } from "@/components/study-planner";
import { useTasks } from "@/hooks/use-tasks";
import { CheckSquare, Calendar, BookOpen, GraduationCap } from "lucide-react";
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

  return (
    <div className="tasks">
      <div className="tasks-container">
        <div className="tasks-header">
          <h1 className="tasks-title">Task Management & Study Planner</h1>
          <p className="tasks-subtitle">
            Organize your assignments, plan study sessions, and track your
            academic progress with our comprehensive task management system.
          </p>
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
            <div className="tasks-placeholder">
              <GraduationCap className="tasks-placeholder-icon" />
              <h3 className="tasks-placeholder-title">Assignment Tracker</h3>
              <p className="tasks-placeholder-text">
                Track your assignments, deadlines, and grades.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="tasks-tab-content">
            <div className="tasks-placeholder">
              <BookOpen className="tasks-placeholder-icon" />
              <h3 className="tasks-placeholder-title">Study Sessions</h3>
              <p className="tasks-placeholder-text">
                Review your study session history and analytics.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
