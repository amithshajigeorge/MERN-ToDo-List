import { useState } from "react";
import { Plus } from "lucide-react";

export default function TaskForm({ onAdd, busy }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanedTitle = String(title).trim();
    if (!cleanedTitle) return;

    const created = await onAdd(cleanedTitle);
    if (created) setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-title">New task</label>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to get done?"
        maxLength={200}
        autoComplete="off"
      />
      <button className="primary-button" type="submit" disabled={busy || !title.trim()}>
        <Plus size={18} />
        <span>Add task</span>
      </button>
    </form>
  );
}
