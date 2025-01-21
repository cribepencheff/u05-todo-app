import { supabase } from '../services/supabaseClient';
import { ShowTodoList } from '../components/ShowTodoList';
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

  ShowTodoList();
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

  ShowTodoList();
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

  ShowTodoList();
  return true;
};

// Handle Todo event: edit, delete
export const handleRenameTodo = async (btn: HTMLButtonElement, todoId: number, todoTitle: string) => {
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

export const handleTodoCompletion = async (todoId: number, completed: boolean): Promise<boolean> => {
  const { data } = await  supabase.auth.getUser();

  const { error } = await supabase
    .from('todos')
    .update({ completed: completed })
    .eq('user_id', data.user?.id)
    .eq('id', todoId);

  if (error) {
    console.error('Error updating todo:', error.message);
    return false;
  }

  ShowTodoList();
  return true;
}

// Clear todo list
export const handleClearList = async () => {
  const confirmClear = confirm(`This will permanently delete all todos. Are you sure you want to continue?`);

  if (confirmClear) {
    const { data } = await  supabase.auth.getUser();

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('user_id', data.user?.id);

    if (error) {
      console.error('Error deleting todos:', error);
      return
    }

    ShowTodoList();
  }
}
