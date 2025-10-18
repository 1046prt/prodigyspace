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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExpenses } from "@/hooks/use-expenses";
import type { ExpenseCategory } from "@/types/expense";
import {
  Plus,
  TrendingUp,
  DollarSign,
  LucidePieChart as RechartsPieChart,
  Download,
  Trash2,
} from "lucide-react";
import { exportToCSV } from "@/lib/csv-export";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell,
} from "recharts";
import "@/styles/expense.css";

const categoryLabels: Record<ExpenseCategory, string> = {
  food: "Food & Dining",
  travel: "Transportation",
  study: "Study Materials",
  entertainment: "Entertainment",
  health: "Health & Fitness",
  other: "Other",
};

const categoryColors: Record<ExpenseCategory, string> = {
  food: "#15803d",
  travel: "#84cc16",
  study: "#d97706",
  entertainment: "#374151",
  health: "#f0fdf4",
  other: "#e5e7eb",
};

// Helper function to format currency in INR
const formatINR = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

export function ExpenseTracker() {
  const { expenses, budgets, loading, addExpense, deleteExpense } =
    useExpenses();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "" as ExpenseCategory,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const stats = useExpenses().getExpenseStats();

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.category || !newExpense.description)
      return;

    const amount = Number.parseFloat(newExpense.amount);
    if (isNaN(amount)) return;

    addExpense({
      amount,
      category: newExpense.category,
      description: newExpense.description,
      date: newExpense.date,
    });

    setNewExpense({
      amount: "",
      category: "" as ExpenseCategory,
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
  };

  const handleExportCSV = () => {
    const exportData = expenses.map((expense) => ({
      Date: expense.date,
      Category: categoryLabels[expense.category],
      Description: expense.description,
      Amount: expense.amount,
    }));
    exportToCSV(
      exportData,
      `expenses_${new Date().toISOString().split("T")[0]}`
    );
  };

  const pieChartData = Object.entries(stats.categoryBreakdown)
    .filter(([, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: categoryLabels[category as ExpenseCategory],
      value: amount,
      color: categoryColors[category as ExpenseCategory],
    }));

  const weeklyChartData = stats.weeklySpending.map((amount, index) => ({
    week: `Week ${index + 1}`,
    amount,
  }));

  if (loading) {
    return <div className="mainpage-loading-container">Loading...</div>;
  }

  return (
    <div className="mainpage-expense-tracker">
      {/* Header */}
      <div className="mainpage-expense-header">
        <div>
          <h2 className="mainpage-expense-title">Expense Tracker</h2>
          <p className="mainpage-expense-subtitle">
            Track your spending and manage your budget
          </p>
        </div>
        <div className="mainpage-button-group">
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="icon icon-download" />
            Export CSV
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="icon icon-plus" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Record a new expense to track your spending
                </DialogDescription>
              </DialogHeader>
              <div className="form-container">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value: ExpenseCategory) =>
                      setNewExpense((prev) => ({ ...prev, category: value }))
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
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="What did you spend on?"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button
                  onClick={handleAddExpense}
                  className="button-full-width"
                >
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mainpage-stats-grid">
        <Card>
          <CardHeader className="mainpage-card-header-flex">
            <CardTitle className="mainpage-card-title-small">
              Total Spent
            </CardTitle>
            <DollarSign className="icon icon-dollar" />
          </CardHeader>
          <CardContent>
            <div className="amount-display">{formatINR(stats.totalSpent)}</div>
            <p className="period-label">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="mainpage-card-header-flex">
            <CardTitle className="mainpage-card-title-small">
              Budget Remaining
            </CardTitle>
            <TrendingUp className="icon icon-trending" />
          </CardHeader>
          <CardContent>
            <div className="amount-display">
              {formatINR(stats.budgetRemaining)}
            </div>
            <p className="period-label">
              {stats.budgetRemaining >= 0 ? "Under budget" : "Over budget"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="mainpage-card-header-flex">
            <CardTitle className="mainpage-card-title-small">
              Expenses
            </CardTitle>
            <RechartsPieChart className="icon icon-pie-chart" />
          </CardHeader>
          <CardContent>
            <div className="amount-display">{expenses.length}</div>
            <p className="period-label">Total recorded</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="tabs-container">
        <TabsList className="mainpage-tabs-list">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="tabs-content">
          <div className="mainpage-chart-container">
            {/* Weekly Spending Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Spending Trend</CardTitle>
                <CardDescription>
                  Your spending over the last 7 weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `${formatINR(value as number)}`,
                        "Amount",
                      ]}
                    />
                    <Bar dataKey="amount" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
              </CardHeader>
              <CardContent>
                {pieChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) =>
                          `${name}: ${formatINR(value as number)}`
                        }
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `${formatINR(value as number)}`,
                          "Amount",
                        ]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="mainpage-no-data-message">
                    No expenses recorded yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="tabs-content">
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Your latest spending records</CardDescription>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <div className="mainpage-no-expenses-message">
                  No expenses recorded yet. Add your first expense to get
                  started!
                </div>
              ) : (
                <div className="expenses-list">
                  {expenses.slice(0, 10).map((expense) => (
                    <div key={expense.id} className="mainpage-expense-item">
                      <div className="mainpage-expense-details">
                        <div
                          className={`mainpage-category-indicator category-${expense.category}`}
                        />
                        <div>
                          <div className="expense-description">
                            {expense.description}
                          </div>
                          <div className="expense-meta">
                            {categoryLabels[expense.category]} • {expense.date}
                          </div>
                        </div>
                      </div>
                      <div className="mainpage-expense-actions">
                        <span className="amount">
                          {formatINR(expense.amount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteExpense(expense.id)}
                          className="delete-button"
                        >
                          <Trash2 className="icon icon-trash" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="tabs-content">
          <Card>
            <CardHeader>
              <CardTitle>Budget Management</CardTitle>
              <CardDescription>
                Set and track your spending limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="budgets-list">
                {budgets.map((budget) => {
                  const spent = stats.categoryBreakdown[budget.category];
                  const percentage =
                    budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
                  const isOverBudget = spent > budget.limit;

                  return (
                    <div key={budget.category} className="mainpage-budget-item">
                      <div className="mainpage-budget-header">
                        <div className="mainpage-budget-category">
                          <div
                            className={`mainpage-category-indicator category-${budget.category}`}
                          />
                          <span className="category-name">
                            {categoryLabels[budget.category]}
                          </span>
                        </div>
                        <div className="budget-status">
                          <span className="mainpage-budget-amount">
                            {formatINR(spent)} / {formatINR(budget.limit)}
                          </span>
                          {isOverBudget && (
                            <Badge
                              variant="destructive"
                              className="budget-warning"
                            >
                              Over Budget
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className={`mainpage-progress-container ${
                          isOverBudget ? "mainpage-progress-over-budget" : ""
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
