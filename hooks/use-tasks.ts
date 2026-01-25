"use client";

import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type { Task, StudySession, StudyPlan, Assignment } from "@/types/tasks";

export function useTasks() {
  const [tasks, setTasks] = useProdigyStorage<Task[]>(
    "tasks",
    [],
    dateTransformers,
  );

  const [studySessions, setStudySessions] = useProdigyStorage<StudySession[]>(
    "study-sessions",
    [],
    dateTransformers,
  );

  const [studyPlans, setStudyPlans] = useProdigyStorage<StudyPlan[]>(
    "study-plans",
    [],
    dateTransformers,
  );

  const [assignments, setAssignments] = useProdigyStorage<Assignment[]>(
    "assignments",
    [],
    dateTransformers,
  );

  const addTask = (
    taskData: Omit<
      Task,
      "id" | "createdAt" | "updatedAt" | "subtasks" | "reminders"
    >,
  ) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: [],
      reminders: [],
    };
    setTasks([...tasks, newTask]);

    // If the task is an assignment, also create an assignment record
    if (taskData.category === "assignment") {
      const newAssignment: Assignment = {
        id: newTask.id, // Use same ID as task
        title: taskData.title,
        course: taskData.course || "General",
        professor: taskData.professor || "",
        type: "assignment",
        dueDate: taskData.dueDate || new Date(),
        submissionMethod: "online",
        status: "not-started",
        priority: taskData.priority,
        estimatedHours: taskData.estimatedTime
          ? taskData.estimatedTime / 60
          : 1,
        actualHours: 0,
        progress: 0,
        requirements: [],
        resources: [],
        createdAt: new Date(),
      };
      setAssignments([...assignments, newAssignment]);
    }
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            ...updates,
            updatedAt: new Date(),
            completedAt:
              updates.status === "completed" && !task.completedAt
                ? new Date()
                : task.completedAt,
          }
        : task,
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addStudySession = (sessionData: Omit<StudySession, "id">) => {
    const newSession: StudySession = {
      ...sessionData,
      id: Date.now().toString(),
    };
    setStudySessions([...studySessions, newSession]);
  };

  const addAssignment = (
    assignmentData: Omit<Assignment, "id" | "createdAt">,
  ) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setAssignments([...assignments, newAssignment]);
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, ...updates } : assignment,
    );
    setAssignments(updatedAssignments);
  };

  return {
    tasks,
    studySessions,
    studyPlans,
    assignments,
    addTask,
    updateTask,
    deleteTask,
    addStudySession,
    addAssignment,
    updateAssignment,
  };
}
