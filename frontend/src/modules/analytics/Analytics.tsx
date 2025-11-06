import React from "react"
// Import all chart components
import IssuesKeyMetrics from "./charts/IssuesKeyMetrics"
import IssuesCategoryChart from "./charts/IssuesCategoryChart"
import UsersKeyMetrics from "./charts/UsersKeyMetrics"
import UsersActivityChart from "./charts/UsersActivityChart"

const Analytics = () => {
  /**
   * Mock data - Replace with actual API calls when backend is available
   * API endpoint: GET /api/v1/analytics/summary
   *
   * This data structure represents the analytics information that will be
   * fetched from the backend and displayed in the dashboard.
   */
  const analyticsData = {
    // Issues data
    totalIssues: 150,
    issuesByStatus: {
      todo: 12,        // Issues in "To do" status
      inProgress: 23,  // Issues in "In progress" status
      done: 64         // Issues in "Done" status
    },
    issuesByCategory: {
      road: 45,
      water: 30,
      electricity: 25,
      safety: 20,
      other: 30
    },

    // Users data
    totalUsers: 45,
    activeUsers: 32,
    usersByRole: {
      admin: 5,
      moderator: 10,
      citizen: 30
    }
  }

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
          <div className="text-3xl font-bold text-gray-900">{analyticsData.totalIssues}</div>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm text-center">
          <div className="text-sm text-gray-500 mb-2">Completed</div>
          <div className="text-3xl font-bold text-green-600">{analyticsData.issuesByStatus.done}</div>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm text-center">
          <div className="text-sm text-gray-500 mb-2">Total Users</div>
          <div className="text-3xl font-bold text-gray-900">{analyticsData.totalUsers}</div>
        </div>
        <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm text-center">
          <div className="text-sm text-gray-500 mb-2">Active Users</div>
          <div className="text-3xl font-bold text-blue-600">{analyticsData.activeUsers}</div>
        </div>
      </div>

      {/* ============================================ */}
      {/* ISSUES SECTION */}
      {/* ============================================ */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Issues Overview</h2>

        {/* Issues Key Metrics and Category Chart */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Issues Key Metrics (Status breakdown) */}
          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Issue Status</h3>
            <IssuesKeyMetrics
              todoCount={analyticsData.issuesByStatus.todo}
              inProgressCount={analyticsData.issuesByStatus.inProgress}
              doneCount={analyticsData.issuesByStatus.done}
            />
          </div>

          {/* Right: Issues by Category (Bar chart) */}
          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <IssuesCategoryChart categories={analyticsData.issuesByCategory} />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* USERS SECTION */}
      {/* ============================================ */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Users Overview</h2>

        {/* Users Key Metrics and Activity Chart */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Users Key Metrics (Active/Inactive breakdown) */}
          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Activity</h3>
            <UsersKeyMetrics
              totalUsers={analyticsData.totalUsers}
              activeUsers={analyticsData.activeUsers}
            />
          </div>

          {/* Right: Users by Role (Bar chart) */}
          <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm">
            <UsersActivityChart activityData={analyticsData.usersByRole} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
