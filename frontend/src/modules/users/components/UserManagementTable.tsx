import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../api/users'
import { toast } from 'react-toastify'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'


// Sample
// {
//   "success": true,
//   "data": {
//       "users": [
//           {
//               "address": {
//                   "country": "Malaysia"
//               },
//               "_id": "6908ce2ab8c654000521c88d",
//               "username": "john.doe",
//               "name": "John Doe",
//               "email": "john.doe@example.com",
//               "role": "user",
//               "isActive": true,
//               "categoriesHandled": [],
//               "createdAt": "2025-11-03T15:45:46.662Z",
//               "updatedAt": "2025-11-03T15:45:46.662Z",
//               "__v": 0
//           },
//           {
//               "address": {
//                   "country": "Malaysia"
//               },
//               "_id": "68ff77060f5443a540fb46ce",
//               "username": "superadmin",
//               "name": "Super Admin",
//               "email": "superadmin@example.com",
//               "role": "superadmin",
//               "isActive": true,
//               "categoriesHandled": [],
//               "createdAt": "2025-10-27T13:43:34.727Z",
//               "updatedAt": "2025-10-27T13:43:34.727Z",
//               "__v": 0
//           },
//           {
//               "address": {
//                   "country": "Malaysia"
//               },
//               "_id": "68ff77020f5443a540fb46cb",
//               "username": "haziq",
//               "name": "Haziq",
//               "email": "haziq.azli@example.com",
//               "role": "user",
//               "isActive": true,
//               "categoriesHandled": [],
//               "createdAt": "2025-10-27T13:43:30.889Z",
//               "updatedAt": "2025-10-27T13:43:30.889Z",
//               "__v": 0
//           },
//           {
//               "address": {
//                   "country": "Malaysia"
//               },
//               "_id": "68ff76fc0f5443a540fb46c8",
//               "username": "admin",
//               "name": "Admin User",
//               "email": "admin@example.com",
//               "role": "admin",
//               "isActive": true,
//               "categoriesHandled": [],
//               "createdAt": "2025-10-27T13:43:24.912Z",
//               "updatedAt": "2025-10-27T13:43:24.912Z",
//               "__v": 0
//           },
//           {
//               "address": {
//                   "country": "Malaysia"
//               },
//               "_id": "68ff73ea53ab0645be94cff8",
//               "username": "testuser",
//               "name": "Test User",
//               "email": "testuser@example.com",
//               "role": "user",
//               "isActive": true,
//               "categoriesHandled": [],
//               "createdAt": "2025-10-27T13:30:18.199Z",
//               "updatedAt": "2025-10-27T13:30:18.199Z",
//               "__v": 0
//           }
//       ],
//       "pagination": {
//           "currentPage": 1,
//           "totalPages": 1,
//           "totalItems": 5,
//           "itemsPerPage": 10
//       }
//   }
// }

const UserManagementTable = () => {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [pagination, setPagination] = useState<any>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const response = await getUsers(1, 10)
                if (response.success && response.data) {
                    // Backend response structure: { success: true, data: { users: [...], pagination: {...} } }
                    setUsers(response.data.users || [])
                    setPagination(response.data.pagination || null)
                } else {
                    toast.error(response.message || 'Failed to fetch users')
                    setUsers([])
                }
            } catch (error: any) {
                console.error('Error fetching users:', error)
                toast.error(error.message || 'Failed to fetch users, please try again later')
                setUsers([])
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])
    return (
        <div>
            <div className="flex flex-col gap-4 items-center justify-center">
                <div className="text-2xl font-bold ">
                    User Management Table
                </div>

                <div className="border border-gray-300 rounded-lg p-4">
                    <table className="border border-gray-300 w-full ">
                        <thead className="bg-gray-200 ">
                            <tr>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Name</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Username</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Email</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Role</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Status</th>
                                <th className="text-center border-r border-gray-300 p-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        {users.length > 0 ? (
                            <tbody>
                                {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.name || 'N/A'}</td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.username || 'N/A'}</td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.email || 'N/A'}</td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.role || 'N/A'}</td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">
                                        {user.isActive ? (
                                            <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                                        ) : (
                                            <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />
                                        )}
                                    </td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">
                                        <div className="flex flex-row gap-2 justify-center">
                                            <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 cursor-pointer">Edit</button>
                                            <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 cursor-pointer">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td className="text-center border-r border-gray-300 p-2 px-4 font-semibold" colSpan={6}>
                                        {loading ? 'Loading...' : 'No users found'}
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

export default UserManagementTable