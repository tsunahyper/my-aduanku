import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { login } from '../api/login'

const LoginComponents = ({ isAdmin, setShowLoginForm }: { isAdmin: boolean, setShowLoginForm: (showLoginForm: boolean) => void }) => {
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
        setShowLoginForm(false)
    }

    const handleLogin = async () => {
        setLoading(true)
        setError('') 
        setSuccess('') 
        
        try {
            if (isAdmin) {
                await login(email, password, true)
                setSuccess('Admin logged in successfully!')
                setTimeout(() => navigate('/admin'), 1000)
            } else {
                await login(email, password, false)
                setSuccess('User logged in successfully!')
                setTimeout(() => navigate('/user'), 1000)
            }
        } catch (error) {
            setError((error as Error).message)
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md w-1/2 h-1/2">
                {/* Loading Spinner */}
                {loading && <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                </div>}
                {/* Error Message */}
                {error && <div className="text-red-500 text-center mb-4 p-2 rounded-md bg-red-100 border border-red-300">{error}</div>}
                {/* Success Message */}
                {success && <div className="text-green-500 text-center mb-4 p-2 rounded-md bg-green-100 border border-green-300">{success}</div>}

                {/* Login Form */}
                <h1 className="text-2xl font-bold mb-10 text-center"> Welcome to the {isAdmin ? 'Admin' : 'User'} Login Page</h1>
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
                                type={showPassword ? 'text' : 'password'} 
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
                                {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    
                    {/* Login Button */}
                    <div className="flex flex-row items-center justify-center gap-4 w-full">
                        <button 
                            type="button" 
                            className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" 
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : isAdmin ? 'Login as Admin' : 'Login as User'}
                        </button>

                        {/* Back Button */}
                        <button 
                            type="button" 
                            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" 
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