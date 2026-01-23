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
    <div className="space-y-6">
      <div className="task-manager-header">
        <div className="task-manager-title-section">
          <h2 className="task-manager-title">
            <CheckSquare className="h-6 w-6 mr-3 text-blue-500" />
            Task Manager
          </h2>
          <p className="task-manager-description">
            Organize and track your tasks efficiently
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="task-manager-create-button">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Create New Task</span>
              <span className="sm:hidden">New Task</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden task-dialog">
            <div className="task-dialog-header">
              <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Create New Task
                    </DialogTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Set up your new task with all the details you need
                    </p>
                  </div>
                </div>
              </DialogHeader>
            </div>

            <div className="task-dialog-content overflow-y-auto">
              <div className="space-y-6 p-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                    Basic Information
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Task Title *
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a clear, descriptive title..."
                      className="h-11 text-base border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
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
                      className="text-base border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 resize-none"
                    />
                  </div>
                </div>

                {/* Task Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                    Task Details
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
                        <SelectTrigger className="h-11 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400">
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
                          <SelectItem value="personal">👤 Personal</SelectItem>
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
                        <SelectTrigger className="h-11 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400">
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
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                    Schedule & Time
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
                            className="w-full h-11 justify-start text-left font-normal bg-transparent border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400"
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
                          className="h-11 pl-10 text-base border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                          minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                    Academic Information
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
                        className="h-11 text-base border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400"
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
                        className="h-11 text-base border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="task-dialog-footer border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Fields marked with * are required
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                    className="w-full sm:w-auto h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTask}
                    disabled={!title.trim()}
                    className="w-full sm:w-auto h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Filters Section */}
      <Card className="filters-card">
        <CardContent className="filters-content">
          <div className="filters-header">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="filters-title">Filter & Sort Tasks</h3>
            <Badge className="task-count-badge">
              {filteredTasks.length} of {tasks.length}
            </Badge>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="filter-select">
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

            <div className="filter-group">
              <label className="filter-label">Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="filter-select">
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

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="filter-select">
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
        <div className="tasks-placeholder">
          <CheckCircle2 className="tasks-placeholder-icon" />
          <h3 className="tasks-placeholder-title">No tasks found</h3>
          <p className="tasks-placeholder-text">
            {tasks.length === 0
              ? "Create your first task to get started with better organization!"
              : "Try adjusting your filters to find what you're looking for."}
          </p>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="task-button-primary mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      ) : (
        <div className="tasks-grid-enhanced">
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
                className={`task-card-modern task-priority-${task.priority} ${
                  task.status === "completed" ? "task-completed" : ""
                } ${
                  isOverdue ? "task-overdue" : isDueSoon ? "task-due-soon" : ""
                }`}
              >
                {/* Priority Stripe */}
                <div
                  className={`priority-stripe priority-${task.priority}`}
                ></div>

                <CardHeader className="task-card-header-modern">
                  <div className="task-header-row">
                    <div className="task-checkbox-wrapper">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={(checked: boolean) =>
                          onUpdateTask(task.id, {
                            status: checked ? "completed" : "todo",
                            completedAt: checked ? new Date() : undefined,
                          })
                        }
                        className="task-checkbox-enhanced"
                      />
                    </div>
                    <div className="task-actions">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="task-action-button"
                        onClick={() => {
                          // Add edit functionality here
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="task-action-button task-delete-button"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardTitle
                    className={`task-title-modern ${
                      task.status === "completed" ? "task-title-completed" : ""
                    }`}
                  >
                    {task.title}
                  </CardTitle>

                  {task.description && (
                    <p className="task-description-modern">
                      {task.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="task-card-content-modern">
                  {/* Badges Row */}
                  <div className="task-badges-row">
                    <Badge
                      className={`priority-badge priority-badge-${task.priority}`}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority.toUpperCase()}
                    </Badge>

                    <Badge
                      className={`category-badge category-badge-${task.category}`}
                    >
                      {task.category === "assignment" && "📚"}
                      {task.category === "study" && "📖"}
                      {task.category === "exam" && "📝"}
                      {task.category === "project" && "🚀"}
                      {task.category === "reading" && "📑"}
                      {task.category === "personal" && "👤"}
                      {task.category}
                    </Badge>

                    <Badge
                      className={`status-badge status-badge-${task.status}`}
                    >
                      {task.status === "todo" && "⏳"}
                      {task.status === "in-progress" && "⚡"}
                      {task.status === "completed" && "✅"}
                      {task.status === "in-progress"
                        ? "In Progress"
                        : task.status}
                    </Badge>
                  </div>

                  {/* Task Meta Info */}
                  <div className="task-meta-info">
                    {task.dueDate && (
                      <div
                        className={`meta-item due-date-item ${
                          isOverdue ? "overdue" : isDueSoon ? "due-soon" : ""
                        }`}
                      >
                        <CalendarIcon className="h-4 w-4" />
                        <span>
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
                      <div className="meta-item">
                        <Clock className="h-4 w-4" />
                        <span>{task.estimatedTime} min</span>
                      </div>
                    )}

                    {task.course && (
                      <div className="meta-item">
                        <BookOpen className="h-4 w-4" />
                        <span>{task.course}</span>
                      </div>
                    )}
                  </div>

                  {/* Subtasks Progress */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="subtasks-progress">
                      <div className="subtasks-header">
                        <span>Subtasks</span>
                        <span>
                          {task.subtasks.filter((s) => s.completed).length}/
                          {task.subtasks.length}
                        </span>
                      </div>
                      <div className="subtasks-bar">
                        <div
                          className="subtasks-bar-fill"
                          style={{
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
