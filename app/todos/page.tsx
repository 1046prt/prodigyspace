import { TodoManager } from "@/components/todo-manager";
import "@/styles/todos.css";

export default function TodosPage() {
  return (
    <div className="todos">
      <div className="todos-container">
        <div className="todos-header">
          <h1 className="todos-title">Todo Manager</h1>
          <p className="todos-subtitle">
            Organize and manage your tasks and activities
          </p>
        </div>
        <TodoManager />
      </div>
    </div>
  );
}
