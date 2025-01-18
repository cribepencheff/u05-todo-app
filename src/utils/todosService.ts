import { supabase } from '../services/supabaseClient';
import { showTodos } from '../components/TodoList';
import { Todo } from '../types/app.types';

export const createTodo = async (title: string): Promise<Todo> => {
  const { data } = await  supabase.auth.getUser();

  // Skapa en ny todo
  const { data: todoData, error } = await supabase
    .from('todos')
    .insert([
      {
        title: title,
        user_id: data.user?.id,
        completed: false,
        created_at: new Date().toISOString(),
      },
    ])
    .single();

  if (error) {
    throw error;
  }

  showTodos();
  return todoData as Todo; // Returnera den skapade todo
};