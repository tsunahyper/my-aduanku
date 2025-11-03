import React, { useState, useEffect } from 'react'
import { generateRandomPassword } from '../../../api/users'
import { ROLES } from '../../../constants/Constant'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { addUsers } from '../../../api/users'
import { toast } from 'react-toastify'

const AddUserForms = ({ onClose }: { onClose?: () => void }) => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [generatePassword, setGeneratedPassword] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (generatePassword) {
            generateRandomPassword()
                .then((response: { success: boolean, message: string, data: any }) => {
                    if (response.success) {
                        setPassword(response.data?.password || '')
                    }
                })
                .catch((error: any) => {
                    console.error('Error generating password:', error)
                })
        } else {
            setPassword('')
        }
    }, [generatePassword])

    const handleAddUser = () => {
        setIsLoading(true)
        const user = {
            name: name,
            username: username,
            email: email,
            password: password,
            role: role,
        }

        addUsers(user, role).then((response: { success: boolean, message: string, data: any }) => {
            if (response?.success) {
                toast.success(response.message)

                // Reset form
                setUsername('')
                setName('')
                setEmail('')
                setPassword('')
                setRole('')

                // Close popup
                onClose?.()
            } else {
                console.error('Error adding user:', response.message)
                toast.error(response.message)
            }
        }).catch((error: any) => {
            console.error('Error adding user:', error)
            toast.error('Failed to add user')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleCancel = () => {
        onClose?.()
    }

    return (
        <div>
            {isLoading && (
                <div className="flex flex-row items-center justify-center gap-2 mb-4">
                    <ArrowPathIcon className="w-4 h-4 text-indigo-600 animate-spin" />
                    <span className="text-sm font-medium text-gray-700">Loading...</span>
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" className="mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="username" className="mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" className="mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Would you like to opt for a manual password setup or generate a random one?
                </label>
                <div className='flex flex-col gap-2 m-4'>
                    <label className='flex flex-row gap-2 items-center cursor-pointer'>
                        <input
                            type="radio"
                            name="passwordOption"
                            value="yes"
                            checked={generatePassword === true}
                            onChange={() => setGeneratedPassword(true)}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className='text-sm font-medium text-gray-700'>Yes</span>
                    </label>
                    <label className='flex flex-row gap-2 items-center cursor-pointer'>
                        <input
                            type="radio"
                            name="passwordOption"
                            value="no"
                            checked={generatePassword === false}
                            onChange={() => setGeneratedPassword(false)}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className='text-sm font-medium text-gray-700'>No</span>
                    </label>
                </div>
            </div>
            {!generatePassword && (
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" className="mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(e) => setPassword(e.target.value)} />
                </div>
            )}
            <div className='flex flex-col gap-6'>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select id="role" className="mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select a role</option>
                        <option value={ROLES.admin.value}>{ROLES.admin.label}</option>
                        <option value={ROLES.user.value}>{ROLES.user.label}</option>
                        <option value={ROLES.superadmin.value}>{ROLES.superadmin.label}</option>
                    </select>
                </div>
                <div className='flex flex-row items-center justify-end gap-4'>
                    <button className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700' onClick={handleAddUser} disabled={isLoading}>Add User</button>
                    <button className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700' onClick={handleCancel} disabled={isLoading}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddUserForms
