import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { login } from '../api/login'

const LoginComponents = ({ isAdmin }: { isAdmin: boolean }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(true)


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const handleBackToSelection = () => {
        navigate('/login')
    }

    const handleLogin = async () => {
        setLoading(true)
        setError('') 
        setSuccess('') 
        
        try {
            if (isAdmin) {
                await login(email, password, true)
                setSuccess('Admin logged in successfully!')
                window.dispatchEvent(new Event('authChange'))
                setTimeout(() => {
                    navigate('/admin/dashboard', { replace: true })
                }, 500)
            } else {
                await login(email, password, false)
                setSuccess('User logged in successfully!')
                window.dispatchEvent(new Event('authChange'))
                setTimeout(() => {
                    navigate('/user/dashboard', { replace: true })
                }, 500)
            }
        } catch (error) {
            setError((error as Error).message)
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
            </div>

            {/* Login Card with Glass Effect */}
            <div className="relative flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
                {/* Loading Spinner */}
                {loading && <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                </div>}
                {/* Error Message */}
                {error && <div className="text-red-500 text-center mb-4 p-2 rounded-md bg-red-100 border border-red-300">{error}</div>}
                {/* Success Message */}
                {success && <div className="text-green-500 text-center mb-4 p-2 rounded-md bg-green-100 border border-green-300">{success}</div>}

                {/* Login Form */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600">
                        {isAdmin ? 'Admin Portal' : 'User Portal'}
                    </p>
                </div>
                <form className="w-full max-w-md">
                    {/* Email Input */}
                    <div className="mb-4 flex flex-row items-center justify-center gap-4 w-full">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 w-1/3">Email</label>
                        <input 
                            type={isAdmin ? 'email' : 'text'} 
                            id="email" 
                            placeholder="Enter your email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div className="mb-6 flex flex-row items-center justify-center gap-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 w-1/3">Password</label>
                        <div className="relative w-full">
                            <input 
                                type={showPassword ? 'password' : 'text'} 
                                id="password" 
                                placeholder="Enter your password" 
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    
                    {/* Login Button */}
                    <div className="flex flex-row items-center justify-center gap-4 w-full">
                        <button 
                            type="button" 
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transform transition-all duration-200 hover:scale-105 shadow-lg" 
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : isAdmin ? 'Login as Admin' : 'Login as User'}
                        </button>

                        {/* Back Button */}
                        <button 
                            type="button" 
                            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105" 
                            onClick={handleBackToSelection}
                            disabled={loading}
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponents