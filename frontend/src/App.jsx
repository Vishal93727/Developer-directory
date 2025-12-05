import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Directory from './pages/Directory';
import DeveloperProfile from './pages/DeveloperProfile';
import DeveloperForm from './components/DeveloperForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route 
            path="/directory" 
            element={
              <ProtectedRoute>
                <Directory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/developer/:id" 
            element={
              <ProtectedRoute>
                <DeveloperProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-developer" 
            element={
              <ProtectedRoute>
                <DeveloperForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-developer/:id" 
            element={
              <ProtectedRoute>
                <DeveloperForm />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect root to directory */}
          <Route path="/" element={<Navigate to="/directory" replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/directory" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;