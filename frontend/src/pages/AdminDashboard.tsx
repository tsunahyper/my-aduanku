import React from 'react'
import Navbar from '../components/Navbar'


const AdminDashboard = () => {
  return (
    <div>
        <Navbar isAdmin={true} />
    </div>
  )
}

export default AdminDashboard