import React from 'react'
import IssuesChart from './IssuesChart'

interface IssuesKeyMetricsProps {
    todoCount: number
    inProgressCount: number
    doneCount: number
}

const IssuesKeyMetrics: React.FC<IssuesKeyMetricsProps> = ({
    todoCount,
    inProgressCount,
    doneCount
}) => {
    return (
        <div className="w-full">
            {/* Status Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                {/* To Do Card */}
                <div className="bg-orange-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 text-lg font-bold flex items-center justify-center mb-3">
                        {todoCount}
                    </div>
                    <div className="text-orange-600 text-sm font-medium">
                        To do
                    </div>
                </div>

                {/* In Progress Card */}
                <div className="bg-teal-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 text-lg font-bold flex items-center justify-center mb-3">
                        {inProgressCount}
                    </div>
                    <div className="text-teal-600 text-sm font-medium">
                        In progress
                    </div>
                </div>

                {/* Done Card */}
                <div className="bg-blue-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 text-lg font-bold flex items-center justify-center mb-3">
                        {doneCount}
                    </div>
                    <div className="text-blue-600 text-sm font-medium">
                        Done
                    </div>
                </div>
            </div>

            {/* Three-layer Radial Chart */}
            <div className="mt-6">
                <IssuesChart
                    todoCount={todoCount}
                    inProgressCount={inProgressCount}
                    doneCount={doneCount}
                />
            </div>
        </div>
    )
}

export default IssuesKeyMetrics
