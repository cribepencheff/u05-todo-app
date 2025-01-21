import './style.scss';
import { supabase } from './services/supabaseClient';
import { checkSession } from './utils/session';
import { createTodo, handleClearList } from './utils/todosService';
import { handleLogOut } from './services/auth';
import { handleAuthForm } from './components/AuthForm';
import { addSpinnerSmall, removeSpinnerSmall } from './components/Loading';
import { ShowTodoList } from './components/ShowTodoList';

const app = document.getElementById('app') as HTMLElement;
const header = document.getElementById('header') as HTMLElement;
const headerUser = header.querySelector('.user-email') as HTMLElement;
const logOutBtn = document.getElementById('log-out') as HTMLButtonElement;
const todosEl = document.getElementById('todos') as HTMLElement;
const inputEl = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-todo-btn') as HTMLButtonElement;
const clearListBtn = document.getElementById('clear-list-btn') as HTMLButtonElement;

const initApp = async () => {
  const { data } = await supabase.auth.getUser();
  const session = await checkSession();

  headerUser.innerText = data.user?.email ?? 'User not logged in';

  let inputValue = '';

  if (session) {
    todosEl.classList.remove('hide');
    logOutBtn.classList.remove('hide');

    logOutBtn.addEventListener("click", async () => {
      await handleLogOut();
    });

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

    // Clear list
    clearListBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleClearList();
    });

    // Render Todo list
    addSpinnerSmall(todosEl);
    await ShowTodoList();
    removeSpinnerSmall(todosEl);

  } else {
    // Show Signup or Login form
    todosEl.classList.add('hide');
    handleAuthForm(app, false);
  }
};

initApp();
