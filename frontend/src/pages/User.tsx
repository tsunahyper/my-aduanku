import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { UserDashboard } from '../modules/dashboard'
import { IssueManagement } from '../modules/issues'
import { Analytics } from '../modules/analytics'

const User = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Navbar isAdmin={false} />
      <div className="w-full py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/issue-management" element={<IssueManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default User
