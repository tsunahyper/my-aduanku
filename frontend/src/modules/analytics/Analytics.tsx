import React, { useState, useEffect } from "react"
// Import all chart components
import IssuesKeyMetrics from "./charts/IssuesKeyMetrics"
import IssuesCategoryChart from "./charts/IssuesCategoryChart"
import UsersKeyMetrics from "./charts/UsersKeyMetrics"
import UsersActivityChart from "./charts/UsersActivityChart"
import { getIssuesByStatus, getTotalIssues, getTotalIssuesResolved } from "../../api/issues"
import { getActiveUsers, getTotalUsers, getUsersByRole } from "../../api/users"

const Analytics = () => {

  const [totalIssues, setTotalIssues] = useState<any>(null)
  const [issuesResolved, setIssuesResolved] = useState<any>(null)
  const [totalUsers, setTotalUsers] = useState<any>(null)
  const [activeUsers, setActiveUsers] = useState<any>(null)
  const [issuesByStatus, setIssuesByStatus] = useState<any>(null)
  const [usersByRole, setUsersByRole] = useState<any>(null)

  useEffect(() => {
    getTotalIssues().then((data: any) => {
      setTotalIssues(data)
    }).catch((error: any) => {
      console.error('Error fetching total issues:', error)
      setTotalIssues(null)
    })

    getTotalIssuesResolved().then((data: any) => {
      setIssuesResolved(data.data)
    }).catch((error: any) => {
      console.error('Error fetching total issues resolved:', error)
      setIssuesResolved(null)
    })

    getTotalUsers().then((data: any) => {
      setTotalUsers(data)
    }).catch((error: any) => {
      console.error('Error fetching total users:', error)
      setTotalUsers(0)
    })

    getIssuesByStatus().then((data: any) => {
      setIssuesByStatus(data.data)
    }).catch((error: any) => {
      console.error('Error fetching issues by status:', error)
      setIssuesByStatus(null)
    })

    getActiveUsers().then((data: any) => {
      setActiveUsers(data.data)
    }).catch((error: any) => {
      console.error('Error fetching active users:', error)
      setActiveUsers(null)
    })

    getUsersByRole().then((data: any) => {
      setUsersByRole(data.data)
    }).catch((error: any) => {
      console.error('Error fetching users by role:', error)
      setUsersByRole(null)
    })
  }, [])

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-60 flex items-center justify-center">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics & Statistics</h1>
            <p className="text-gray-600">View detailed analytics and statistics about your system.</p>
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-4 gap-6 px-4">
        <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm text-center">
          <div className="text-sm text-gray-500 mb-2">Total Issues</div>
          <div className="text-3xl font-bold text-gray-900">{totalIssues}</div>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm text-center">
          <div className="text-sm text-gray-500 mb-2">Completed</div>
          <div className="text-3xl font-bold text-green-600">{issuesResolved}</div>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm text-center">
          <div className="text-sm text-gray-500 mb-2">Total Users</div>
          <div className="text-3xl font-bold text-gray-900">{totalUsers}</div>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm text-center">
          <div className="text-sm text-gray-500 mb-2">Active Users</div>
          <div className="text-3xl font-bold text-blue-600">{activeUsers}</div>
        </div>
      </div>

      {/* Issues Overview */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Issues Overview</h2>

        {/* Issues Key Metrics and Category Chart */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Issues Key Metrics (Status breakdown) */}
          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Issue Status</h3>
            <IssuesKeyMetrics
              todoCount={issuesByStatus?.reported || 0}
              inProgressCount={issuesByStatus?.in_review || 0}
              doneCount={issuesByStatus?.assigned || 0}
            />
          </div>

          {/* Right: Issues by Category (Bar chart) */}
          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <IssuesCategoryChart categories={issuesByStatus || {}} />
          </div>
        </div>
      </div>

      {/* Users Overview */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Users Overview</h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Activity</h3>
            <UsersKeyMetrics
              totalUsers={totalUsers}
              activeUsers={activeUsers}
            />
          </div>

          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <UsersActivityChart activityData={usersByRole || {}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
