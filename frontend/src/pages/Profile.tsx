import React, { useState, useEffect } from 'react'
import { getCurrentUser, updateProfile } from '../api/users'
import { toast } from 'react-toastify'
import { UserCircleIcon } from '@heroicons/react/24/solid'

const Profile = () => {
    const [user, setUser] = useState<any>(null)
    const [originalUser, setOriginalUser] = useState<any>(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleEdit = () => {
        setOriginalUser({ ...user })
        setIsEdit(true)
    }

    const handleCancel = () => {
        setUser({ ...originalUser })
        setIsEdit(false)
    }

    const handleSave = async () => {
        setIsLoading(true)
        try {
            const response = await updateProfile({
                name: user?.name,
                username: user?.username,
                email: user?.email,
            })

            if (response.success) {
                setUser(response.data)
                setOriginalUser({ ...response.data })
                setIsEdit(false)
                toast.success('Profile updated successfully')
            } else {
                toast.error(response.message || 'Failed to update profile')
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to update profile')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCurrentUser().then(response => {
            if (response.success) {
                setUser(response.data.user)
                setOriginalUser(response.data.user)
            }
        }).catch(error => {
            toast.error(error.message)
        })
    }, [])

    function currentDate() {
        const date = new Date()
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Profile Header */}
            <div className='flex flex-col gap-2 px-4 mx-5'>
                <h1 className='text-2xl font-bold'>Welcome, {user?.name}</h1>
                <p className='text-sm text-gray-500'>{currentDate()}</p>
            </div>

            {/* Profile Information */}
            <div className='flex flex-col h-full w-full'>
                <div className='border border-gray-400 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg rounded-b-none p-4 m-5 mb-0 border-b-0 h-20' />
                <div className='border border-gray-400 border-t-0 rounded-lg p-4 m-5 shadow-lg flex flex-col mt-0 rounded-t-none h-120 gap-8'>
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-row gap-2 w-full justify-between pt-6'>
                            <div className='flex flex-row gap-3 items-center pl-10'>
                                <UserCircleIcon className='w-12 h-12 text-gray-500' />
                                <div className='flex flex-col'>
                                    <p className='text-lg font-bold'>{user?.name}</p>
                                    <p className='text-sm text-gray-500'>{user?.email}</p>
                                </div>
                            </div>
                            <div className='pr-10 flex gap-2'>
                                {isEdit ? (
                                    <>
                                        <button 
                                            className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer disabled:opacity-50' 
                                            onClick={handleSave}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button 
                                            className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer' 
                                            onClick={handleCancel}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer' 
                                        onClick={handleEdit}
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 px-6 pb-6'>
                        <div className='flex flex-row gap-6'>
                            <div className='flex-1'>
                                <p className='text-sm font-semibold text-gray-700 mb-2'>Full Name</p>
                                {isEdit ? (
                                    <input 
                                        type="text" 
                                        className='w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                        value={user?.name || ''} 
                                        onChange={(e) => setUser({ ...user, name: e.target.value })} 
                                    />
                                ) : (
                                    <div className='border border-gray-300 rounded-lg p-3 bg-gray-200'>
                                        <p className='text-sm text-gray-500 font-semibold'>{user?.name || 'N/A'}</p>
                                    </div>
                                )}
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-semibold text-gray-700 mb-2'>Username</p>
                                {isEdit ? (
                                    <input 
                                        type="text" 
                                        className='w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                        value={user?.username || ''} 
                                        onChange={(e) => setUser({ ...user, username: e.target.value })} 
                                    />
                                ) : (
                                    <div className='border border-gray-300 rounded-lg p-3 bg-gray-200'>
                                        <p className='text-sm text-gray-500 font-semibold'>{user?.username || 'N/A'}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-row gap-6'>
                            <div className='flex-1'>
                                <p className='text-sm font-semibold text-gray-700 mb-2'>Email</p>
                                {isEdit ? (
                                    <input 
                                        type="email" 
                                        className='w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                        value={user?.email || ''} 
                                        onChange={(e) => setUser({ ...user, email: e.target.value })} 
                                    />
                                ) : (
                                    <div className='border border-gray-300 rounded-lg p-3 bg-gray-200'>
                                        <p className='text-sm text-gray-500 font-semibold'>{user?.email || 'N/A'}</p>
                                    </div>
                                )}
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-semibold text-gray-700 mb-2'>Role</p>
                                <div className='border border-gray-300 rounded-lg p-3 bg-gray-200'>
                                    <p className='text-sm text-gray-500 font-semibold'>
                                        {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile