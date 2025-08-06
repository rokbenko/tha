import React, { useState } from 'react';
import { Todo, Priority } from '../types/todo';
import { useTodos } from '../context/TodoContext';
import { 
  Check, 
  X, 
  Edit2, 
  Trash2, 
  AlertCircle, 
  Circle, 
  CheckCircle2,
  RotateCcw,
  Save,
  XCircle
} from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

const priorityConfig = {
  low: { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200', label: 'Low' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200', label: 'Medium' },
  high: { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', label: 'High' },
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateTodo, deleteTodo, toggleTodo } = useTodos();

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    setIsUpdating(true);
    try {
      await updateTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(todo.id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const priorityStyle = priorityConfig[todo.priority];

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task description (optional)"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <XCircle className="w-4 h-4 mr-1 inline" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isUpdating || !editTitle.trim()}
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 mr-1 inline border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1 inline" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 ${priorityStyle.border} p-4 transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={handleToggle}
            className="mt-1 flex-shrink-0 transition-colors"
          >
            {todo.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 hover:text-green-700" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.color}`}>
                {todo.priority === 'high' && <AlertCircle className="w-3 h-3 mr-1" />}
                {priorityStyle.label}
              </span>
            </div>
            
            {todo.description && (
              <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'} mt-1`}>
                {todo.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>Created {new Date(todo.created_at).toLocaleDateString()}</span>
              {todo.updated_at !== todo.created_at && (
                <span>Updated {new Date(todo.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {todo.completed && (
            <button
              onClick={handleToggle}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Move back to To Do"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;