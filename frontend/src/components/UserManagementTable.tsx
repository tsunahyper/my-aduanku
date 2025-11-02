import React from 'react'

const UserManagementTable = ({ users }: { users: any[] }) => {

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
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.name}</td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.email}</td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.role}</td>
                                    <td className="text-center border-r border-gray-300 p-2 px-4">{user.isActive ? 'Active' : 'Inactive'}</td>
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
                                    <td className="text-center border-r border-gray-300 p-2 px-4 font-semibold" colSpan={5}>No users found</td>
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