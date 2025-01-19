import './style.scss';
import { handleAuthForm } from './components/AuthForm';
import { checkSession } from './utils/session';
import { TodoList } from './components/TodoList';
import { createTodo } from './utils/todosService';
import { handleLogOut } from './services/auth';

const app = document.getElementById('app') as HTMLElement;
const logOutBtn = document.getElementById('log-out') as HTMLButtonElement;
const todosEl = document.getElementById('todos') as HTMLElement;
const inputEl = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-todo-btn') as HTMLButtonElement;

const initApp = async () => {
  const session = await checkSession();
  let inputValue = '';

  if (session) {
    todosEl.classList.remove('hide');
    logOutBtn.classList.remove('hide');
    logOutBtn.addEventListener("click", handleLogOut)

    // Enable submit button
    inputEl.addEventListener("input", () => {
      inputValue = inputEl.value.trim();
      addBtn.disabled = inputValue.length < 3;
    })

    // Add todo
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (inputValue) {
        createTodo(inputValue);
        addBtn.disabled = true;
        inputEl.value = '';
        inputValue = '';
      }
    });

    // Render Todo list
    TodoList();

  } else {
    // Show Signup or Login form
    todosEl.classList.add('hide');
    handleAuthForm(app, false);
  }
};

initApp();
