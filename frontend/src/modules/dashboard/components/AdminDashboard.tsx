import StatusCard from "../../../components/StatusCard"
import viewUserIcon from '../../../assets/view-user.png'
import addUserIcon from '../../../assets/add-user.png'
import { 
  CheckCircleIcon, 
  ChatBubbleLeftRightIcon, 
  ExclamationTriangleIcon, 
  UsersIcon 
} from '@heroicons/react/24/solid'
import { getTotalIssues } from "../../../api/issues"
import { useEffect, useState } from "react"
import { getTotalUsers } from "../../../api/users"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [totalIssues, setTotalIssues] = useState<any>(null)
  const [totalUsers, setTotalUsers] = useState<any>(null)
  // const [comments, setComments] = useState<any>(null)
  // const [issuesResolved, setIssuesResolved] = useState<any>(null)

  useEffect(() => {
    getTotalIssues().then((data: any) => {
      setTotalIssues(data)
    }).catch((error: any) => {
      console.error('Error fetching total issues:', error)
      setTotalIssues(0)
    })

    getTotalUsers().then((data: any) => {
      setTotalUsers(data)
    }).catch((error: any) => {
      console.error('Error fetching total users:', error)
      setTotalUsers(0)
    })

  }, [])


  return (
    <div className="flex flex-col gap-8">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-60 flex items-center justify-center">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin panel. View your overview and statistics here.</p>
          </div>
          <div className="flex flex-row gap-6 items-center justify-center">
            <div onClick={() => navigate('/admin/user-management')} className="flex flex-row items-center gap-2 bg-blue-500 border border-transparent rounded-lg p-2 px-4 text-white font-mono font-semibold hover:bg-blue-700 cursor-pointer">
              <img src={viewUserIcon} alt="view-user" className="w-5 h-5" />
              View User
            </div>
            <div onClick={() => navigate('/admin/user-management')} className="flex flex-row items-center gap-2 bg-red-500 border border-gray-300 rounded-lg p-2 px-4 text-white font-mono font-semibold hover:bg-red-700 cursor-pointer">
              <img src={addUserIcon} alt="view-user" className="w-6 h-6" />
              Add User
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 w-full">
        <StatusCard 
          icon={<ExclamationTriangleIcon className="w-7 h-7 text-white" />}
          numberOfRecords={totalIssues}
          totalRecords={'Total Number of Issues'}
          percentageRecords={'+12'}
          alt={'total-issues'}
          statusColor={'red'}
        />
        <StatusCard 
          icon={<UsersIcon className="w-7 h-7 text-white" />}
          numberOfRecords={totalUsers}
          totalRecords={'Total Number of Users'}
          percentageRecords={'+12'}
          alt={'total-users'}
          statusColor={'blue'}
        />
        <StatusCard 
          icon={<ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />}
          numberOfRecords={1247}
          totalRecords={'Total Number of Comments'}
          percentageRecords={'+12'}
          alt={'total-comments'}
          statusColor={'purple'}
        />
        <StatusCard 
          icon={<CheckCircleIcon className="w-7 h-7 text-white" />}
          numberOfRecords={1247}
          totalRecords={'Total Number of Issues Resolved'}
          percentageRecords={'+12'}
          alt={'total-issues-resolved'}
          statusColor={'green'}
        />
      </div>
    </div>
  )
}

export default AdminDashboard

