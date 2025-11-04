import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Admin from './pages/Admin';
import User from './pages/User';
import { useAuth } from './hooks/useAuth';

function AppContent() {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<Login />} />
        <Route path="/login/user" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Routes>
        <Route
          path="/admin/*"
          element={
            userRole === 'admin' || userRole === 'superadmin'
              ? <Admin />
              : <Navigate to="/user/dashboard" replace />
          }
        />
        <Route
          path="/user/*"
          element={
            userRole === 'user'
              ? <User />
              : <Navigate to="/admin/dashboard" replace />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Navigate
              to={userRole === 'admin' || userRole === 'superadmin' ? '/admin/dashboard' : '/user/dashboard'}
              replace
            />
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={userRole === 'admin' || userRole === 'superadmin' ? '/admin/dashboard' : '/user/dashboard'}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;