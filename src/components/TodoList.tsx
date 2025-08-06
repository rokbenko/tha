import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import { CheckCircle2, Clock } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  showCompleted: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, showCompleted }) => {
  const filteredTodos = todos.filter(todo => todo.completed === showCompleted);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
          {showCompleted ? (
            <CheckCircle2 className="w-8 h-8 text-gray-400" />
          ) : (
            <Clock className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {showCompleted ? 'No completed tasks yet' : 'No pending tasks'}
        </h3>
        <p className="text-gray-500">
          {showCompleted 
            ? 'Complete some tasks to see them here'
            : 'Create your first task to get started'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;