"use client";

import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { useTodos } from "@/hooks/use-todos";
import type { TodoCategory, TodoPriority } from "@/types/todo";
import {
  Plus,
  CheckSquare,
  AlertTriangle,
  Calendar,
  Trash2,
  Download,
  Target,
  TrendingUp,
  Star,
  Zap,
  CheckCircle2,
  Timer,
  Award,
  Sparkles,
} from "lucide-react";
import "@/styles/todo-manager.css";
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
  const [showCompletedAnimation, setShowCompletedAnimation] = useState<
    string | null
  >(null);
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
  const completionPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const handleToggleTodo = (id: string) => {
    setShowCompletedAnimation(id);
    setTimeout(() => {
      toggleTodo(id);
      setShowCompletedAnimation(null);
    }, 300);
  };

  useEffect(() => {
    if (showCompletedAnimation) {
      const timer = setTimeout(() => setShowCompletedAnimation(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [showCompletedAnimation]);

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
      <div className="todos-loading">
        <div className="todos-loading-spinner">
          <div className="todos-loading-circle"></div>
          <div className="todos-loading-circle"></div>
          <div className="todos-loading-circle"></div>
        </div>
        <p className="todos-loading-text">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="todos-component-container">
      {/* Header */}
      <div className="todos-header-section animate-fade-in">
        <div className="todos-header-content">
          <div className="todos-header-icon-wrapper">
            <Sparkles className="todos-header-icon icon-md" />
            <h2 className="todos-header-title">My Tasks</h2>
          </div>
          <p className="todos-header-subtitle">
            Stay organized and achieve your goals
          </p>
          {stats.total > 0 && (
            <div className="todos-progress-section">
              <div className="todos-progress-info">
                <span className="todos-progress-label">Overall Progress</span>
                <span className="todos-progress-percentage">
                  {completionPercentage}%
                </span>
              </div>
              <Progress
                value={completionPercentage}
                className="todos-progress-bar"
              />
              <p className="todos-progress-text">
                {stats.completed} of {stats.total} tasks completed
              </p>
            </div>
          )}
        </div>
          <div className="todos-button-container">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="todos-export-btn"
          >
            <Download className="icon-sm" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
              <Button className="todos-add-btn">
                <Plus className="icon-sm" />
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
      <div className="todos-stats-grid animate-fade-in-up">
        <Card className="todos-stat-card todos-stat-card-total">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Total Tasks
            </CardTitle>
            <Target className="h-5 w-5 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <p className="text-sm text-white/70 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {stats.completed} completed
            </p>
          </CardContent>
        </Card>
        <Card className="todos-stat-card todos-stat-card-today">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Due Today
            </CardTitle>
            <Timer className="h-5 w-5 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {stats.todayTasks}
            </div>
            <p className="text-sm text-white/70 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Focus time
            </p>
          </CardContent>
        </Card>
        <Card className="todos-stat-card todos-stat-card-overdue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Overdue
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.overdue}</div>
            <p className="text-sm text-white/70 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card className="todos-stat-card todos-stat-card-pending">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Pending
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.pending}</div>
            <p className="text-sm text-white/70 flex items-center gap-1">
              <Star className="h-3 w-3" />
              Ready to go
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="all"
        className="todos-tabs-container animate-fade-in-up"
      >
        <TabsList className="todos-tabs-list">
          <TabsTrigger
            value="all"
            className="todos-tab-trigger todos-tab-trigger-all"
          >
            <Target className="h-4 w-4" />
            All Tasks
          </TabsTrigger>
          <TabsTrigger
            value="today"
            className="todos-tab-trigger todos-tab-trigger-today"
          >
            <Timer className="h-4 w-4" />
            Today
          </TabsTrigger>
          <TabsTrigger
            value="overdue"
            className="todos-tab-trigger todos-tab-trigger-overdue"
          >
            <AlertTriangle className="h-4 w-4" />
            Overdue
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="todos-tab-trigger todos-tab-trigger-completed"
          >
            <Award className="h-4 w-4" />
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
                <div className="todos-empty-state animate-fade-in">
                  <div className="todos-empty-icon-wrapper">
                    <Sparkles className="todos-empty-icon todos-empty-icon-sparkle" />
                    <CheckSquare className="todos-empty-icon todos-empty-icon-main" />
                  </div>
                  <div className="todos-empty-title">
                    Ready to conquer your day?
                  </div>
                  <div className="todos-empty-description">
                    Create your first task and start your productivity journey!
                  </div>
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="todos-empty-cta"
                  >
                    <Plus className="h-4 w-4" />
                    Create First Task
                  </Button>
                </div>
              ) : (
                <div className="todos-task-list">
                  {todos.map((todo, index) => (
                    <div
                      key={todo.id}
                      className={`todos-task-item group animate-slide-in ${
                        todo.completed
                          ? "todos-task-item-completed"
                          : "todos-task-item-active"
                      } ${showCompletedAnimation === todo.id ? "todos-task-completing" : ""}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="todos-task-checkbox-container">
                        <div className="todos-checkbox-wrapper">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => handleToggleTodo(todo.id)}
                            className="todos-task-checkbox"
                          />
                          {todo.completed && (
                            <CheckCircle2 className="todos-check-overlay" />
                          )}
                        </div>
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
                          {todo.priority === "high" && !todo.completed && (
                            <Star className="todos-priority-star" />
                          )}
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
                        <div className="todos-task-badges">
                          <Badge
                            variant="outline"
                            className={`todos-badge-category todos-badge-${todo.category}`}
                          >
                            {categoryLabels[todo.category]}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`todos-badge-priority todos-badge-priority-${todo.priority}`}
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
                              className="todos-badge-date"
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
                          className="todos-delete-btn"
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
          <Card className="todos-content-card">
            <CardHeader className="todos-card-header">
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-primary" />
                Today&apos;s Tasks
              </CardTitle>
              <CardDescription>Focus on what&apos;s due today</CardDescription>
            </CardHeader>
            <CardContent className="todos-card-content">
              {todayTodos.length === 0 ? (
                <div className="todos-empty-state animate-fade-in">
                  <div className="todos-empty-icon-wrapper">
                    <Award className="todos-empty-icon todos-empty-icon-award" />
                  </div>
                  <div className="todos-empty-title">No tasks due today</div>
                  <div className="todos-empty-description">
                    Perfect! You&apos;re all caught up. Time to plan ahead! 🎉
                  </div>
                </div>
              ) : (
                <div className="todos-task-list">
                  {todayTodos.map((todo, index) => (
                    <div
                      key={todo.id}
                      className={`todos-task-item todos-task-item-today group animate-slide-in ${
                        todo.completed
                          ? "todos-task-item-completed"
                          : "todos-task-item-active"
                      } ${showCompletedAnimation === todo.id ? "todos-task-completing" : ""}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="todos-task-checkbox-container">
                        <div className="todos-checkbox-wrapper">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => handleToggleTodo(todo.id)}
                            className="todos-task-checkbox"
                          />
                          {todo.completed && (
                            <CheckCircle2 className="todos-check-overlay" />
                          )}
                        </div>
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
                          {todo.priority === "high" && !todo.completed && (
                            <Star className="todos-priority-star" />
                          )}
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
                        <div className="todos-task-badges">
                          <Badge
                            variant="outline"
                            className={`todos-badge-category todos-badge-${todo.category}`}
                          >
                            {categoryLabels[todo.category]}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`todos-badge-priority todos-badge-priority-${todo.priority}`}
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
                          className="todos-delete-btn"
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
          <Card className="todos-content-card todos-overdue-card">
            <CardHeader className="todos-card-header">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Overdue Tasks
              </CardTitle>
              <CardDescription>
                Tasks that need immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent className="todos-card-content">
              {overdueTodos.length === 0 ? (
                <div className="todos-empty-state animate-fade-in">
                  <div className="todos-empty-icon-wrapper">
                    <CheckSquare className="todos-empty-icon todos-empty-icon-success" />
                  </div>
                  <div className="todos-empty-title">No overdue tasks</div>
                  <div className="todos-empty-description">
                    Excellent! You&apos;re keeping up with all your deadlines.
                    🌟
                  </div>
                </div>
              ) : (
                <div className="todos-task-list">
                  {overdueTodos.map((todo, index) => (
                    <div
                      key={todo.id}
                      className={`todos-task-item todos-task-item-overdue group animate-slide-in animate-pulse-border ${
                        showCompletedAnimation === todo.id
                          ? "todos-task-completing"
                          : ""
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="todos-task-checkbox-container">
                        <div className="todos-checkbox-wrapper">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => handleToggleTodo(todo.id)}
                            className="todos-task-checkbox"
                          />
                          {todo.completed && (
                            <CheckCircle2 className="todos-check-overlay" />
                          )}
                        </div>
                      </div>
                      <div className="todos-task-content">
                        <div className="todos-task-title todos-task-title-active">
                          {todo.title}
                          <Zap className="todos-urgent-indicator" />
                        </div>
                        {todo.description && (
                          <div className="todos-task-description todos-task-description-active">
                            {todo.description}
                          </div>
                        )}
                        <div className="todos-task-badges">
                          <Badge
                            variant="outline"
                            className={`todos-badge-category todos-badge-${todo.category}`}
                          >
                            {categoryLabels[todo.category]}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`todos-badge-priority todos-badge-priority-${todo.priority}`}
                          >
                            {priorityLabels[todo.priority]}
                          </Badge>
                          <Badge
                            variant="destructive"
                            className="todos-badge-overdue animate-pulse"
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
                          className="todos-delete-btn"
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
          <Card className="todos-content-card todos-completed-card">
            <CardHeader className="todos-card-header">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Completed Tasks
                {stats.completed > 0 && (
                  <Badge
                    variant="secondary"
                    className="todos-achievement-badge"
                  >
                    {stats.completed} done! 🎉
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Celebrate your achievements</CardDescription>
            </CardHeader>
            <CardContent className="todos-card-content">
              {todos.filter((todo) => todo.completed).length === 0 ? (
                <div className="todos-empty-state animate-fade-in">
                  <div className="todos-empty-icon-wrapper">
                    <Target className="todos-empty-icon todos-empty-icon-target" />
                  </div>
                  <div className="todos-empty-title">
                    No completed tasks yet
                  </div>
                  <div className="todos-empty-description">
                    Start checking off some tasks to see your progress here! 🚀
                  </div>
                </div>
              ) : (
                <div className="todos-task-list">
                  {todos
                    .filter((todo) => todo.completed)
                    .map((todo, index) => (
                      <div
                        key={todo.id}
                        className="todos-task-item todos-task-item-success group animate-slide-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="todos-task-checkbox-container">
                          <div className="todos-checkbox-wrapper todos-checkbox-completed">
                            <Checkbox
                              checked={true}
                              onCheckedChange={() => toggleTodo(todo.id)}
                              className="todos-task-checkbox-success"
                            />
                            <CheckCircle2 className="todos-check-overlay todos-check-permanent" />
                          </div>
                        </div>
                        <div className="todos-task-content">
                          <div className="todos-task-title todos-task-title-completed">
                            {todo.title}
                            <Sparkles className="todos-completed-sparkle" />
                          </div>
                          {todo.description && (
                            <div className="todos-task-description todos-task-description-completed">
                              {todo.description}
                            </div>
                          )}
                          <div className="todos-task-badges">
                            <Badge
                              variant="outline"
                              className={`todos-badge-category todos-badge-faded todos-badge-${todo.category}`}
                            >
                              {categoryLabels[todo.category]}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={`todos-badge-priority todos-badge-faded todos-badge-priority-${todo.priority}`}
                            >
                              {priorityLabels[todo.priority]}
                            </Badge>
                            {todo.dueDate && (
                              <Badge
                                variant="secondary"
                                className="todos-badge-date todos-badge-faded"
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
                            className="todos-delete-btn"
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
