import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import User from './pages/User';
import { useAuth } from './hooks/useAuth';
import AddUserPopup from './pages/popup/addUser';

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
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            userRole === 'admin'
              ? <Admin />
              : <Navigate to="/user" replace />
          }
        />
        <Route
          path="/user/dashboard"
          element={
            userRole === 'user'
              ? <User />
              : <Navigate to="/admin" replace />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Navigate
              to={userRole === 'admin'? '/admin/dashboard' : '/user/dashboard'}
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
      {/* <Admin/> */}
      {/* <AddUserPopup /> */}
      {/* <User/> */}
    </BrowserRouter>
  );
}

export default App;