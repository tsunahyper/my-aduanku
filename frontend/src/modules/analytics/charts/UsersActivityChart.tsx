import React from 'react'

interface ActivityCategory {
    name: string
    count: number
    color: string
    bgColor: string
}

interface UsersActivityChartProps {
    activityData: {
        [key: string]: number
    } | null | undefined
}

const UsersActivityChart: React.FC<UsersActivityChartProps> = ({ activityData }) => {
    if (!activityData || typeof activityData !== 'object') {
        return (
            <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Users by Role</h3>
                <div className="text-center text-gray-500 py-8">No data available</div>
            </div>
        )
    }

    // Calculate total users for percentage calculation
    const totalUsers = Object.values(activityData).reduce((sum, count) => sum + count, 0)

    const categoryColors: { [key: string]: { color: string; bgColor: string } } = {
        admin: { color: 'bg-indigo-500', bgColor: 'bg-indigo-100' },
        moderator: { color: 'bg-blue-500', bgColor: 'bg-blue-100' },
        citizen: { color: 'bg-green-500', bgColor: 'bg-green-100' },
        new_users: { color: 'bg-purple-500', bgColor: 'bg-purple-100' },
        returning_users: { color: 'bg-teal-500', bgColor: 'bg-teal-100' }
    }

    const activityCategories: ActivityCategory[] = Object.entries(activityData).map(([name, count]) => ({
        name: name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '), // Convert snake_case to Title Case
        count,
        color: categoryColors[name]?.color || 'bg-gray-500',
        bgColor: categoryColors[name]?.bgColor || 'bg-gray-100'
    }))

    // Calculate percentage for each category
    const calculatePercentage = (count: number): number => {
        if (totalUsers === 0) return 0
        return Math.round((count / totalUsers) * 100)
    }

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Users by Role</h3>

            <div className="space-y-4">
                {activityCategories.map((category) => {
                    const percentage = calculatePercentage(category.count)

                    return (
                        <div key={category.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {category.name}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {category.count}
                                </span>
                            </div>

                            <div className={`w-full h-8 ${category.bgColor} rounded-lg overflow-hidden`}>
                                <div
                                    className={`h-full ${category.color} flex items-center justify-end px-3 transition-all duration-500 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                >
                                    {percentage > 15 && (
                                        <span className="text-xs font-medium text-white">
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Users</span>
                    <span className="text-lg font-bold text-gray-900">{totalUsers}</span>
                </div>
            </div>
        </div>
    )
}

export default UsersActivityChart
