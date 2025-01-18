import { supabase } from '../services/supabaseClient';
import { Todo } from '../types/app.types';
import { getUserTodos } from '../utils/getUserTodos';
import { deleteTodo } from '../utils/todosService';

export const showTodos = async () => {
  const { data } = await  supabase.auth.getUser();
  const userId = data.user?.id;
  const main = document.getElementById('todo-list') as HTMLElement;
  const ul = document.createElement("ul");
  const fetchedTodos: Todo[] = await getUserTodos();
  let hasTodos = fetchedTodos.length;

  if (hasTodos) {
    ul.innerHTML = fetchedTodos.map(todo => `
      <li data-id="${todo.id}">
        ${todo.title}
        <button class="delete-todo">DEL</button>
      </li>
    `).join("");

    ul.querySelectorAll('.delete-todo').forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', async (e) => {
        const li = (e.target as HTMLElement).closest('li');
        const todoId = parseInt(li?.getAttribute('data-id')!);
        const confirmDelete = confirm(`Are you sure you want to remove this Todo?`);

        if (todoId && userId && confirmDelete) {
          await deleteTodo(todoId, userId);
        }
      })
    });


  } else {
    ul.innerHTML = `<li>List empty, please add a todo</li>`
  }

  main.innerHTML = `<h3>Your todo list</h3>`;
  main.appendChild(ul);
};
