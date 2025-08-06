export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  priority: Priority;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  priority?: Priority;
  completed?: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  createTodo: (data: CreateTodoData) => Promise<void>;
  updateTodo: (id: string, data: UpdateTodoData) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}