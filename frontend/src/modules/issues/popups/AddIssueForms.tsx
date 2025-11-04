import React, { useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { createIssue } from '../../../api/issues'
import { toast } from 'react-toastify'

const AddIssueForms = ({ onClose }: { onClose?: () => void }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [tags, setTags] = useState('') // Comma-separated string
    const [priority, setPriority] = useState('medium')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleAddIssue = () => {
        // Validate required fields
        if (!title || !description || !category || !longitude || !latitude) {
            toast.error('Please fill in all required fields')
            return
        }

        // Validate coordinates
        const lng = parseFloat(longitude)
        const lat = parseFloat(latitude)
        if (isNaN(lng) || isNaN(lat) || lng < -180 || lng > 180 || lat < -90 || lat > 90) {
            toast.error('Please enter valid coordinates (longitude: -180 to 180, latitude: -90 to 90)')
            return
        }

        setIsLoading(true)

        // Build location object
        const location: any = {
            type: 'Point',
            coordinates: [lng, lat],
        }

        // Add address if provided
        if (street || city || state || postalCode) {
            location.address = {
                street: street || undefined,
                city: city || undefined,
                state: state || undefined,
                postalCode: postalCode || undefined,
                country: 'Malaysia',
            }
        }

        // Build issue object
        const issue = {
            title,
            description,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
            priority,
            location,
            isPublic,
            isAnonymous,
        }

        createIssue(issue).then((response: { success: boolean, message: string, data: any }) => {
            if (response?.success) {
                toast.success(response.message || 'Issue created successfully')

                // Reset form
                setTitle('')
                setDescription('')
                setCategory('')
                setTags('')
                setPriority('medium')
                setLongitude('')
                setLatitude('')
                setStreet('')
                setCity('')
                setState('')
                setPostalCode('')
                setIsPublic(true)
                setIsAnonymous(false)

                // Close popup
                onClose?.()
            } else {
                console.error('Error creating issue:', response.message)
                toast.error(response.message || 'Failed to create issue')
            }
        }).catch((error: any) => {
            console.error('Error creating issue:', error)
            toast.error('Failed to create issue')
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
            
            {/* Required Fields */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    id="title" 
                    className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    maxLength={200}
                />
            </div>
            
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea 
                    id="description" 
                    rows={4}
                    className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={2000}
                />
            </div>
            
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                </label>
                <select 
                    id="category" 
                    className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" className="text-gray-400">Select a category</option>
                    <option value="road">Road</option>
                    <option value="water">Water</option>
                    <option value="electricity">Electricity</option>
                    <option value="safety">Safety</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* Optional Fields */}
            <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                <input 
                    type="text" 
                    id="tags" 
                    placeholder="Comma-separated tags (e.g., pothole, traffic)"
                    className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)} 
                />
            </div>

            <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select 
                    id="priority" 
                    className="text-gray-400 bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Location - Required */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Coordinates <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="longitude" className="block text-xs text-gray-600 mb-1">Longitude</label>
                        <input 
                            type="number" 
                            id="longitude" 
                            step="any"
                            placeholder="101.6869"
                            className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="latitude" className="block text-xs text-gray-600 mb-1">Latitude</label>
                        <input 
                            type="number" 
                            id="latitude" 
                            step="any"
                            placeholder="3.1390"
                            className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)} 
                        />
                    </div>
                </div>
            </div>

            {/* Address - Optional */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address (Optional)</label>
                <div className="space-y-2">
                    <input 
                        type="text" 
                        id="street" 
                        placeholder="Street"
                        className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                        value={street}
                        onChange={(e) => setStreet(e.target.value)} 
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input 
                            type="text" 
                            id="city" 
                            placeholder="City"
                            className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            id="state" 
                            placeholder="State"
                            className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                            value={state}
                            onChange={(e) => setState(e.target.value)} 
                        />
                    </div>
                    <input 
                        type="text" 
                        id="postalCode" 
                        placeholder="Postal Code"
                        className="text-black bg-white mt-1 block w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)} 
                    />
                </div>
            </div>

            {/* Visibility Options */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs text-gray-600 mb-2">Who can see this issue?</label>
                        <div className="flex flex-col gap-2">
                            <label className="flex flex-row gap-2 items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="public"
                                    checked={isPublic === true}
                                    onChange={() => setIsPublic(true)}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-700">Public</span>
                                    <span className="text-xs text-gray-500">Visible to everyone</span>
                                </div>
                            </label>
                            <label className="flex flex-row gap-2 items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="private"
                                    checked={isPublic === false}
                                    onChange={() => setIsPublic(false)}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-700">Private</span>
                                    <span className="text-xs text-gray-500">Only visible to admins and assigned users</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                        <label className="flex flex-row gap-2 items-start cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">Hide my identity (Anonymous)</span>
                                <span className="text-xs text-gray-500">Your name will not be shown as the creator</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-row items-center justify-end gap-4'>
                <button 
                    className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50' 
                    onClick={handleAddIssue} 
                    disabled={isLoading}
                >
                    Add Issue
                </button>
                <button 
                    className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50' 
                    onClick={handleCancel} 
                    disabled={isLoading}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default AddIssueForms
