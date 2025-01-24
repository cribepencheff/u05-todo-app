import { supabase } from './supabaseClient';
import { AuthUserPass } from '../types/app.types';

export const handleLogin = async ({ email, password }: AuthUserPass) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error
  window.location.reload();
};

export const handleSignUp = async ({ email, password }: AuthUserPass) => {
  const { error } = await supabase.auth.signUp({ email, password });
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
