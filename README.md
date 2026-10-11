# MERN Stack To-Do List — Assignment 2

A full-stack task management application built for the Web Technology MERN assignment. It uses React + Vite, Node.js, Express, MongoDB and Mongoose.

## Features

- Fetch all tasks from MongoDB when the page loads.
- Create tasks with title validation.
- Mark tasks complete/incomplete and display completed tasks with a strikethrough.
- Delete tasks.
- Optional client-side filters for all, active and completed tasks.
- REST API error responses and appropriate HTTP status codes.
- CORS restricted to the configured frontend URL.
- Environment secrets excluded from Git.

## Project structure

```text
MERN-ToDoList/
├── backend/
│   ├── config/db.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/components/
│   ├── src/services/api.js
│   ├── src/App.jsx
│   ├── src/App.css
│   ├── src/main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
├── screenshots/
└── README.md
```

## Requirements

- Node.js (current LTS recommended) and npm
- A MongoDB local instance or MongoDB Atlas database
- Git and a GitHub account for the version-control portion

## 1. Configure MongoDB and backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set your MongoDB connection string:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

Use the connection string from your own MongoDB Atlas account, or a local URI such as `mongodb://127.0.0.1:27017/mern_todo`. Replace the example values; never commit `.env`.

Start the backend:

```bash
npm run dev
```

The server starts at `http://localhost:5000` after connecting to MongoDB. The API root can be checked at `http://localhost:5000/`.

## 2. Configure and run frontend

Open a second terminal in the project root:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start React + Vite:

```bash
npm run dev
```

Open `http://localhost:5173`. Keep both terminals running while testing.

## REST API

| Method | Endpoint | Purpose | Typical success |
|---|---|---|---|
| GET | `/api/tasks` | Get all tasks | 200 |
| POST | `/api/tasks` | Create task | 201 |
| PUT | `/api/tasks/:id` | Update title and/or completion | 200 |
| DELETE | `/api/tasks/:id` | Delete task | 200 |

Example POST body:

```json
{ "title": "Complete MERN assignment" }
```

Example PUT body:

```json
{ "completed": true }
```

The POST and PUT title validation converts a supplied title using `String()`, trims whitespace and returns 400 for an empty title. A missing task returns 404. Server errors return 500.

## 3. Test the application

1. Start MongoDB access and the backend.
2. Start the frontend.
3. Add a task; verify it appears in the list.
4. Refresh the page; verify the task remains.
5. Mark it complete and incomplete; verify the strike-through changes.
6. Delete the task; verify it disappears.
7. Try a blank/whitespace title and verify it is rejected.
8. Check browser developer tools for errors.

You can also test the endpoints with Postman or curl. For example:

```bash
curl http://localhost:5000/api/tasks
```

## 4. Git and GitHub integration — perform these steps yourself

The assignment requires a public repository, at least five meaningful commits, two feature branches and pull requests merged into `main`. Do not claim these steps are complete until you have performed them on your GitHub account.

### Suggested workflow

First create a **public empty GitHub repository** named `MERN-ToDoList`. Do not initialize it with a README if you plan to use the included README.

From the project root, initialize Git and commit the starter project on a setup branch:

```bash
git init
git branch -M setup/project
git add README.md .gitignore backend/.gitignore backend/.env.example backend/package.json
git add frontend/.gitignore frontend/.env.example frontend/package.json frontend/index.html frontend/vite.config.js
git commit -m "Set up MERN project structure"
```

Add your own GitHub repository as the remote (replace the placeholder):

```bash
git remote add origin https://github.com/YOUR-USERNAME/MERN-ToDoList.git
git push -u origin setup/project
```

Create `main` from the setup branch and push it so GitHub has a target branch for pull requests:

```bash
git switch -c main
git push -u origin main
git switch setup/project
```

Now build the backend on its required feature branch. Make separate, meaningful commits as you implement and test each part:

```bash
git switch -c feature/backend
git add backend/config backend/models backend/server.js
git commit -m "Add Task model and MongoDB connection"
git add backend/routes
git commit -m "Implement task REST API and validation"
git push -u origin feature/backend
```

Build the frontend on its required feature branch from the setup branch:

```bash
git switch setup/project
git switch -c feature/frontend
git add frontend/src/services frontend/src/components frontend/src/App.jsx frontend/src/main.jsx
git commit -m "Build React task components and API client"
git add frontend/src/App.css frontend/index.html frontend/vite.config.js
git commit -m "Style responsive task management interface"
git push -u origin feature/frontend
```

This provides at least five meaningful commits across the repository; make additional real commits if you need to fix issues during testing. Avoid empty commits or commits that do not represent actual work.

On GitHub:
1. Open a pull request from `feature/backend` into `main` (if `main` does not exist yet, first create it from the setup branch and push it).
2. Open a pull request from `feature/frontend` into `main`.
3. Resolve any merge conflicts, review both pull requests and merge them.
4. Confirm `main` contains the complete app and both pull requests appear under **Pull requests → Closed**.
5. Make sure the repository remains public until marks are published.

**Important:** Because GitHub branch protection and repository defaults vary, ensure `main` exists before opening the pull requests. Do not commit directly to `main`.

## 5. Screenshots and submission

Capture real screenshots after you run and test the app:

- `screenshots/01-add-task.png` — a task added successfully.
- `screenshots/02-complete-task.png` — a completed task with strike-through.
- `screenshots/03-delete-task.png` — the list after deletion.
- `screenshots/04-merged-pull-requests.png` — GitHub's Pull requests → Closed tab showing the merged pull requests.

Do not submit illustrative or placeholder screenshots as proof of a working app.

Zip the project excluding `node_modules` and all `.env` files. The archive should contain the source code, README and your actual screenshots. Name it:

`RollNo_Name_Assignment2_MERN_ToDoList.zip`

Replace `RollNo_Name` with your own roll number and name. Upload it to the Assignment 2 post on Google Classroom, paste your public GitHub repository URL into the file/information requested by your instructor, and verify Classroom shows **Turned in**.

## Assignment checklist

- [ ] MongoDB connection uses `process.env.MONGO_URI` via dotenv.
- [ ] Task model has title, completed and createdAt fields with required/default values.
- [ ] GET, POST, PUT and DELETE endpoints work.
- [ ] POST and PUT validate titles; correct 400/404 responses are returned.
- [ ] CORS only allows the configured frontend origin.
- [ ] React fetches on page load and uses state for updates without page reload.
- [ ] At least five meaningful commits are visible.
- [ ] `feature/backend` and `feature/frontend` branches are pushed.
- [ ] Both feature branches are merged through pull requests.
- [ ] `.env` and `node_modules` are ignored; `.env.example` is committed.
- [ ] README and actual screenshots are included.
- [ ] ZIP uploaded and Classroom status is “Turned in”.

## Academic integrity

This is an individual assignment. Read through and understand the code, run the tests, make your own meaningful commits, capture your own screenshots and verify the GitHub integration before submission.
