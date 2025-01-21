import { Todo } from '../types/app.types';
import { getUserTodos } from '../utils/getUserTodos';
import { handleRenameTodo, handleTodoCompletion } from '../utils/todosService';

export const ShowTodoList = async () => {
  const main = document.getElementById('todo-list') as HTMLElement;
  const clearListBtn = document.getElementById('clear-list-btn') as HTMLButtonElement;
  const ul = document.createElement("ul");
  const fetchedTodos: Todo[] = await getUserTodos();
  let hasTodos = fetchedTodos.length > 0;

  if (hasTodos) {
    clearListBtn.classList.remove('hide');

    ul.innerHTML = fetchedTodos
      .sort((a, b) => {
        const createdAtA = new Date(a.created_at);
        const createdAtB = new Date(b.created_at);
        return createdAtB.getTime() - createdAtA.getTime();
      })
      .map((todo) => `
        <li data-id="${todo.id}" data-title="${todo.title}" data-completed="${todo.completed}" class="${todo.completed ? 'todo-completed' : ''}">
          <input type="checkbox" class="completed-status" ${ todo.completed ? 'checked' : '' }>
          ${todo.title}
          <button class="edit-todo">Edit</button>
          <button class="delete-todo">Del</button>
        </li>
      `).join("");

    ul.querySelectorAll('button, input').forEach((el) => {
      const li = el.closest('li')!;
      const todoId = parseInt(li.getAttribute('data-id')!);
      const todoTitle = li.getAttribute('data-title')!;

      el.addEventListener("click", () => {
        // Edit todo
        if (el.tagName === "BUTTON") {
          handleRenameTodo(el as HTMLButtonElement, todoId, todoTitle);
        }

        // Update completion
        if (el.className.includes('completed-status')) {
          handleTodoCompletion(todoId, (el as HTMLInputElement).checked)
        }
      })
    });
  } else {
    ul.innerHTML = `<li>List empty, please add a todo</li>`;
    clearListBtn.classList.add('hide');
  }

  main.innerHTML = '';
  main.appendChild(ul);
};
