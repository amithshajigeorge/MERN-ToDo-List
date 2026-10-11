const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });
  } catch {
    throw new Error("Cannot connect to the server. Make sure the backend is running.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status}).`);
  }
  return data;
}

export const getTasks = () => request("/tasks");

export const createTask = (title) =>
  request("/tasks", {
    method: "POST",
    body: JSON.stringify({ title })
  });

export const updateTask = (id, updates) =>
  request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates)
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: "DELETE" });
