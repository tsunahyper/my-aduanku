import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../api/users'
import { toast } from 'react-toastify'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import EditUserPopup from '../popups/EditUser'
import DeleteUserPopup from '../popups/DeleteUser'
import { getUserRole } from '../../../api/auth'

const UserManagementTable = () => {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [pagination, setPagination] = useState<any>(null)
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const currentUserRole = getUserRole()

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await getUsers({ page: 1, limit: 10 })
            if (response.success && response.data) {
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

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleEdit = (user: any) => {
        setSelectedUser(user)
        setIsEditPopupOpen(true)
    }

    const handleDelete = (user: any) => {
        setSelectedUser(user)
        setIsDeletePopupOpen(true)
    }

    const handleSuccess = () => {
        fetchUsers()
    }
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
                                            <button 
                                                onClick={() => handleEdit(user)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            {currentUserRole === 'superadmin' && (
                                                <button 
                                                    onClick={() => handleDelete(user)}
                                                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 cursor-pointer"
                                                >
                                                    Delete
                                                </button>
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
                                        {loading ? 'Loading...' : 'No users found'}
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>

            {/* Edit User Popup */}
            {isEditPopupOpen && selectedUser && (
                <EditUserPopup 
                    user={selectedUser}
                    onClose={() => setIsEditPopupOpen(false)}
                    onSuccess={handleSuccess}
                />
            )}

            {/* Delete User Popup */}
            {isDeletePopupOpen && selectedUser && (
                <DeleteUserPopup 
                    user={selectedUser}
                    onClose={() => setIsDeletePopupOpen(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    )
}

export default UserManagementTable