import React from "react"
import viewUserImg from '../assets/view-user.png'
import addUserImg from '../assets/add-user.png'

const AdminDashboard = () => {
  return (
    <div>
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-60 flex items-center justify-center">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin panel. View your overview and statistics here.</p>
          </div>
          <div className="flex flex-row gap-6 items-center justify-center">
            <div className="flex flex-row items-center gap-2 bg-blue-500 border border-transparent rounded-lg p-2 px-4 text-white font-mono font-semibold hover:bg-blue-600 cursor-pointer">
              <img src={viewUserImg} alt="view-user" className="w-5 h-5"/>
              View User
            </div>
            <div className="flex flex-row items-center gap-2 bg-red-500 border border-gray-300 rounded-lg p-2 px-4 text-white font-mono font-semibold hover:bg-red-600 cursor-pointer">
              <img src={addUserImg} alt="view-user" className="w-6 h-6"/>
              + Add User
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard