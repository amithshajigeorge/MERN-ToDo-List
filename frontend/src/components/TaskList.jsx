import { ListTodo } from "lucide-react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, filter, onToggle, onDelete, busyId }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><ListTodo size={26} /></div>
        <h3>{filter === "all" ? "Your list is clear" : `No ${filter} tasks`}</h3>
        <p>{filter === "all" ? "Add a task above to get your day moving." : "Try another filter or add a new task."}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          busy={busyId === task._id}
        />
      ))}
    </ul>
  );
}
