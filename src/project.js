export class Project {
  constructor(name, id = Date.now().toString(), todos = []) {
    this.id = id;
    this.name = name;
    this.todos = todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }
}