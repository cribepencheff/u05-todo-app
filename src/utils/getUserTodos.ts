import { Todo } from '../types/app.types';
import { supabase } from '../services/supabaseClient';

export const getUserTodos = async (): Promise<Todo[]> => {
  try {
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      throw new Error('User is not logged in');
    }

    const { data: todoData, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', data.user.id);

    if (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    return todoData as Todo[];

  } catch (error) {
    if (error instanceof Error) throw error
    else throw new Error(`Unknown error while fetching todos.`);
  }
};
