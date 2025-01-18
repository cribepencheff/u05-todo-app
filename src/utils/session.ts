import { supabase } from '../services/supabaseClient';

export const checkSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.log('Error fetching session:', error.message);
  }

  if (!session) {
    console.log('No session, user is not logged in.');
  }

  return session;
};
