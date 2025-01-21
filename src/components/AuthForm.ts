import { supabase } from '../services/supabaseClient';
import { addSpinnerSmall, removeSpinnerSmall } from './Loading';

export const handleAuthForm = (app: HTMLElement, isSignUp: boolean) => {
  const authForm = document.createElement('form');
  authForm.id = 'authForm';

  // Preamble
  const preamble= document.createElement('h1');
  preamble.classList.add('text-center');
  preamble.textContent = `Stay organized and achieve more\nThis todo-app keeps you on track and in charge`;

  // Email input
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.placeholder = 'Email address';

  // Password input
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.placeholder = 'Password';

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = "submit";
  submitButton.classList.add('btn-large', 'btn-primary');
  submitButton.textContent = isSignUp ? 'Sign Up' : 'Log in';

  // Error message
  const errorMessage = document.createElement('div');
  errorMessage.id = 'errorMessage';

  // Toggle Signup vs Login
  const signUpOrLogin = document.createElement('a');
  signUpOrLogin.href = '#';
  signUpOrLogin.classList.add('toggle-signup-login', 'text-center');

  if (isSignUp) {
    submitButton.classList.add('signup');
    signUpOrLogin.textContent = `Already have an account?`;
  } else {
    submitButton.classList.remove('signup');
    signUpOrLogin.textContent = `Create an account`;
  }

  signUpOrLogin.addEventListener('click', (e) => {
    e.preventDefault();
    handleAuthForm(app, !isSignUp);
  });

  authForm.appendChild(emailInput);
  authForm.appendChild(passwordInput);
  authForm.appendChild(errorMessage);
  authForm.appendChild(submitButton);
  authForm.appendChild(signUpOrLogin);

  app.innerHTML = '';
  app.appendChild(preamble);
  app.appendChild(authForm);

  // Submit Event
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    submitButton.disabled = true;
    addSpinnerSmall(submitButton);

    try {
      if (isSignUp) {
        // Handle sign up
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error
        alert('Signup successful! Please check your email to confirm your account to logg in.');
      } else {

        // Handle log in
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error
      }

      window.location.reload(); // Reload, show ToDos

    } catch (error) {
      if (error instanceof Error) errorMessage.textContent = error.message;
      else errorMessage.textContent = 'An unknown error occurred.';
    }

    finally {
      submitButton.disabled = false;
      removeSpinnerSmall(submitButton);
    }
  });
};
