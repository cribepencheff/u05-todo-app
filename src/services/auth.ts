import { supabase } from './supabaseClient';
import { AuthUserPass } from '../types/app.types';

const redirectTo =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_REDIRECT_URL_DEV
    : import.meta.env.VITE_REDIRECT_URL_PROD;

export const handleLogin = async ({ email, password }: AuthUserPass) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error
  window.location.reload();
};

export const handleSignUp = async ({ email, password }: AuthUserPass) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
    }, });
  if (error) throw error
  alert('Signup successful! \n Please check your email to confirm your account to logg in.');
  window.location.reload();
};

export const handleLogOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('Log out failed. Try again.');
  }

  window.location.reload();
}
