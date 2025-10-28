import { useState } from 'react'
import Navbar from '../components/Navbar'

// Content components for each tab
const DashboardContent = () => (
  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">User Dashboard</h1>
      <p className="text-gray-600">Welcome to your dashboard. View your overview here.</p>
    </div>
  </div>
)

const IssueManagementContent = () => (
  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Issues</h1>
      <p className="text-gray-600">View and manage your submitted issues here.</p>
    </div>
  </div>
)

const AnalyticsContent = () => (
  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Statistics</h1>
      <p className="text-gray-600">View your personal statistics and activity.</p>
    </div>
  </div>
)

const FeaturesContent = () => (
  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Features</h1>
      <p className="text-gray-600">Explore available features and tools.</p>
    </div>
  </div>
)

const User = () => {
  const [activeTab, setActiveTab] = useState('Dashboard')

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardContent />
      case 'Issue Management':
        return <IssueManagementContent />
      case 'Analytics & Statistics':
        return <AnalyticsContent />
      case 'Features':
        return <FeaturesContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={false} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default User