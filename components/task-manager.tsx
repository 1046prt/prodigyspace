"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Plus,
  CalendarIcon,
  Clock,
  Flag,
  Edit,
  Trash2,
  CheckCircle2,
  Filter,
  BookOpen,
  CheckSquare,
} from "lucide-react";
import type { Task } from "@/types/tasks";

interface TaskManagerProps {
  tasks: Task[];
  onAddTask: (
    task: Omit<
      Task,
      "id" | "createdAt" | "updatedAt" | "subtasks" | "reminders"
    >,
  ) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskManager({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: TaskManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Task["category"]>("assignment");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState<Date>();
  const [estimatedTime, setEstimatedTime] = useState("");
  const [course, setCourse] = useState("");
  const [professor, setProfessor] = useState("");

  const handleCreateTask = () => {
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status: "todo",
      dueDate,
      estimatedTime: estimatedTime ? Number.parseInt(estimatedTime) : undefined,
      tags: [],
      course: course.trim() || undefined,
      professor: professor.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("assignment");
    setPriority("medium");
    setDueDate(undefined);
    setEstimatedTime("");
    setCourse("");
    setProfessor("");
    setShowCreateDialog(false);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filterStatus !== "all" && task.status !== filterStatus) return false;
      if (filterCategory !== "all" && task.category !== filterCategory)
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "created":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-8" style={{ color: "var(--color-foreground)" }}>
      {/* Enhanced Header Section with Gradient Background */}
      <div
        className="task-manager-header-enhanced rounded-2xl p-8 shadow-lg"
        style={{
          background: "var(--color-card)",
          border: "1.5px solid var(--color-border)",
        }}
      >
        <div className="task-manager-title-section flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))",
              }}
            >
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2
            className="text-4xl font-bold mb-3"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary-700), var(--color-secondary-700))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Task Manager
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-foreground-secondary)" }}
          >
            Transform your productivity with intelligent task organization and
            beautiful progress tracking
          </p>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))",
                  color: "var(--color-primary-foreground)",
                  border: 0,
                }}
                className="px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="h-5 w-5 mr-3" />
                <span className="hidden sm:inline">Create New Task</span>
                <span className="sm:hidden">New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl max-h-[95vh] overflow-hidden task-dialog shadow-2xl rounded-2xl"
              style={{
                background: "var(--color-card)",
                border: "2px solid var(--color-border)",
              }}
            >
              <div className="task-dialog-header">
                <DialogHeader
                  className="border-b pb-6"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-12 transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))",
                      }}
                    >
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <DialogTitle
                        className="text-2xl font-bold"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--color-primary-700), var(--color-secondary-700))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        Create New Task
                      </DialogTitle>
                      <p
                        className="text-base mt-2"
                        style={{ color: "var(--color-foreground-secondary)" }}
                      >
                        Transform your ideas into organized, actionable tasks
                      </p>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="task-dialog-content overflow-y-auto">
                <div className="space-y-6 p-6">
                  {/* Basic Information Section */}
                  <div
                    className="task-dialog-section space-y-6 p-6"
                    data-tone="primary"
                  >
                    <div className="task-dialog-section-header flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                      <div className="task-dialog-section-dot w-3 h-3 rounded-full shadow-md"></div>
                      <span className="task-dialog-section-label">
                        Basic Information
                      </span>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Task Title *
                      </label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a clear, descriptive title..."
                        className="task-dialog-input h-11 text-base"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Description
                      </label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide additional details about the task..."
                        rows={3}
                        className="task-dialog-input text-base resize-none"
                      />
                    </div>
                  </div>

                  {/* Task Details Section */}
                  <div
                    className="task-dialog-section space-y-6 p-6"
                    data-tone="accent"
                  >
                    <div className="task-dialog-section-header flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                      <div className="task-dialog-section-dot w-3 h-3 rounded-full shadow-md"></div>
                      <span className="task-dialog-section-label">
                        Task Details
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Category
                        </label>
                        <Select
                          value={category}
                          onValueChange={(value: Task["category"]) =>
                            setCategory(value)
                          }
                        >
                          <SelectTrigger className="task-dialog-input h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assignment">
                              📚 Assignment
                            </SelectItem>
                            <SelectItem value="study">📖 Study</SelectItem>
                            <SelectItem value="exam">📝 Exam</SelectItem>
                            <SelectItem value="project">🚀 Project</SelectItem>
                            <SelectItem value="reading">📑 Reading</SelectItem>
                            <SelectItem value="personal">
                              👤 Personal
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Priority Level
                        </label>
                        <Select
                          value={priority}
                          onValueChange={(value: Task["priority"]) =>
                            setPriority(value)
                          }
                        >
                          <SelectTrigger className="task-dialog-input h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">🟢 Low</SelectItem>
                            <SelectItem value="medium">🟡 Medium</SelectItem>
                            <SelectItem value="high">🟠 High</SelectItem>
                            <SelectItem value="urgent">🔴 Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Schedule & Time Section */}
                  <div
                    className="task-dialog-section space-y-6 p-6"
                    data-tone="secondary"
                  >
                    <div className="task-dialog-section-header flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                      <div className="task-dialog-section-dot w-3 h-3 rounded-full shadow-md"></div>
                      <span className="task-dialog-section-label">
                        Schedule & Time
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Due Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="task-dialog-input task-dialog-date-trigger w-full h-11 justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                              <span
                                className={
                                  dueDate
                                    ? "text-gray-900 dark:text-gray-100"
                                    : "text-gray-500"
                                }
                              >
                                {dueDate
                                  ? format(dueDate, "PPP")
                                  : "Select due date"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dueDate}
                              onSelect={setDueDate}
                              className="rounded-lg border-0"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Estimated Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            type="number"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            placeholder="60"
                            className="task-dialog-input h-11 pl-10 text-base"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                            minutes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information Section */}
                  <div
                    className="task-dialog-section space-y-6 p-6"
                    data-tone="warning"
                  >
                    <div className="task-dialog-section-header flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                      <div className="task-dialog-section-dot w-3 h-3 rounded-full shadow-md"></div>
                      <span className="task-dialog-section-label">
                        Academic Information
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Course Code
                        </label>
                        <Input
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="e.g., CS 101, MATH 205"
                          className="task-dialog-input h-11 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Professor/Instructor
                        </label>
                        <Input
                          value={professor}
                          onChange={(e) => setProfessor(e.target.value)}
                          placeholder="Professor name"
                          className="task-dialog-input h-11 text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="task-dialog-footer p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Fields marked with * are required
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateDialog(false)}
                      className="w-full sm:w-auto h-12 px-6 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateTask}
                      disabled={!title.trim()}
                      className="task-button-primary w-full sm:w-auto h-12 px-8 border-0 disabled:opacity-50 disabled:cursor-not-allowed font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Create Task
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <Card
        className="filters-card rounded-2xl shadow-lg overflow-hidden"
        style={{
          background: "var(--color-card)",
          border: "2px solid var(--color-border)",
        }}
      >
        <CardContent className="filters-content p-8">
          <div className="filters-header flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="task-filter-icon w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Filter className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="task-filter-title text-2xl font-bold">
                  Filter & Sort Tasks
                </h3>
                <p className="task-filter-subtitle mt-1">
                  Organize your tasks the way you need them
                </p>
              </div>
            </div>
            <Badge
              className="task-count-badge px-4 py-2 rounded-full text-base font-bold shadow-md"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))",
                color: "var(--color-primary-foreground)",
              }}
            >
              {filteredTasks.length} of {tasks.length}
            </Badge>
          </div>

          <div className="filters-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="filter-group space-y-3">
              <label className="filter-label text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
                <div className="task-filter-dot w-2 h-2 rounded-full"></div>
                Status
              </label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="filter-select task-filter-select h-12 border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🔄 All Statuses</SelectItem>
                  <SelectItem value="todo">⏳ To Do</SelectItem>
                  <SelectItem value="in-progress">⚡ In Progress</SelectItem>
                  <SelectItem value="completed">✅ Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="filter-group space-y-3">
              <label className="filter-label text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
                <div className="task-filter-dot w-2 h-2 rounded-full"></div>
                Category
              </label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="filter-select task-filter-select h-12 border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">📋 All Categories</SelectItem>
                  <SelectItem value="assignment">📚 Assignment</SelectItem>
                  <SelectItem value="study">📖 Study</SelectItem>
                  <SelectItem value="exam">📝 Exam</SelectItem>
                  <SelectItem value="project">🚀 Project</SelectItem>
                  <SelectItem value="reading">📑 Reading</SelectItem>
                  <SelectItem value="personal">👤 Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="filter-group space-y-3">
              <label className="filter-label text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
                <div className="task-filter-dot w-2 h-2 rounded-full"></div>
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="filter-select task-filter-select h-12 border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">📅 Due Date</SelectItem>
                  <SelectItem value="priority">🏆 Priority</SelectItem>
                  <SelectItem value="created">🕐 Created Date</SelectItem>
                  <SelectItem value="alphabetical">🔤 Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div
          className="tasks-placeholder text-center py-16 px-8 rounded-2xl border-2 border-dashed"
          style={{
            background: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="tasks-placeholder-icon-wrap w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
            <CheckCircle2 className="tasks-placeholder-icon h-12 w-12 text-white" />
          </div>
          <h3 className="tasks-placeholder-title text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-100 bg-clip-text text-transparent mb-4">
            No tasks found
          </h3>
          <p className="tasks-placeholder-text text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            {tasks.length === 0
              ? "Create your first task to get started with better organization!"
              : "Try adjusting your filters to find what you're looking for."}
          </p>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="task-button-primary px-8 py-4 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))",
              color: "var(--color-primary-foreground)",
            }}
          >
            <Plus className="h-5 w-5 mr-3" />
            Add Task
          </Button>
        </div>
      ) : (
        <div className="tasks-grid-enhanced grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {filteredTasks.map((task) => {
            const daysUntilDue = task.dueDate
              ? getDaysUntilDue(task.dueDate)
              : null;
            const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
            const isDueSoon =
              daysUntilDue !== null && daysUntilDue <= 3 && daysUntilDue >= 0;

            return (
              <Card
                key={task.id}
                className={`task-card-modern group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                style={{
                  background: "var(--color-card)",
                  border: `2px solid ${
                    task.status === "completed"
                      ? "var(--color-success-100)"
                      : isOverdue
                        ? "var(--color-error-100)"
                        : isDueSoon
                          ? "var(--color-warning-100)"
                          : "var(--color-border)"
                  }`,
                  opacity: task.status === "completed" ? 0.75 : 1,
                }}
              >
                {/* Enhanced Priority Stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-2 opacity-80"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))",
                  }}
                ></div>
                <div
                  className="absolute top-0 left-0 w-full h-2 opacity-90 shadow-sm"
                  style={{
                    background:
                      task.priority === "urgent"
                        ? "linear-gradient(90deg, var(--color-error-500), var(--color-error-700))"
                        : task.priority === "high"
                          ? "linear-gradient(90deg, var(--color-warning-500), var(--color-warning-700))"
                          : task.priority === "medium"
                            ? "linear-gradient(90deg, var(--color-secondary-400), var(--color-secondary-600))"
                            : "linear-gradient(90deg, var(--color-success-500), var(--color-success-700))",
                  }}
                ></div>

                <CardHeader className="task-card-header-modern p-6 pb-4">
                  <div className="task-header-row flex items-center justify-between mb-4 gap-2">
                    <div className="task-checkbox-wrapper flex items-center">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={(checked: boolean) =>
                          onUpdateTask(task.id, {
                            status: checked ? "completed" : "todo",
                            completedAt: checked ? new Date() : undefined,
                          })
                        }
                        className="task-checkbox-enhanced task-checkbox-theme w-6 h-6 rounded-lg border-2 shadow-sm"
                      />
                    </div>
                    <div className="task-actions flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="task-action-button task-action-button-primary h-9 w-9 rounded-lg shadow-sm flex items-center justify-center"
                        onClick={() => {
                          // Add edit functionality here
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="task-action-button task-action-button-destructive h-9 w-9 rounded-lg shadow-sm flex items-center justify-center"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardTitle
                    className={`task-title-modern text-xl font-bold leading-tight mb-2 ${
                      task.status === "completed"
                        ? "task-title-completed line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {task.title}
                  </CardTitle>

                  {task.description && (
                    <p className="task-description-modern text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="task-card-content-modern px-6 pb-6">
                  {/* Enhanced Badges Row */}
                  <div className="task-badges-row flex flex-wrap gap-2 mb-4 items-center">
                    <Badge
                      className="priority-badge font-semibold px-3 py-1 rounded-full text-xs shadow-sm"
                      style={{
                        background:
                          task.priority === "urgent"
                            ? "linear-gradient(90deg, var(--color-error-500), var(--color-error-700))"
                            : task.priority === "high"
                              ? "linear-gradient(90deg, var(--color-warning-500), var(--color-warning-700))"
                              : task.priority === "medium"
                                ? "linear-gradient(90deg, var(--color-secondary-400), var(--color-secondary-600))"
                                : "linear-gradient(90deg, var(--color-success-500), var(--color-success-700))",
                        color: "var(--color-primary-foreground)",
                      }}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority.toUpperCase()}
                    </Badge>

                    <Badge
                      className="category-badge font-semibold px-3 py-1 rounded-full text-xs shadow-sm"
                      style={{
                        background:
                          task.category === "assignment"
                            ? "linear-gradient(90deg, var(--color-primary-500), var(--color-primary-700))"
                            : task.category === "study"
                              ? "linear-gradient(90deg, var(--color-success-500), var(--color-success-700))"
                              : task.category === "exam"
                                ? "linear-gradient(90deg, var(--color-secondary-500), var(--color-secondary-700))"
                                : task.category === "project"
                                  ? "linear-gradient(90deg, var(--color-error-500), var(--color-error-700))"
                                  : task.category === "reading"
                                    ? "linear-gradient(90deg, var(--color-warning-500), var(--color-warning-700))"
                                    : "linear-gradient(90deg, var(--color-gray-500), var(--color-gray-700))",
                        color: "var(--color-primary-foreground)",
                      }}
                    >
                      {task.category === "assignment" && "📚"}
                      {task.category === "study" && "📖"}
                      {task.category === "exam" && "📝"}
                      {task.category === "project" && "🚀"}
                      {task.category === "reading" && "📑"}
                      {task.category === "personal" && "👤"}
                      <span className="ml-1 capitalize">{task.category}</span>
                    </Badge>

                    <Badge
                      className="status-badge font-semibold px-3 py-1 rounded-full text-xs shadow-sm"
                      style={{
                        background:
                          task.status === "completed"
                            ? "linear-gradient(90deg, var(--color-success-500), var(--color-success-700))"
                            : task.status === "in-progress"
                              ? "linear-gradient(90deg, var(--color-primary-500), var(--color-primary-700))"
                              : "linear-gradient(90deg, var(--color-gray-400), var(--color-gray-700))",
                        color: "var(--color-primary-foreground)",
                      }}
                    >
                      {task.status === "todo" && "⏳"}
                      {task.status === "in-progress" && "⚡"}
                      {task.status === "completed" && "✅"}
                      <span className="ml-1 capitalize">
                        {task.status === "in-progress"
                          ? "In Progress"
                          : task.status}
                      </span>
                    </Badge>
                  </div>

                  {/* Enhanced Task Meta Info */}
                  <div className="task-meta-info flex flex-col gap-3 mb-4">
                    {task.dueDate && (
                      <div
                        className="meta-item due-date-item flex items-center gap-3 p-3 rounded-xl transition-all duration-300 border"
                        style={{
                          background: isOverdue
                            ? "var(--color-error-50)"
                            : isDueSoon
                              ? "var(--color-warning-50)"
                              : "var(--color-primary-50)",
                          color: isOverdue
                            ? "var(--color-error-700)"
                            : isDueSoon
                              ? "var(--color-warning-700)"
                              : "var(--color-primary-700)",
                          borderColor: isOverdue
                            ? "var(--color-error-100)"
                            : isDueSoon
                              ? "var(--color-warning-100)"
                              : "var(--color-primary-100)",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: isOverdue
                              ? "var(--color-error-500)"
                              : isDueSoon
                                ? "var(--color-warning-500)"
                                : "var(--color-primary-500)",
                            color: "var(--color-primary-foreground)",
                          }}
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </div>
                        <span className="font-semibold">
                          {isOverdue
                            ? `${Math.abs(daysUntilDue!)} days overdue`
                            : daysUntilDue === 0
                              ? "Due today"
                              : daysUntilDue === 1
                                ? "Due tomorrow"
                                : `${daysUntilDue} days left`}
                        </span>
                      </div>
                    )}

                    {task.estimatedTime && (
                      <div
                        className="meta-item flex items-center gap-3 p-3 rounded-xl border"
                        style={{
                          background: "var(--color-secondary-50)",
                          borderColor: "var(--color-secondary-100)",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: "var(--color-secondary-500)",
                            color: "var(--color-primary-foreground)",
                          }}
                        >
                          <Clock className="h-4 w-4" />
                        </div>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--color-secondary-700)" }}
                        >
                          {task.estimatedTime} minutes
                        </span>
                      </div>
                    )}

                    {task.course && (
                      <div
                        className="meta-item flex items-center gap-3 p-3 rounded-xl border"
                        style={{
                          background: "var(--color-success-50)",
                          borderColor: "var(--color-success-100)",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: "var(--color-success-500)",
                            color: "var(--color-primary-foreground)",
                          }}
                        >
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--color-success-700)" }}
                        >
                          {task.course}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Subtasks Progress */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div
                      className="subtasks-progress rounded-xl p-4 border"
                      style={{
                        background: "var(--color-muted)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      <div className="subtasks-header flex items-center justify-between mb-3">
                        <span
                          className="font-bold text-sm uppercase tracking-wide"
                          style={{ color: "var(--color-foreground-secondary)" }}
                        >
                          Subtasks Progress
                        </span>
                        <span
                          className="font-bold px-3 py-1 rounded-full text-xs"
                          style={{
                            color: "var(--color-primary-700)",
                            background: "var(--color-primary-100)",
                          }}
                        >
                          {task.subtasks.filter((s) => s.completed).length}/
                          {task.subtasks.length} Complete
                        </span>
                      </div>
                      <div
                        className="subtasks-bar rounded-full h-3 overflow-hidden shadow-inner"
                        style={{ background: "var(--color-border)" }}
                      >
                        <div
                          className="subtasks-bar-fill h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--color-success-500), var(--color-success-700))",
                            width: `${(task.subtasks.filter((s) => s.completed).length / task.subtasks.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
