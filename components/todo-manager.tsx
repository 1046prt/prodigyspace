"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTodos } from "@/hooks/use-todos";
import type { TodoCategory, TodoPriority } from "@/types/todo";
import {
  Plus,
  CheckSquare,
  Clock,
  AlertTriangle,
  Calendar,
  Trash2,
  Download,
} from "lucide-react";
import { exportToCSV } from "@/lib/csv-export";

const categoryLabels: Record<TodoCategory, string> = {
  study: "Study",
  personal: "Personal",
  assignments: "Assignments",
  projects: "Projects",
  other: "Other",
};

const priorityLabels: Record<TodoPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const priorityColors: Record<TodoPriority, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export function TodoManager() {
  const {
    todos,
    loading,
    addTodo,
    deleteTodo,
    toggleTodo,
    getTodoStats,
    getOverdueTodos,
    getTodayTodos,
  } = useTodos();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    category: "" as TodoCategory,
    priority: "medium" as TodoPriority,
    dueDate: "",
  });

  const stats = getTodoStats();
  const overdueTodos = getOverdueTodos();
  const todayTodos = getTodayTodos();

  const handleAddTodo = () => {
    if (!newTodo.title || !newTodo.category) return;

    addTodo({
      title: newTodo.title,
      description: newTodo.description || undefined,
      category: newTodo.category,
      priority: newTodo.priority,
      dueDate: newTodo.dueDate || undefined,
      completed: false,
    });

    setNewTodo({
      title: "",
      description: "",
      category: "" as TodoCategory,
      priority: "medium",
      dueDate: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleExportCSV = () => {
    const exportData = todos.map((todo) => ({
      Title: todo.title,
      Description: todo.description || "",
      Category: categoryLabels[todo.category],
      Priority: priorityLabels[todo.priority],
      "Due Date": todo.dueDate || "",
      Completed: todo.completed ? "Yes" : "No",
      "Created At": new Date(todo.createdAt).toLocaleDateString(),
    }));
    exportToCSV(exportData, `todos_${new Date().toISOString().split("T")[0]}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    const today = new Date().toISOString().split("T")[0];
    return dueDate < today;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">Loading...</div>
    );
  }

  return (
    <div className="todos-component-container">
      {/* Header */}
      <div className="todos-header-section">
        <div className="todos-header-content">
          <h2 className="todos-header-title">My Tasks</h2>
          <p className="todos-header-subtitle">Stay organized and productive</p>
        </div>
        <div className="todos-button-container">
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="todos-dialog-title">
                  Add New Task
                </DialogTitle>
                <DialogDescription className="todos-dialog-description">
                  Create a new task to stay organized and productive
                </DialogDescription>
              </DialogHeader>
              <div className="todos-dialog-content">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="What needs to be done?"
                    value={newTodo.title}
                    onChange={(e) =>
                      setNewTodo((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add more details..."
                    value={newTodo.description}
                    onChange={(e) =>
                      setNewTodo((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="todos-form-grid">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newTodo.category}
                      onValueChange={(value: TodoCategory) =>
                        setNewTodo((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTodo.priority}
                      onValueChange={(value: TodoPriority) =>
                        setNewTodo((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(priorityLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date (Optional)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTodo.dueDate}
                    onChange={(e) =>
                      setNewTodo((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button onClick={handleAddTodo} className="w-full">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="todos-stats-grid">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completed} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks for today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.overdue}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">To be completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="todos-tabs-container">
        <TabsList className="todos-tabs-list">
          <TabsTrigger value="all" className="todos-tab-trigger-all">
            All Tasks
          </TabsTrigger>
          <TabsTrigger value="today" className="todos-tab-trigger-today">
            Today
          </TabsTrigger>
          <TabsTrigger value="overdue" className="todos-tab-trigger-overdue">
            Overdue
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="todos-tab-trigger-completed"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="todos-tab-content">
          <Card>
            <CardHeader className="todos-card-header">
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>Manage all your tasks</CardDescription>
            </CardHeader>
            <CardContent className="todos-card-content">
              {todos.length === 0 ? (
                <div className="todos-empty-state">
                  <CheckSquare className="todos-empty-icon text-muted-foreground" />
                  <div className="todos-empty-title">No tasks yet</div>
                  <div className="todos-empty-description">
                    Add your first task to get started and stay organized!
                  </div>
                </div>
              ) : (
                <div className="todos-task-list">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`todos-task-item group ${
                        todo.completed
                          ? "todos-task-item-completed"
                          : "todos-task-item-active"
                      }`}
                    >
                      <div className="todos-task-checkbox-container">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="todos-task-checkbox"
                        />
                      </div>
                      <div className="todos-task-content">
                        <div
                          className={`todos-task-title ${
                            todo.completed
                              ? "todos-task-title-completed"
                              : "todos-task-title-active"
                          }`}
                        >
                          {todo.title}
                        </div>
                        {todo.description && (
                          <div
                            className={`text-sm leading-relaxed ${
                              todo.completed
                                ? "text-muted-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {todo.description}
                          </div>
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-xs font-medium"
                          >
                            {categoryLabels[todo.category]}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${
                              priorityColors[todo.priority]
                            }`}
                          >
                            {priorityLabels[todo.priority]}
                          </Badge>
                          {todo.dueDate && (
                            <Badge
                              variant={
                                isOverdue(todo.dueDate) && !todo.completed
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="todos-task-badge todos-task-badge-date"
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(todo.dueDate)}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="todos-tab-content">
          <Card>
            <CardHeader className="todos-card-header">
              <CardTitle>Today&apos;s Tasks</CardTitle>
              <CardDescription>Focus on what&apos;s due today</CardDescription>
            </CardHeader>
            <CardContent className="todos-card-content">
              {todayTodos.length === 0 ? (
                <div className="todos-empty-state">
                  <Calendar className="todos-empty-icon text-muted-foreground" />
                  <div className="todos-empty-title">No tasks due today</div>
                  <div className="todos-empty-description">
                    Great job staying on top of things! You&apos;re all caught
                    up.
                  </div>
                </div>
              ) : (
                <div className="todos-task-list">
                  {todayTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`todos-task-item group ${
                        todo.completed
                          ? "todos-task-item-completed"
                          : "todos-task-item-active"
                      }`}
                    >
                      <div className="todos-task-checkbox-container">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="todos-task-checkbox"
                        />
                      </div>
                      <div className="todos-task-content">
                        <div
                          className={`todos-task-title ${
                            todo.completed
                              ? "todos-task-title-completed"
                              : "todos-task-title-active"
                          }`}
                        >
                          {todo.title}
                        </div>
                        {todo.description && (
                          <div
                            className={`todos-task-description ${
                              todo.completed
                                ? "todos-task-description-completed"
                                : "todos-task-description-active"
                            }`}
                          >
                            {todo.description}
                          </div>
                        )}
                        <div className="todos-task-meta">
                          <Badge
                            variant="outline"
                            className="todos-task-badge todos-task-badge-category"
                          >
                            {categoryLabels[todo.category]}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`todos-task-badge todos-task-badge-priority ${
                              priorityColors[todo.priority]
                            }`}
                          >
                            {priorityLabels[todo.priority]}
                          </Badge>
                        </div>
                      </div>
                      <div className="todos-task-actions">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="todos-task-delete-button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="todos-tab-content">
          <Card>
            <CardHeader className="todos-card-header">
              <CardTitle>Overdue Tasks</CardTitle>
              <CardDescription>
                Tasks that need immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent className="todos-card-content">
              {overdueTodos.length === 0 ? (
                <div className="todos-empty-state">
                  <CheckSquare className="todos-empty-icon text-success" />
                  <div className="todos-empty-title">No overdue tasks</div>
                  <div className="todos-empty-description">
                    Excellent! You&apos;re keeping up with all your deadlines.
                  </div>
                </div>
              ) : (
                <div className="todos-task-list">
                  {overdueTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="todos-task-item todos-task-item-overdue group"
                    >
                      <div className="todos-task-checkbox-container">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="todos-task-checkbox"
                        />
                      </div>
                      <div className="todos-task-content">
                        <div className="todos-task-title todos-task-title-active">
                          {todo.title}
                        </div>
                        {todo.description && (
                          <div className="todos-task-description todos-task-description-active">
                            {todo.description}
                          </div>
                        )}
                        <div className="todos-task-meta">
                          <Badge
                            variant="outline"
                            className="todos-task-badge todos-task-badge-category"
                          >
                            {categoryLabels[todo.category]}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`todos-task-badge todos-task-badge-priority ${
                              priorityColors[todo.priority]
                            }`}
                          >
                            {priorityLabels[todo.priority]}
                          </Badge>
                          <Badge
                            variant="destructive"
                            className="todos-task-badge todos-task-badge-date"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Due {formatDate(todo.dueDate!)}
                          </Badge>
                        </div>
                      </div>
                      <div className="todos-task-actions">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="todos-task-delete-button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="todos-tab-content">
          <Card>
            <CardHeader className="todos-card-header">
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>Tasks you&apos;ve finished</CardDescription>
            </CardHeader>
            <CardContent className="todos-card-content">
              {todos.filter((todo) => todo.completed).length === 0 ? (
                <div className="todos-empty-state">
                  <Clock className="todos-empty-icon text-muted-foreground" />
                  <div className="todos-empty-title">
                    No completed tasks yet
                  </div>
                  <div className="todos-empty-description">
                    Start checking off some tasks to see your progress here!
                  </div>
                </div>
              ) : (
                <div className="todos-task-list">
                  {todos
                    .filter((todo) => todo.completed)
                    .map((todo) => (
                      <div
                        key={todo.id}
                        className="todos-task-item todos-task-item-success group"
                      >
                        <div className="todos-task-checkbox-container">
                          <Checkbox
                            checked={true}
                            onCheckedChange={() => toggleTodo(todo.id)}
                            className="todos-task-checkbox-success"
                          />
                        </div>
                        <div className="todos-task-content">
                          <div className="todos-task-title todos-task-title-completed">
                            {todo.title}
                          </div>
                          {todo.description && (
                            <div className="todos-task-description todos-task-description-completed">
                              {todo.description}
                            </div>
                          )}
                          <div className="todos-task-meta">
                            <Badge
                              variant="outline"
                              className="todos-task-badge todos-task-badge-category todos-task-badge-opacity"
                            >
                              {categoryLabels[todo.category]}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={`todos-task-badge todos-task-badge-priority todos-task-badge-opacity ${
                                priorityColors[todo.priority]
                              }`}
                            >
                              {priorityLabels[todo.priority]}
                            </Badge>
                            {todo.dueDate && (
                              <Badge
                                variant="secondary"
                                className="todos-task-badge todos-task-badge-date todos-task-badge-opacity"
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(todo.dueDate)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="todos-task-actions">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTodo(todo.id)}
                            className="todos-task-delete-button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
