import { supabase } from './supabaseClient';
import { AuthUserPass } from '../types/app.types';

export const handleLogin = async ({ email, password }: AuthUserPass) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login error:', error.message);
    throw new Error('Log in failed. Try again.');
  }

  return data.user;
};

export const handleSignUp = async ({ email, password }: AuthUserPass) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Sign-up error:', error.message);
    throw new Error('Sign up failed. Try again later.');
  }

  return data;
};

export const handleLogOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('Log out failed. Try again.');
  }

  window.location.reload();
}
