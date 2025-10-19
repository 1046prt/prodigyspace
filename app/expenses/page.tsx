import { ExpenseTracker } from "@/components/expense-tracker";
import "@/styles/expenses.css";

export default function ExpensesPage() {
  return (
    <div className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExpenseTracker />
      </div>
    </div>
  );
}
