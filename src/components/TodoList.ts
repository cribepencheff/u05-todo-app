import { Todo } from '../types/app.types';
import { getUserTodos } from '../utils/getUserTodos';
import { handleEditTodo } from '../utils/todosService';

export const showTodos = async () => {
  const main = document.getElementById('todo-list') as HTMLElement;
  const ul = document.createElement("ul");
  const fetchedTodos: Todo[] = await getUserTodos();
  let hasTodos = fetchedTodos.length > 0;

  if (hasTodos) {

    ul.innerHTML = fetchedTodos.map(todo => `
      <li data-id="${todo.id}" data-title="${todo.title}">
        ${todo.title}
        <button class="delete-todo">Del</button>
        <button class="edit-todo">Edit</button>
      </li>
    `).join("");

    ul.querySelectorAll('button').forEach((btn) => {
      const li = btn.closest('li')!;
      const todoId = parseInt(li.getAttribute('data-id')!);
      const todoTitle = li.getAttribute('data-title')!;

      btn.addEventListener('click', () => handleEditTodo(btn, todoId, todoTitle));
    });
  } else {
    ul.innerHTML = `<li>List empty, please add a todo</li>`
  }

  main.innerHTML = `<h3>Your todo list</h3>`;
  main.appendChild(ul);
};
