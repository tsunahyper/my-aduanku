import React, { useState } from 'react'
import { deleteUser } from '../../../api/users'
import { toast } from 'react-toastify'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface DeleteUserPopupProps {
  user: any
  onClose: () => void
  onSuccess: () => void
}

const DeleteUserPopup = ({ user, onClose, onSuccess }: DeleteUserPopupProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      const response = await deleteUser(user._id)
      
      if (response.success) {
        toast.success('User deleted successfully!')
        onSuccess()
        onClose()
      } else {
        toast.error(response.message || 'Failed to delete user')
      }
    } catch (error: any) {
      toast.error(error.message || 'Error deleting user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center gap-4">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-bold text-black">Delete User</h2>
        </div>

        <div className="text-center text-gray-600">
          <p>Are you sure you want to delete this user?</p>
          <p className="font-semibold mt-2">{user.name} ({user.username})</p>
          <p className="text-sm text-red-500 mt-3">This action cannot be undone.</p>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserPopup

