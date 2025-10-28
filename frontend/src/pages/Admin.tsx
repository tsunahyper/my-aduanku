import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import AdminDashboard from './AdminDashboard'
import IssueManagementContent from './IssueManagement'
import AnalyticsContent from './Analytics'
import UserManagement from './UserManagement'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <AdminDashboard />
      case 'Issue Management':
        return <IssueManagementContent />
      case 'Analytics & Statistics':
        return <AnalyticsContent />
      case 'User Management':
        return <UserManagement />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={true} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Admin