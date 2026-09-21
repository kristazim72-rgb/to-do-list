import { format, parseISO } from 'date-fns';

export function renderProjects(appState, onSelectProject) {
  const projectListEl = document.getElementById('project-list');
  projectListEl.innerHTML = '';

  appState.projects.forEach((proj) => {
    const li = document.createElement('li');
    li.textContent = proj.name;
    li.classList.add('project-item');
    if (proj.id === appState.activeProjectId) li.classList.add('active');

    li.addEventListener('click', () => onSelectProject(proj.id));
    projectListEl.appendChild(li);
  });
}

export function renderTodos(activeProject, onToggleTodo, onDeleteTodo) {
  const titleEl = document.getElementById('active-project-title');
  const todoListEl = document.getElementById('todo-list');

  titleEl.textContent = activeProject.name;
  todoListEl.innerHTML = '';

  activeProject.todos.forEach((todo) => {
    const formattedDate = todo.dueDate
      ? format(parseISO(todo.dueDate), 'MMM d, yyyy')
      : 'No due date';

    const card = document.createElement('div');
    card.classList.add('todo-card', `priority-${todo.priority}`);
    if (todo.completed) card.classList.add('completed');

    card.innerHTML = `
      <div class="todo-main">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} />
        <span class="todo-title">${todo.title}</span>
      </div>
      <div class="todo-meta">
        <span class="todo-date">${formattedDate}</span>
        <button class="delete-btn">&times;</button>
      </div>
    `;

    card.querySelector('.todo-checkbox').addEventListener('change', () => onToggleTodo(todo.id));
    card.querySelector('.delete-btn').addEventListener('click', () => onDeleteTodo(todo.id));

    todoListEl.appendChild(card);
  });
}