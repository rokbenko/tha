import React from 'react';
import { useTodos } from '../context/TodoContext';
import TodoList from './TodoList';
import { CheckCircle2, AlertCircle, Loader2, RotateCcw } from 'lucide-react';

const CompletedPage: React.FC = () => {
  const { todos, loading, error } = useTodos();

  const completedTodos = todos.filter(todo => todo.completed);

  if (loading && todos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your completed tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 mr-3 text-green-600" />
            Completed Tasks
          </h1>
          <p className="text-lg text-gray-600">
            {completedTodos.length} completed task{completedTodos.length !== 1 ? 's' : ''}
          </p>
          {completedTodos.length > 0 && (
            <p className="text-sm text-gray-500 mt-2 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 mr-1" />
              Click the rotate icon to move tasks back to To Do
            </p>
          )}
        </div>

        {/* Completion Stats */}
        {todos.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {Math.round((completedTodos.length / todos.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {completedTodos.length}
                </div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600 mb-1">
                  {todos.length - completedTodos.length}
                </div>
                <div className="text-sm text-gray-600">Tasks Remaining</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0}%` }}
                ></div>
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

        {/* Completed Tasks List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TodoList todos={todos} showCompleted={true} />
        </div>
      </div>
    </div>
  );
};

export default CompletedPage;