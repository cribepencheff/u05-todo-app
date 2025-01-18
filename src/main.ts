import './style.scss';
import { handleAuthForm } from './components/authForm';
import { checkSession } from './utils/session';
import { showTodos } from './components/TodoList';
import { createTodo } from './utils/todosService';
import { handleLogOut } from './services/auth';

const app = document.getElementById('app') as HTMLElement;
const logOutBtn = document.getElementById('log-out') as HTMLButtonElement;
const todosEl = document.getElementById('todos') as HTMLElement;
const inputEl = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-todo-btn') as HTMLButtonElement;

const initApp = async () => {
  const session = await checkSession();

  if (session) {
    todosEl.classList.remove('hide');
    logOutBtn.classList.remove('hide');

    logOutBtn.addEventListener("click", handleLogOut)

    // Enable submit button
    inputEl.addEventListener("input", () => {
      if (inputEl.value.length >= 3) {
        addBtn.disabled = false;
      }
    })

    // Post todo
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (inputEl.value) {
        createTodo(inputEl.value);
        addBtn.disabled = true;
        inputEl.value = '';
      }
    });

    // Render Todo list
    showTodos();

  } else {
    // Show Signup or Login form
    todosEl.classList.add('hide');
    handleAuthForm(app, false);
  }
};

initApp();
