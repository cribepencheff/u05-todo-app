import { supabase } from '../services/supabaseClient';

export const handleAuthForm = (app: HTMLElement, isSignUp: boolean) => {
  const authForm = document.createElement('form');
  authForm.id = 'authForm';

  // Email
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.placeholder = 'Enter your email';

  // Pass
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.placeholder = 'Enter your password';

  // Submit El
  const submitButton = document.createElement('button');
  submitButton.textContent = isSignUp ? 'Sign Up' : 'Login';

  // Error message
  const errorMessage = document.createElement('div');
  errorMessage.id = 'errorMessage';
  authForm.appendChild(errorMessage);

  // Succsess message
  const successMessage = document.createElement('div');
  successMessage.id = 'successMessage';
  successMessage.textContent = 'Signup successful! Please check your email to confirm your account before logging in.';

  authForm.appendChild(emailInput);
  authForm.appendChild(passwordInput);
  authForm.appendChild(submitButton);
  app.innerHTML = '';
  app.appendChild(authForm);

  // Submit Event
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    submitButton.disabled = true;

    try {
      if (isSignUp) {

        // Handle sign up
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error

        handleAuthForm(app, false);
        app.insertBefore(successMessage, app.firstChild);
        return; // Return, to show confirmation message

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
    }
  });

  // Toggle Signup vs Login
  const toggleLink = document.createElement('a');

  toggleLink.href = '#';
  toggleLink.textContent = isSignUp
    ? `Already have an account? Log in here`
    : `Don''t have an account? Sign up here`;

  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    handleAuthForm(app, !isSignUp);
  });

  app.appendChild(toggleLink);
};
