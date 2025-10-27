import React from 'react'
import Navbar from '../components/Navbar'

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={false} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">User Dashboard</h1>
              <p className="text-gray-600">Welcome to your dashboard. You can view your tickets, create new issues, and track their status here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard