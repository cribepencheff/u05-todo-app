import { Todo } from '../types/app.types';
import { getUserTodos } from '../utils/getUserTodos';
import { handleRenameTodo, handleTodoCompletion } from '../utils/todosService';

import iconDelete from '../assets/icons/delete.svg';
import iconDeleteLight from '../assets/icons/delete-lgt.svg';
import iconEdit from '../assets/icons/edit.svg';
import iconEditLight from '../assets/icons/edit-lgt.svg';

export const ShowTodoList = async () => {
  const main = document.getElementById('todo-list') as HTMLElement;
  const todoListHeading = document.getElementById('todo-list-heading') as HTMLHeadingElement;
  const ul = document.createElement("ul");
  const fetchedTodos: Todo[] = await getUserTodos();
  let hasTodos = fetchedTodos.length > 0;

  // Random illustration
  const illustrationPaths = import.meta.glob('../assets/illustrations/*', { eager: true });
  const illustrations: string[] = Object.values(illustrationPaths).map(image => (image as { default: string }).default);
  const randomNumber = Math.floor(Math.random() * illustrations.length);
  const randomIllustrationURL = illustrations[randomNumber];

  if (hasTodos) {
    todoListHeading.classList.remove('hide');

    ul.innerHTML = fetchedTodos
      .sort((a, b) => {
        const createdAtA = new Date(a.created_at);
        const createdAtB = new Date(b.created_at);
        return createdAtB.getTime() - createdAtA.getTime();
      })
      .map((todo) => `
        <li data-id="${todo.id}" data-title="${todo.title}" data-completed="${todo.completed}" class="${todo.completed ? 'todo-completed' : ''}">
          <label>
            <input type="checkbox" class="completed-status" ${ todo.completed ? 'checked' : '' }>
            ${todo.title}
          </label>

          <div class="button-group">
            <button class="edit-todo">
              <picture class="icon">
                <source srcset="${iconEdit}" media="(prefers-color-scheme: light)">
                <img src="${iconEditLight}" alt="Edit icon">
              </picture>
            </button>

            <button class="delete-todo">
              <picture class="icon">
                <source srcset="${iconDelete}" media="(prefers-color-scheme: light)">
                <img src="${iconDeleteLight}" alt="Delete icon">
              </picture>
            </button>
          </div>
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
    ul.innerHTML = `
      <li class="todo-list-empty">
        <img src="${randomIllustrationURL}" width="200" height="200" alt="Happy cactus">
        <h3 class="text-center">Your list is empty <br> - start fresh by adding a new task!</h3>
      </li>`;
    todoListHeading.classList.add('hide');
  }

  main.innerHTML = '';
  main.appendChild(ul);
};
