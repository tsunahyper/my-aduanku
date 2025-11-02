import React, { useEffect, useState } from "react"
import UserManagementTable from "../components/UserManagementTable"
import { UserIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { getUsers } from "../api/users"
import AddUserPopup from "./popup/addUser"

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([])
  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false)

  useEffect(() => {
    getUsers().then((data: any) => {
      setUsers(data.data.users)
    })
    console.log(isAddUserPopupOpen)
  }, [])

  return (
    <div className="flex flex-col gap-20">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-60 flex items-center justify-center">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">User Management</h1>
            <p className="text-gray-600">Welcome to the user management panel. View and manage users here.</p>
          </div>
          <div className="flex flex-row gap-6 items-center justify-center">
            <div className="flex flex-row items-center gap-2 bg-red-500 border border-gray-300 rounded-lg p-2 px-4 text-white font-mono font-semibold hover:bg-red-600 cursor-pointer">
              <div>
                <PlusCircleIcon className="w-6 h-6" />
              </div>
              <div>
                <div onClick={() => setIsAddUserPopupOpen(!isAddUserPopupOpen)} className="cursor-pointer">
                  Add User
                </div>
                {isAddUserPopupOpen && <AddUserPopup />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserManagementTable users={users} />
    </div>
  )
}

export default UserManagement