import React from 'react';
import { useTodos } from '../context/TodoContext';
import TodoList from './TodoList';
import { Clock, AlertCircle, Loader2 } from 'lucide-react';

const TodoPage: React.FC = () => {
  const { todos, loading, error } = useTodos();

  const pendingTodos = todos.filter(todo => !todo.completed);
  const priorityStats = {
    high: pendingTodos.filter(todo => todo.priority === 'high').length,
    medium: pendingTodos.filter(todo => todo.priority === 'medium').length,
    low: pendingTodos.filter(todo => todo.priority === 'low').length,
  };

  if (loading && todos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <Clock className="w-8 h-8 mr-3 text-blue-600" />
            To Do Tasks
          </h1>
          <p className="text-lg text-gray-600">
            {pendingTodos.length} pending task{pendingTodos.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Priority Summary */}
        {pendingTodos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-400">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <div>
                  <p className="text-lg font-bold text-gray-900">{priorityStats.high}</p>
                  <p className="text-sm text-gray-600">High Priority</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-400">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-yellow-500 rounded-full mr-2"></div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{priorityStats.medium}</p>
                  <p className="text-sm text-gray-600">Medium Priority</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-400">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-green-500 rounded-full mr-2"></div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{priorityStats.low}</p>
                  <p className="text-sm text-gray-600">Low Priority</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center space-x-2 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Todo List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TodoList todos={todos} showCompleted={false} />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;