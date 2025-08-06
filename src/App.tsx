import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TodoDashboard from './components/TodoDashboard';
import TodoPage from './components/TodoPage';
import CompletedPage from './components/CompletedPage';
import PrivateRoute from './components/PrivateRoute';

// Component to handle redirect logic
const AuthRedirect: React.FC = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <TodoDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/todos" 
                element={
                  <PrivateRoute>
                    <TodoPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/completed" 
                element={
                  <PrivateRoute>
                    <CompletedPage />
                  </PrivateRoute>
                } 
              />
              {/* Catch all route - redirect based on auth status */}
              <Route path="*" element={<AuthRedirect />} />
            </Routes>
          </div>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;