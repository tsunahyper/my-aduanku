const DOMAIN = process.env.BACKEND_DOMAIN

export async function login(email: string, password: string, isAdmin: boolean) {
        const response = await fetch(`${DOMAIN}/auth/${isAdmin ? 'admin' : 'user'}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        localStorage.setItem('token', data.data.token)
        return data
}