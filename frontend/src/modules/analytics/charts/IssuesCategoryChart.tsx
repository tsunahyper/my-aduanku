import React from 'react'

/**
 * IssuesCategoryChart Component
 *
 * Displays a horizontal bar chart showing the distribution of issues across different categories.
 * Each category is represented by a colored bar with the count displayed.
 *
 * Props:
 * - categories: Object containing category names as keys and issue counts as values
 *   Example: { road: 45, water: 30, electricity: 25, safety: 20, other: 30 }
 */

interface CategoryData {
    name: string
    count: number
    color: string
    bgColor: string
}

interface IssuesCategoryChartProps {
    categories: {
        [key: string]: number
    }
}

const IssuesCategoryChart: React.FC<IssuesCategoryChartProps> = ({ categories }) => {
    // Calculate total issues for percentage calculation
    const totalIssues = Object.values(categories).reduce((sum, count) => sum + count, 0)

    // Define colors for each category
    const categoryColors: { [key: string]: { color: string; bgColor: string } } = {
        road: { color: 'bg-red-500', bgColor: 'bg-red-100' },
        water: { color: 'bg-cyan-500', bgColor: 'bg-cyan-100' },
        electricity: { color: 'bg-amber-500', bgColor: 'bg-amber-100' },
        safety: { color: 'bg-purple-500', bgColor: 'bg-purple-100' },
        other: { color: 'bg-gray-500', bgColor: 'bg-gray-100' }
    }

    // Transform categories object into array for easier mapping
    const categoryData: CategoryData[] = Object.entries(categories).map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        count,
        color: categoryColors[name]?.color || 'bg-gray-500',
        bgColor: categoryColors[name]?.bgColor || 'bg-gray-100'
    }))

    // Calculate percentage for each category
    const calculatePercentage = (count: number): number => {
        if (totalIssues === 0) return 0
        return Math.round((count / totalIssues) * 100)
    }

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Issues by Category</h3>

            {/* Chart Bars */}
            <div className="space-y-4">
                {categoryData.map((category) => {
                    const percentage = calculatePercentage(category.count)

                    return (
                        <div key={category.name} className="space-y-2">
                            {/* Category Name and Count */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {category.name}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {category.count}
                                </span>
                            </div>

                            {/* Bar */}
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

            {/* Legend / Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Issues</span>
                    <span className="text-lg font-bold text-gray-900">{totalIssues}</span>
                </div>
            </div>
        </div>
    )
}

export default IssuesCategoryChart
