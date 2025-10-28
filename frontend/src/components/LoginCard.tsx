const LoginCard = ({ isAdmin, setIsLogin, image }: { isAdmin: boolean, setIsLogin: (isAdmin: boolean) => void, image: string }) => {
    const handleLogin = () => {
        setIsLogin(!isAdmin)
    }
    return (
        <div className="w-full h-1/3 flex flex-col items-center justify-center">
            <div onClick={handleLogin} className={isAdmin ? "cursor-pointer w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-red-700 dark:bg-red-800 dark:hover:bg-gray-700" : "cursor-pointer w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-teal-700 dark:bg-teal-800 dark:hover:bg-gray-700"}>
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={image} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white"> {isAdmin ? 'Admin' : 'User'} Login</h5>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Login as an {isAdmin ? 'admin' : 'user'} to manage the system</p>
                </div>
            </div>
        </div>
    )
}

export default LoginCard