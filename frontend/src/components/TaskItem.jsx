import { Check, Trash2 } from "lucide-react";

export default function TaskItem({ task, onToggle, onDelete, busy }) {
  return (
    <li className={`task-item ${task.completed ? "is-completed" : ""}`}>
      <button
        className={`check-button ${task.completed ? "checked" : ""}`}
        type="button"
        aria-label={task.completed ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
        aria-pressed={task.completed}
        disabled={busy}
        onClick={() => onToggle(task)}
      >
        {task.completed && <Check size={15} strokeWidth={3} />}
      </button>
      <div className="task-copy">
        <span className="task-title">{task.title}</span>
        <span className="task-date">
          {new Date(task.createdAt).toLocaleDateString(undefined, {
            month: "short", day: "numeric", year: "numeric"
          })}
        </span>
      </div>
      <button
        className="icon-button delete-button"
        type="button"
        aria-label={`Delete ${task.title}`}
        title="Delete task"
        disabled={busy}
        onClick={() => onDelete(task._id)}
      >
        <Trash2 size={17} />
      </button>
    </li>
  );
}
