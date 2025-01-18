import { Todo } from '../types/app.types';
import { getUserTodos } from '../utils/getUserTodos';

export const showTodos = async () => {

  const main = document.getElementById('todo-list') as HTMLElement;
  const ul = document.createElement("ul");
  const fetchedTodos: Todo[] = await getUserTodos();
  let hasTodos = fetchedTodos.length;

  if (hasTodos) {
    const myTodosHTML = fetchedTodos.map(todo => `
      <li>${todo.title}</li>
    `).join("");

    ul.innerHTML = myTodosHTML;
  } else {
    ul.innerHTML = `<li>List empty, please add a todo</li>`
  }

  main.innerHTML = `<h3>Your todo list</h3>`;
  main.appendChild(ul);
};
