import { TodoManager } from "@/components/todo-manager";

export default function TodosPage() {
  return (
    <div className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TodoManager />
      </div>
    </div>
  );
}
