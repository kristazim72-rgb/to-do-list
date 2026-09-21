import { Project } from './project.js';
import { Todo } from './todo.js';
import { saveToStorage, loadFromStorage } from './storage.js';

export class AppState {
  constructor() {
    this.projects = loadFromStorage() || [this.createDefaultProject()];
    this.activeProjectId = this.projects[0].id;
  }

  createDefaultProject() {
    const inbox = new Project('Inbox', 'default-inbox');
    inbox.addTodo(new Todo('Welcome to your Todo App!', 'Sample task description', '2026-10-01', 'low'));
    return inbox;
  }

  getActiveProject() {
    return this.projects.find((p) => p.id === this.activeProjectId) || this.projects[0];
  }

  setActiveProject(id) {
    this.activeProjectId = id;
  }

  addProject(name) {
    const newProj = new Project(name);
    this.projects.push(newProj);
    this.save();
    return newProj;
  }

  addTodoToActive(title, description, dueDate, priority) {
    const activeProj = this.getActiveProject();
    const todo = new Todo(title, description, dueDate, priority);
    activeProj.addTodo(todo);
    this.save();
  }

  toggleTodoStatus(todoId) {
    const activeProj = this.getActiveProject();
    const todo = activeProj.todos.find((t) => t.id === todoId);
    if (todo) todo.toggleComplete();
    this.save();
  }

  deleteTodo(todoId) {
    const activeProj = this.getActiveProject();
    activeProj.deleteTodo(todoId);
    this.save();
  }

  save() {
    saveToStorage(this.projects);
  }
}