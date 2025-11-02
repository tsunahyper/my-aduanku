export const getUsers = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const generatePasswordApi = async () => {
  try {
    const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return { success: true, data: { password } }
  } catch (error) {
    console.error('Error generating password:', error)
    return { success: false, message: 'Error generating password' }
  }
}
