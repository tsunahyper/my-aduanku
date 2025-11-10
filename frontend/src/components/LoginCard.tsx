const LoginCard = ({ isAdmin, setIsLogin, icon }: { isAdmin: boolean, setIsLogin: (isAdmin: boolean) => void, icon: React.ReactNode }) => {
    const handleLogin = () => {
        setIsLogin(!isAdmin)
    }
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div 
                onClick={handleLogin} 
                className={`cursor-pointer w-full flex flex-col items-center rounded-xl shadow-lg md:flex-row md:max-w-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    isAdmin 
                        ? "bg-gradient-to-r from-red-600 to-red-700 border-2 border-red-400" 
                        : "bg-gradient-to-r from-teal-600 to-cyan-600 border-2 border-teal-400"
                }`}
            >
                <div className="w-full rounded-t-xl h-48 md:h-auto md:w-48 md:rounded-none md:rounded-l-xl flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    <div className="text-white [&>svg]:w-24 [&>svg]:h-24">
                        {icon}
                    </div>
                </div>
                <div className="flex flex-col justify-between p-6 leading-normal flex-1">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span>{isAdmin ? 'Admin' : 'User'} Portal</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </h5>
                    <p className="font-normal text-white/90 text-sm">
                        Login as an {isAdmin ? 'admin' : 'user'} to manage and track community issues
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginCard