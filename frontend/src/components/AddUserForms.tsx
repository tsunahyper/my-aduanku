import React, { useState, useEffect } from 'react'
import { generatePasswordApi } from '../api/users'

interface AddUserFormsProps {
    setUsername: (username: string) => void,
    setName: (name: string) => void,
    setEmail: (email: string) => void,
    setPassword: (password: string) => void,
    setRole: (role: string) => void,
}

const AddUserForms = ({ setUsername, setName, setEmail, setPassword, setRole }: AddUserFormsProps) => {
    const [generatePassword, setGeneratedPassword] = useState<boolean>(true)
    
    useEffect(() => {
        if (generatePassword) {
            generatePasswordApi()
                .then(response => {
                    if (response.success) {
                        setPassword(response.data?.password || '')
                    }
                })
                .catch(error => {
                    console.error('Error generating password:', error)
                })
        } else {
            setPassword('')
        }
    }, [generatePassword, setPassword])

    return (
        <div>
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
            <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <input type="text" id="role" className="mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(e) => setRole(e.target.value)} />
            </div>
        </div>
    )
}

export default AddUserForms