import React from 'react'
import Navbar from '../components/Navbar'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={true} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome to the admin panel. You can manage users, issues, and system settings from here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard