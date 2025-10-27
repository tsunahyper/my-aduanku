import React, { useState } from 'react'
import LoginCard from '../components/LoginCard'
import LoginComponents from '../components/LoginComponents'

const Login = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)

    const handleCardClick = (adminStatus: boolean) => {
        setIsAdmin(adminStatus)
        setShowLoginForm(true)
    }

    return (
        <div>
            {/* Login Selection Interface */}
            {!showLoginForm && (
                <div className="flex flex-row items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center gap-4 h-1/2">
                        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to the Login Page</h1>
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
                        setShowLoginForm={setShowLoginForm}
                    />
                </div>
            )}
        </div>
    )
}

export default Login