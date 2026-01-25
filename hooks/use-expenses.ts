"use client";

import { useCallback } from "react";
import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type {
  Expense,
  ExpenseCategory,
  Budget,
  ExpenseStats,
} from "@/types/expense";

export function useExpenses() {
  const [expenses, setExpenses, expensesLoading] = useProdigyStorage<Expense[]>(
    "expenses",
    [],
    dateTransformers,
  );

  const [budgets, setBudgets, budgetsLoading] = useProdigyStorage<Budget[]>(
    "budgets",
    getDefaultBudgets(),
    dateTransformers,
  );

  const addExpense = useCallback(
    (expense: Omit<Expense, "id" | "createdAt">) => {
      const newExpense: Expense = {
        ...expense,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      setExpenses((prev) => [newExpense, ...prev]);
    },
    [],
  );

  const updateExpense = useCallback((id: string, updates: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense,
      ),
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  const updateBudget = useCallback(
    (category: ExpenseCategory, limit: number) => {
      setBudgets((prev) =>
        prev.map((budget) =>
          budget.category === category ? { ...budget, limit } : budget,
        ),
      );
    },
    [],
  );

  const getExpenseStats = useCallback((): ExpenseStats => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter expenses for current month
    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const totalSpent = monthlyExpenses.reduce(
      (sum: number, expense) => sum + expense.amount,
      0,
    );

    const categoryBreakdown: Record<ExpenseCategory, number> = {
      food: 0,
      travel: 0,
      study: 0,
      entertainment: 0,
      health: 0,
      other: 0,
    };

    monthlyExpenses.forEach((expense) => {
      categoryBreakdown[expense.category] += expense.amount;
    });

    const totalBudget = budgets.reduce(
      (sum: number, budget) => sum + budget.limit,
      0,
    );
    const budgetRemaining = totalBudget - totalSpent;

    // Calculate weekly spending for the last 7 weeks
    const weeklySpending: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= weekStart && expenseDate <= weekEnd;
      });

      const weekTotal = weekExpenses.reduce(
        (sum: number, expense) => sum + expense.amount,
        0,
      );
      weeklySpending.push(weekTotal);
    }

    return {
      totalSpent,
      budgetRemaining,
      categoryBreakdown,
      weeklySpending,
    };
  }, [expenses, budgets]);

  return {
    expenses,
    budgets,
    loading: expensesLoading || budgetsLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    updateBudget,
    getExpenseStats,
  };
}

function getDefaultBudgets(): Budget[] {
  return [
    { category: "food", limit: 300, spent: 0 },
    { category: "travel", limit: 100, spent: 0 },
    { category: "study", limit: 150, spent: 0 },
    { category: "entertainment", limit: 100, spent: 0 },
    { category: "health", limit: 50, spent: 0 },
    { category: "other", limit: 100, spent: 0 },
  ];
}
