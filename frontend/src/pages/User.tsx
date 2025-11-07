import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Dashboard } from '../modules/dashboard'
import { IssueManagement } from '../modules/issues'
import { Analytics } from '../modules/analytics'
import Profile from './Profile'

const User = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Navbar isAdmin={false} />
      <div className="w-full py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issue-management" element={<IssueManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default User
