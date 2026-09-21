import { Project } from './project.js';
import { Todo } from './todo.js';

const STORAGE_KEY = 'odin_todo_app';

export function saveToStorage(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  const rawProjects = JSON.parse(data);
  return rawProjects.map((proj) => {
    const todos = proj.todos.map(
      (t) => new Todo(t.title, t.description, t.dueDate, t.priority, t.notes, t.completed)
    );
    return new Project(proj.name, proj.id, todos);
  });
}