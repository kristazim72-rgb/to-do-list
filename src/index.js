import './style.css';
import { AppState } from './appState.js';
import { renderProjects, renderTodos } from './dom.js';

const app = new AppState();

// DOM Dialog Selectors
const todoDialog = document.getElementById('todo-dialog');
const projectDialog = document.getElementById('project-dialog');
const newTodoBtn = document.getElementById('new-todo-btn');
const newProjectBtn = document.getElementById('new-project-btn');
const cancelTodoBtn = document.getElementById('cancel-todo-btn');
const cancelProjectBtn = document.getElementById('cancel-project-btn');
const todoForm = document.getElementById('todo-form');
const projectForm = document.getElementById('project-form');

function updateUI() {
  renderProjects(app, (projId) => {
    app.setActiveProject(projId);
    updateUI();
  });

  renderTodos(
    app.getActiveProject(),
    (todoId) => {
      app.toggleTodoStatus(todoId);
      updateUI();
    },
    (todoId) => {
      app.deleteTodo(todoId);
      updateUI();
    }
  );
}

// Modal Handlers
newTodoBtn.addEventListener('click', () => todoDialog.showModal());
cancelTodoBtn.addEventListener('click', () => todoDialog.close());

newProjectBtn.addEventListener('click', () => projectDialog.showModal());
cancelProjectBtn.addEventListener('click', () => projectDialog.close());

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('todo-title').value;
  const desc = document.getElementById('todo-desc').value;
  const date = document.getElementById('todo-due-date').value;
  const priority = document.getElementById('todo-priority').value;

  app.addTodoToActive(title, desc, date, priority);
  todoForm.reset();
  todoDialog.close();
  updateUI();
});

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('project-name').value.trim();
  if (name) {
    const newProj = app.addProject(name);
    app.setActiveProject(newProj.id);
    projectForm.reset();
    projectDialog.close();
    updateUI();
  }
});

// Initial Render
updateUI();