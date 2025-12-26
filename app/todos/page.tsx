import { TodoManager } from "@/components/todo-manager";
import "@/styles/todos.css";

export default function TodosPage() {
  return (
    <div className="todos-page-container">
      <div className="todos-main-container">
        <div className="todos-page-header">
          <h1 className="todos-page-title">Todo Manager</h1>
          <p className="todos-page-subtitle">
            Organize and manage your tasks and activities with ease
          </p>
        </div>
        <TodoManager />
      </div>
    </div>
  );
}
