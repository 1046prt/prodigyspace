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
        <h2 className="task-manager-title">Task Manager</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="task-manager-button-responsive">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Select
                    value={category}
                    onValueChange={(value: Task["category"]) =>
                      setCategory(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="reading">Reading</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Priority
                  </label>
                  <Select
                    value={priority}
                    onValueChange={(value: Task["priority"]) =>
                      setPriority(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Due Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Estimated Time (minutes)
                  </label>
                  <Input
                    type="number"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="60"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Course
                  </label>
                  <Input
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g., CS 101"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Professor
                  </label>
                  <Input
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                    placeholder="Professor name"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTask}
                disabled={!title.trim()}
                className="w-full md:w-auto"
              >
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Sort */}
      <div className="task-manager-filters">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <div className="task-manager-filter-controls">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="reading">Reading</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
        <div className="tasks-grid">
          {filteredTasks.map((task) => {
            const daysUntilDue = task.dueDate
              ? getDaysUntilDue(task.dueDate)
              : null;

            return (
              <Card
                key={task.id}
                className={`task-card-enhanced task-priority-${task.priority}`}
              >
                <div className="task-priority-indicator"></div>
                <CardHeader className="pb-4">
                  <div className="task-flex-between">
                    <div className="task-flex flex-1 min-w-0">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={(checked: boolean) =>
                          onUpdateTask(task.id, {
                            status: checked ? "completed" : "todo",
                            completedAt: checked ? new Date() : undefined,
                          })
                        }
                        className="mt-1.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle
                          className={`text-lg leading-tight font-semibold mb-2 ${
                            task.status === "completed"
                              ? "line-through opacity-60"
                              : ""
                          }`}
                        >
                          {task.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            className={`task-badge-enhanced task-badge-priority-${task.priority}`}
                          >
                            <Flag className="h-3 w-3 mr-1" />
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </Badge>
                          <Badge
                            className={`task-badge-enhanced task-badge-status-${task.status}`}
                          >
                            {task.status === "in-progress"
                              ? "In Progress"
                              : task.status === "todo"
                                ? "To Do"
                                : task.status.charAt(0).toUpperCase() +
                                  task.status.slice(1)}
                          </Badge>
                          <Badge
                            className={`task-badge-enhanced task-badge-category-${task.category}`}
                          >
                            {task.category.charAt(0).toUpperCase() +
                              task.category.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteTask(task.id)}
                        className="h-8 w-8 p-0 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {task.description && (
                    <p className="task-text-muted task-mb-4 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="space-y-3 task-text-small">
                    {task.course && (
                      <div className="task-flex">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          Course:
                        </span>
                        <span className="truncate">{task.course}</span>
                      </div>
                    )}

                    {task.dueDate && (
                      <div className="task-flex">
                        <CalendarIcon
                          className={`h-4 w-4 flex-shrink-0 ${
                            daysUntilDue !== null && daysUntilDue < 0
                              ? "text-red-500"
                              : daysUntilDue !== null && daysUntilDue < 3
                                ? "text-amber-500"
                                : "text-slate-400"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            daysUntilDue !== null && daysUntilDue < 0
                              ? "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded-full text-xs"
                              : daysUntilDue !== null && daysUntilDue < 3
                                ? "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-2 py-0.5 rounded-full text-xs"
                                : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {daysUntilDue !== null && daysUntilDue < 0
                            ? `${Math.abs(daysUntilDue)} days overdue`
                            : daysUntilDue === 0
                              ? "Due today"
                              : daysUntilDue === 1
                                ? "Due tomorrow"
                                : daysUntilDue !== null
                                  ? `Due in ${daysUntilDue} days`
                                  : format(task.dueDate, "PPP")}
                        </span>
                      </div>
                    )}

                    {task.estimatedTime && (
                      <div className="task-flex">
                        <Clock className="h-4 w-4 flex-shrink-0 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          {task.estimatedTime >= 60
                            ? `${Math.floor(task.estimatedTime / 60)}h ${
                                task.estimatedTime % 60
                              }m`
                            : `${task.estimatedTime} min`}
                        </span>
                      </div>
                    )}

                    {task.professor && (
                      <div className="task-flex">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          Professor:
                        </span>
                        <span className="truncate">{task.professor}</span>
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
  );
}
