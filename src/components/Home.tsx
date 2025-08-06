import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, CheckCircle, BarChart3, Clock, CheckCircle2, Plus } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            TaskFlow
            <span className="block text-blue-600">Organize Your Life</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A powerful task management application with secure authentication. 
            Create, organize, and track your tasks with priority levels and completion tracking.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-colors shadow-lg"
              >
                Start Managing Tasks
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-blue-600 text-lg font-medium rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-colors shadow-lg"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Open Dashboard
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Plus className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Tasks</h3>
            <p className="text-gray-600">Easily create and organize tasks with priority levels and descriptions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your productivity with separate views for pending and completed tasks</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your tasks are private and secure with user authentication and data protection</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Priority Management</h3>
            <p className="text-gray-600">Organize tasks by priority levels with visual indicators and smart filtering</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Powered by Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-blue-600 font-semibold text-lg">React</div>
              <div className="text-gray-600 text-sm">Frontend Framework</div>
            </div>
            <div>
              <div className="text-green-600 font-semibold text-lg">Supabase</div>
              <div className="text-gray-600 text-sm">Database & Auth</div>
            </div>
            <div>
              <div className="text-purple-600 font-semibold text-lg">TypeScript</div>
              <div className="text-gray-600 text-sm">Type Safety</div>
            </div>
            <div>
              <div className="text-indigo-600 font-semibold text-lg">Tailwind CSS</div>
              <div className="text-gray-600 text-sm">Modern Styling</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;