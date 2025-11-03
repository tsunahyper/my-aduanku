import { useState } from 'react'
import Navbar from '../components/Navbar'
import { UserDashboard } from '../modules/dashboard'
import { IssueManagement } from '../modules/issues'
import { Analytics } from '../modules/analytics'

const User = () => {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <UserDashboard />
      case 'Issue Management':
        return <IssueManagement />
      case 'Analytics & Statistics':
        return <Analytics />
      default:
        return <UserDashboard />
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
