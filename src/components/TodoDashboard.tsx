import React from 'react';
import { useTodos } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';
import TodoList from './TodoList';
import CreateTodoForm from './CreateTodoForm';
import { CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';

const TodoDashboard: React.FC = () => {
  const { todos, loading, error } = useTodos();
  const { user } = useAuth();

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const priorityStats = {
    high: todos.filter(todo => !todo.completed && todo.priority === 'high').length,
    medium: todos.filter(todo => !todo.completed && todo.priority === 'medium').length,
    low: todos.filter(todo => !todo.completed && todo.priority === 'low').length,
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
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back, {user?.email}! Manage your tasks efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingTodos.length}</p>
                <p className="text-sm text-gray-600">Pending Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedTodos.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{priorityStats.high}</p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <div className="w-6 h-6 text-purple-600 font-bold flex items-center justify-center">
                  {todos.length}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{todos.length}</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center space-x-2 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Todo Form */}
          <div className="lg:col-span-1">
            <CreateTodoForm />
          </div>

          {/* Todo Lists */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Tasks */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-blue-600" />
                  To Do ({pendingTodos.length})
                </h2>
                {priorityStats.high > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {priorityStats.high} high priority
                  </span>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <TodoList todos={todos} showCompleted={false} />
              </div>
            </div>

            {/* Completed Tasks */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2 text-green-600" />
                Completed ({completedTodos.length})
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <TodoList todos={todos} showCompleted={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;