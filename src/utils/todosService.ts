import { supabase } from '../services/supabaseClient';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/app.types';

export const createTodo = async (title: string): Promise<Todo> => {
  const { data } = await  supabase.auth.getUser();

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

  if (error) throw error;

  TodoList();
  return todoData as Todo;
};

export const deleteTodo = async (todoId: number, userId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('user_id', userId)
    .eq('id', todoId);

  if (error) {
    console.error('Error deleting todo:', error.message);
    return false;
  }

  TodoList();
  return true;
};

export const editTodoTitle = async (todoId: number, userId: string, todoTitle: string): Promise<boolean> => {
  const { error } = await supabase
    .from('todos')
    .update({ title: todoTitle })
    .eq('user_id', userId)
    .eq('id', todoId);

  if (error) {
    console.error('Error updating todo title:', error.message);
    return false;
  }

  TodoList();
  return true;
};

// Handle Todo event: edit, delete
export const handleEditTodo = async (btn: HTMLButtonElement, todoId: number, todoTitle: string) => {
  const { data } = await  supabase.auth.getUser();
  const userId = data.user?.id;
  const isDelete = btn.className.includes("delete-todo");
  const isEdit = btn.className.includes("edit-todo");

  if (!todoId || !userId) {
    console.error('Error, no user or no todo');
    return;
  }

  if (isDelete) {
    const confirmDelete = confirm(`Are you sure you want to remove this Todo?`);
    confirmDelete && await deleteTodo(todoId, userId);
  }

  if (isEdit) {
    const updatedTodoTitle = prompt('Rename todo: ', todoTitle);

    if (!updatedTodoTitle || updatedTodoTitle.trim() === '') return;
    editTodoTitle(todoId, userId, updatedTodoTitle.trim());
  }
}
