import { useEffect, useMemo, useState } from "react";
import { CheckCheck, CircleHelp, ListTodo, Sparkles } from "lucide-react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { createTask, deleteTask, getTasks, updateTask } from "./services/api";
import "./App.css";

const FILTERS = [
  { id: "all", label: "All tasks" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" }
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      setLoading(true);
      try {
        const data = await getTasks();
        if (!cancelled) setTasks(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadTasks();
    return () => { cancelled = true; };
  }, []);

  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length
  }), [tasks]);

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  async function handleAdd(title) {
    setAdding(true);
    setError("");
    setNotice("");
    try {
      const task = await createTask(title);
      setTasks((current) => [task, ...current]);
      setNotice("Task added successfully.");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setAdding(false);
    }
  }

  async function handleToggle(task) {
    setBusyId(task._id);
    setError("");
    setNotice("");
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((current) => current.map((item) => item._id === updated._id ? updated : item));
      setNotice(updated.completed ? "Task marked complete." : "Task marked active.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id) {
    setBusyId(id);
    setError("");
    setNotice("");
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task._id !== id));
      setNotice("Task deleted.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="TaskFlow home">
          <span className="brand-mark"><CheckCheck size={21} /></span>
          <span>TaskFlow<span className="brand-dot">.</span></span>
        </a>
        <span className="stack-label"><span className="status-dot" /> MERN STACK PROJECT</span>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={14} /> A LITTLE MORE FOCUS</div>
        <h1>Make room for<br /><span>what matters.</span></h1>
        <p className="hero-subtitle">Your tasks, all in one place. Keep it simple, keep it moving.</p>
      </section>

      <section className="todo-card" aria-label="To-do list">
        <div className="card-heading">
          <div>
            <div className="heading-title"><ListTodo size={21} /><h2>My tasks</h2></div>
            <p className="task-summary">{counts.active} left to do · {counts.completed} completed</p>
          </div>
          <div className="total-pill">{counts.all} {counts.all === 1 ? "TASK" : "TASKS"}</div>
        </div>

        <TaskForm onAdd={handleAdd} busy={adding} />

        {error && <div className="message error-message" role="alert"><CircleHelp size={17} />{error}</div>}
        {notice && !error && <div className="message success-message" role="status">{notice}</div>}

        <div className="filter-row" aria-label="Filter tasks">
          <div className="filter-tabs">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`filter-tab ${filter === item.id ? "selected" : ""}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                <span className="filter-count">{counts[item.id]}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-state"><span className="spinner" /> Loading tasks from your database…</div>
        ) : (
          <TaskList
            tasks={visibleTasks}
            filter={filter}
            onToggle={handleToggle}
            onDelete={handleDelete}
            busyId={busyId}
          />
        )}

        <footer className="card-footer">
          <span><span className="footer-dot" /> Saved to MongoDB</span>
          <span>One task at a time.</span>
        </footer>
      </section>

      <footer className="page-footer">
        Built with React, Express &amp; MongoDB <span>·</span> Web Technology Assignment 2
      </footer>
    </main>
  );
}
