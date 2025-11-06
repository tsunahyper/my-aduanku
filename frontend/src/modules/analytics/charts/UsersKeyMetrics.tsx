import React from 'react'

/**
 * UsersKeyMetrics Component
 *
 * Displays key user statistics including total users, active users, and activity percentage.
 * Uses a circular progress indicator to show the active users ratio.
 *
 * Props:
 * - totalUsers: Total number of registered users
 * - activeUsers: Number of currently active users
 */

interface UsersKeyMetricsProps {
    totalUsers: number
    activeUsers: number
}

const UsersKeyMetrics: React.FC<UsersKeyMetricsProps> = ({
    totalUsers,
    activeUsers
}) => {
    // Calculate percentage of active users
    const activePercentage = totalUsers > 0
        ? Math.round((activeUsers / totalUsers) * 100)
        : 0

    // Calculate inactive users
    const inactiveUsers = totalUsers - activeUsers

    // Circle calculations for the circular progress
    const radius = 70
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (activePercentage / 100) * circumference

    return (
        <div className="w-full">
            {/* Circular Progress Chart */}
            <div className="flex flex-col items-center gap-6 mb-8">
                {/* SVG Circle */}
                <div className="relative">
                    <svg width="180" height="180" className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="90"
                            cy="90"
                            r={radius}
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="90"
                            cy="90"
                            r={radius}
                            stroke="#3b82f6"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <div className="text-3xl font-bold text-gray-900">
                            {activeUsers}/{totalUsers}
                        </div>
                        <div className="text-sm text-gray-500">{activePercentage}%</div>
                    </div>
                </div>

                {/* Label */}
                <div className="text-center">
                    <div className="text-base font-semibold text-gray-700">Active Users</div>
                </div>
            </div>

            {/* User Status Cards */}
            <div className="grid grid-cols-2 gap-4">
                {/* Active Users Card */}
                <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                        {activeUsers}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                        Active
                    </div>
                </div>

                {/* Inactive Users Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-600 mb-1">
                        {inactiveUsers}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                        Inactive
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersKeyMetrics
