import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { getIssues } from '../../../api/issues'
import { getUserRole } from '../../../api/auth'

const IssueManagementTable = () => {
    const [issues, setIssues] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [pagination, setPagination] = useState<any>(null)
    const userRole = getUserRole()
    const isAdmin = userRole === 'admin' || userRole === 'superadmin'

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                setLoading(true)
                const response = await getIssues({ page: 1, limit: 10 })
                if (response.success && response.data) {
                    setIssues(response.data.issues || [])
                    setPagination(response.data.pagination || null)
                } else {
                    toast.error(response.message || 'Failed to fetch issues')
                    setIssues([])
                }
            } catch (error: any) {
                console.error('Error fetching issues:', error)
                toast.error(error.message || 'Failed to fetch issues, please try again later')
                setIssues([])
            } finally {
                setLoading(false)
            }
        }
        fetchIssues()
    }, [])
    return (
        <div>
            <div className="flex flex-col gap-4 items-center justify-center">
                <div className="text-2xl font-bold ">
                    Issue Management Table
                </div>

                <div className="border border-gray-300 rounded-lg p-4">
                    <table className="border border-gray-300 w-full ">
                        <thead className="bg-gray-200 ">
                            <tr>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Issue</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Category</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Priority</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Status</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Assigned To</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        {issues.length > 0 ? (
                            <tbody>
                                {issues.map((issue) => (
                                    <tr key={issue._id}>
                                        <td className="text-center border-r border-gray-300 p-2 px-4">{issue.title || 'N/A'}</td>
                                        <td className="text-center border-r border-gray-300 p-2 px-4">{issue.category || 'N/A'}</td>
                                        <td className="text-center border-r border-gray-300 p-2 px-4">{issue.priority || 'N/A'}</td>
                                        <td className="text-center border-r border-gray-300 p-2 px-4">{issue.status || 'N/A'}</td>
                                        <td className="text-center border-r border-gray-300 p-2 px-4">
                                            {issue.isActive ? (
                                                <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />
                                            )}
                                        </td>
                                        <td className="text-center border-r border-gray-300 p-2 px-4">
                                            <div className="flex flex-row gap-2 justify-center">
                                                <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 cursor-pointer">View</button>
                                                {isAdmin && (
                                                    <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 cursor-pointer">Assign To</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td className="text-center border-r border-gray-300 p-2 px-4 font-semibold" colSpan={6}>
                                        {loading ? 'Loading...' : 'No issues found'}
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default IssueManagementTable