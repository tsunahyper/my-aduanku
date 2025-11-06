import React from 'react'

/**
 * IssuesChart Component
 *
 * A three-layer radial/donut chart showing issue status distribution
 * - Outer ring: Done (Blue)
 * - Middle ring: In progress (Teal)
 * - Inner ring: To do (Orange)
 *
 * Props:
 * - todoCount: Number of issues in "To do" status
 * - inProgressCount: Number of issues in "In progress" status
 * - doneCount: Number of issues in "Done" status
 */

interface IssuesChartProps {
    todoCount: number
    inProgressCount: number
    doneCount: number
}

const IssuesChart: React.FC<IssuesChartProps> = ({
    todoCount,
    inProgressCount,
    doneCount
}) => {
    // Calculate percentages
    const total = todoCount + inProgressCount + doneCount
    const todoPercentage = total > 0 ? (todoCount / total) * 100 : 0
    const inProgressPercentage = total > 0 ? (inProgressCount / total) * 100 : 0
    const donePercentage = total > 0 ? (doneCount / total) * 100 : 0

    // Circle or Ring sizes
    const centerX = 150  // Center of the circle
    const centerY = 150
    const outerRadius = 120    // Outer ring (Done)
    const middleRadius = 90    // Middle ring (In progress)
    const innerRadius = 60     // Inner ring (To do)
    const strokeWidth = 18     // How thick each ring is

    // How long each ring's circumference is (This is just: 2 × π × radius)
    const outerCircumference = 2 * Math.PI * outerRadius
    const middleCircumference = 2 * Math.PI * middleRadius
    const innerCircumference = 2 * Math.PI * innerRadius

    // Full circumference - percentage filled = remaining part
    const outerDashoffset = outerCircumference - (donePercentage / 100) * outerCircumference
    const middleDashoffset = middleCircumference - (inProgressPercentage / 100) * middleCircumference
    const innerDashoffset = innerCircumference - (todoPercentage / 100) * innerCircumference

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative">
                <svg width="300" height="300" className="transform -rotate-90">
                    {/* Background circles*/}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={outerRadius}
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={middleRadius}
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={innerRadius}
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />

                    {/* Outer ring - Done */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={outerRadius}
                        stroke="#3b82f6"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={outerCircumference}
                        strokeDashoffset={outerDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />

                    {/* Middle ring - In progress */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={middleRadius}
                        stroke="#14b8a6"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={middleCircumference}
                        strokeDashoffset={middleDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />

                    {/* Inner ring - ToDo */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={innerRadius}
                        stroke="#f97316"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={innerCircumference}
                        strokeDashoffset={innerDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                {/* Total count */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-gray-900">{total}</div>
                    <div className="text-xs text-gray-500">Total Issues</div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Done</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm text-gray-600">In progress</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-600">To do</span>
                </div>
            </div>
        </div>
    )
}

export default IssuesChart