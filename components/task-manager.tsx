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
    <div className="space-y-8">
      {/* Enhanced Header Section with Gradient Background */}
      <div className="task-manager-header-enhanced bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-lg">
        <div className="task-manager-title-section text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Task Manager
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your productivity with intelligent task organization and
            beautiful progress tracking
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 border-0">
                <Plus className="h-5 w-5 mr-3" />
                <span className="hidden sm:inline">Create New Task</span>
                <span className="sm:hidden">New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden task-dialog bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 border-blue-100 dark:border-gray-700 shadow-2xl rounded-2xl">
              <div className="task-dialog-header">
                <DialogHeader className="border-b border-gradient-to-r from-blue-200 to-purple-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-12 transition-all duration-300">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Create New Task
                      </DialogTitle>
                      <p className="text-base text-gray-600 dark:text-gray-300 mt-2">
                        Transform your ideas into organized, actionable tasks
                      </p>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="task-dialog-content overflow-y-auto">
                <div className="space-y-6 p-6">
                  {/* Basic Information Section */}
                  <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center gap-3 text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md"></div>
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
                  <div className="space-y-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-green-100 dark:border-gray-600">
                    <div className="flex items-center gap-3 text-sm font-bold text-green-700 dark:text-green-300 uppercase tracking-wider">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-md"></div>
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
                  <div className="space-y-6 p-6 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-purple-100 dark:border-gray-600">
                    <div className="flex items-center gap-3 text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full shadow-md"></div>
                      <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
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
                  <div className="space-y-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-amber-100 dark:border-gray-600">
                    <div className="flex items-center gap-3 text-sm font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-md"></div>
                      <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
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

              <div className="task-dialog-footer border-t border-gradient-to-r from-blue-200 to-purple-200 dark:border-gray-700 p-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
                      className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
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
      <Card className="filters-card bg-gradient-to-r from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 border-blue-100 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
        <CardContent className="filters-content p-8">
          <div className="filters-header flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Filter className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Filter & Sort Tasks
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Organize your tasks the way you need them
                </p>
              </div>
            </div>
            <Badge className="task-count-badge bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-base font-bold shadow-md">
              {filteredTasks.length} of {tasks.length}
            </Badge>
          </div>

          <div className="filters-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="filter-group space-y-3">
              <label className="filter-label text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Status
              </label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="filter-select h-12 border-2 border-blue-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
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
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Category
              </label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="filter-select h-12 border-2 border-green-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
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
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="filter-select h-12 border-2 border-purple-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
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
        <div className="tasks-placeholder text-center py-16 px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-blue-200 dark:border-gray-600">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
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
            className="task-button-primary bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
          >
            <Plus className="h-5 w-5 mr-3" />
            Add Task
          </Button>
        </div>
      ) : (
        <div className="tasks-grid-enhanced grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                className={`task-card-modern group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  task.status === "completed"
                    ? "task-completed opacity-75 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700"
                    : ""
                } ${
                  isOverdue
                    ? "task-overdue bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-700"
                    : isDueSoon
                      ? "task-due-soon bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700"
                      : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {/* Enhanced Priority Stripe */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"></div>
                <div
                  className={`absolute top-0 left-0 w-full h-2 ${
                    task.priority === "urgent"
                      ? "bg-gradient-to-r from-red-500 to-pink-600"
                      : task.priority === "high"
                        ? "bg-gradient-to-r from-orange-500 to-red-500"
                        : task.priority === "medium"
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : "bg-gradient-to-r from-green-500 to-blue-500"
                  } opacity-90 shadow-sm`}
                ></div>

                <CardHeader className="task-card-header-modern p-6 pb-4">
                  <div className="task-header-row flex items-start justify-between mb-4">
                    <div className="task-checkbox-wrapper">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={(checked: boolean) =>
                          onUpdateTask(task.id, {
                            status: checked ? "completed" : "todo",
                            completedAt: checked ? new Date() : undefined,
                          })
                        }
                        className="task-checkbox-enhanced w-6 h-6 rounded-lg border-2 border-blue-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-600 data-[state=checked]:border-green-500 shadow-sm"
                      />
                    </div>
                    <div className="task-actions flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="task-action-button h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow-sm"
                        onClick={() => {
                          // Add edit functionality here
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="task-action-button task-delete-button h-9 w-9 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 shadow-sm"
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
                  <div className="task-badges-row flex flex-wrap gap-2 mb-4">
                    <Badge
                      className={`priority-badge font-semibold px-3 py-1 rounded-full text-xs shadow-sm ${
                        task.priority === "urgent"
                          ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                          : task.priority === "high"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : task.priority === "medium"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                              : "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                      }`}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority.toUpperCase()}
                    </Badge>

                    <Badge
                      className={`category-badge font-semibold px-3 py-1 rounded-full text-xs shadow-sm ${
                        task.category === "assignment"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                          : task.category === "study"
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                            : task.category === "exam"
                              ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white"
                              : task.category === "project"
                                ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                                : task.category === "reading"
                                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                                  : "bg-gradient-to-r from-gray-500 to-slate-600 text-white"
                      }`}
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
                      className={`status-badge font-semibold px-3 py-1 rounded-full text-xs shadow-sm ${
                        task.status === "completed"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                          : task.status === "in-progress"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                            : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                      }`}
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
                  <div className="task-meta-info space-y-3 mb-4">
                    {task.dueDate && (
                      <div
                        className={`meta-item due-date-item flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          isOverdue
                            ? "bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
                            : isDueSoon
                              ? "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
                              : "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isOverdue
                              ? "bg-red-500 text-white"
                              : isDueSoon
                                ? "bg-amber-500 text-white"
                                : "bg-blue-500 text-white"
                          }`}
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
                      <div className="meta-item flex items-center gap-3 p-3 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl border border-purple-200 dark:border-purple-700">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center">
                          <Clock className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-purple-700 dark:text-purple-300">
                          {task.estimatedTime} minutes
                        </span>
                      </div>
                    )}

                    {task.course && (
                      <div className="meta-item flex items-center gap-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-700">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-green-700 dark:text-green-300">
                          {task.course}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Subtasks Progress */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="subtasks-progress bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <div className="subtasks-header flex items-center justify-between mb-3">
                        <span className="font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                          Subtasks Progress
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-xs">
                          {task.subtasks.filter((s) => s.completed).length}/
                          {task.subtasks.length} Complete
                        </span>
                      </div>
                      <div className="subtasks-bar bg-gray-300 dark:bg-gray-600 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="subtasks-bar-fill bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
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
