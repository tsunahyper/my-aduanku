import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import LoginCard from '../components/LoginCard'
import LoginComponents from '../components/LoginComponents'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isAdmin, setIsAdmin] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)

    useEffect(() => {
        if (location.pathname === '/login/admin') {
            setIsAdmin(true)
            setShowLoginForm(true)
        } else if (location.pathname === '/login/user') {
            setIsAdmin(false)
            setShowLoginForm(true)
        } else {
            setShowLoginForm(false)
        }
    }, [location.pathname])

    const handleCardClick = (adminStatus: boolean) => {
        setIsAdmin(adminStatus)
        setShowLoginForm(true)
        navigate(adminStatus ? '/login/admin' : '/login/user')
    }

    return (
        <div>
            {/* Login Selection Interface */}
            {!showLoginForm && (
                <div className="flex flex-row items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center gap-4 h-1/2">
                        <h1 className="font-sans text-2xl font-bold mb-4 text-center">ADUANKU Login Interface</h1>
                        {/* Admin Login Card */}
                        <LoginCard 
                            isAdmin={true} 
                            setIsLogin={() => handleCardClick(true)} 
                            image="/images/admin.jpg" 
                        />
                        {/* User Login Card */}
                        <LoginCard 
                            isAdmin={false} 
                            setIsLogin={() => handleCardClick(false)} 
                            image="/images/user.jpg" 
                        />
                    </div>
                </div>
            )}

            {/* Login Form Interface */}
            {showLoginForm && (
                <div>
                    <LoginComponents
                        isAdmin={isAdmin}
                    />
                </div>
            )}
        </div>
    )
}

export default Login