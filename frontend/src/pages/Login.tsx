import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginCard from '../components/LoginCard'
import LoginComponents from '../components/LoginComponents'
import aduankuImg from '../assets/aduanku.png'
import { BuildingOffice2Icon, UserCircleIcon } from '@heroicons/react/24/solid'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, userRole } = useAuth()
    const [isAdmin, setIsAdmin] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            if (userRole === 'admin' || userRole === 'superadmin') {
                navigate('/admin/dashboard', { replace: true })
            } else {
                navigate('/user/dashboard', { replace: true })
            }
        }
    }, [isAuthenticated, userRole, navigate])

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

    // Don't render login if already authenticated
    if (isAuthenticated) {
        return null
    }

    const handleCardClick = (adminStatus: boolean) => {
        setIsAdmin(adminStatus)
        setShowLoginForm(true)
        navigate(adminStatus ? '/login/admin' : '/login/user')
    }

    return (
        <div className="min-h-screen w-full">
            {/* Login Selection Interface */}
            {!showLoginForm && (
                <div className="relative flex flex-row items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-700"></div>
                        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-400 opacity-10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                    </div>

                    {/* Selection Card with Glass Effect */}
                    <div className="relative bg-white/95 backdrop-blur-lg p-10 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 w-full max-w-3xl border border-white/20">
                        <div className="text-center mb-4">
                            <div className="flex flex-row items-center justify-center gap-2">
                                <img src={aduankuImg} className="h-12 w-12" alt='aduanku-logo' />
                                <h1 className="font-sans text-4xl font-bold text-gray-800 mb-2">ADUANKU</h1>
                            </div>
                            <p className="text-gray-600 text-lg">Community Issue Management System</p>
                            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                        </div>
                        {/* Admin Login Card */}
                        <LoginCard
                            isAdmin={true}
                            setIsLogin={() => handleCardClick(true)}
                            icon={<BuildingOffice2Icon />}
                        />
                        {/* User Login Card */}
                        <LoginCard
                            isAdmin={false}
                            setIsLogin={() => handleCardClick(false)}
                            icon={<UserCircleIcon />}
                        />
                    </div>
                </div>
            )}

            {/* Login Form Interface */}
            {showLoginForm && (
                <div className="min-h-screen w-full">
                    <LoginComponents
                        isAdmin={isAdmin}
                    />
                </div>
            )}
        </div>
    )
}

export default Login