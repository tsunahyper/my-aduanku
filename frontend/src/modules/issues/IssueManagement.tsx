import React, { useState } from "react"
import IssueManagementTable from "./components/IssueManagementTable"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import AddIssuePopup from "./popups/AddIssue"

const IssueManagement = () => {
  const [isAddIssuePopupOpen, setIsAddIssuePopupOpen] = useState(false)

  return (
    <div className="flex flex-col gap-20">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-60 flex items-center justify-center">
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Issue Management</h1>
            <p className="text-gray-600">Manage all user issues and tickets here.</p>
          </div>
          <div
            onClick={() => setIsAddIssuePopupOpen(!isAddIssuePopupOpen)}
            className="flex flex-row gap-2 bg-red-500 border border-gray-300 rounded-lg p-2 px-4 text-white font-mono font-semibold hover:bg-red-600 cursor-pointer w-2/3 justify-center"
          >
            <PlusCircleIcon className="w-6 h-6" />
            <div className="cursor-pointer">
              New Issue
            </div>
            {isAddIssuePopupOpen && <AddIssuePopup onClose={() => setIsAddIssuePopupOpen(false)} />}
          </div>
        </div>
      </div>
      <div>
        <IssueManagementTable />
      </div>
    </div>
  )
}

export default IssueManagement

