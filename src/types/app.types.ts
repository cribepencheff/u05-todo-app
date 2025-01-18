import { Database } from '../types/supabase.types';

export type AuthUserPass = {
  email: string,
  password: string,
}

export type Todo = Database['public']['Tables']['todos']['Row'];
