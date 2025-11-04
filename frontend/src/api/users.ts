const AUTHDOMAIN = process.env.AUTHDOMAIN || 'http://localhost:5001/api/v1'
const USERDOMAIN = process.env.USERDOMAIN || 'http://localhost:5002/api/v1'

export const addUsers = async (user: any, role: string) => {
  try {
    const response = await fetch(`${AUTHDOMAIN}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(user),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, message: 'User added successfully', data: data }
  } catch (error) {
    console.error('Error adding user:', error)
    return { success: false, message: 'Error adding user', data: null }
  }
}

export const getUsers = async (props: any = {}) => {
  const { page, limit, filters } = props
  try {
    const queryParams = new URLSearchParams()
    
    if (page !== undefined) queryParams.append('page', page.toString())
    if (limit !== undefined) queryParams.append('limit', limit.toString())
    
    if (filters?.role) {
      queryParams.append('role', filters.role)
    }
    if (filters?.isActive !== undefined) {
      queryParams.append('isActive', filters.isActive.toString())
    }
    if (filters?.search) {
      queryParams.append('search', filters.search)
    }

    const response = await fetch(`${USERDOMAIN}/users?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    
    const responseData = await response.json()
    return responseData
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return { 
      success: false, 
      message: error.message || 'Error fetching users', 
      data: null 
    }
  }
}

export const getTotalUsers = async () => {
  try {
    const response = await getUsers({})
    if (response.success && response.data?.pagination) {
      return response.data.pagination.totalItems || 0
    }
    return 0
  } catch (error) {
    console.error('Error getting total users:', error)
    return 0
  }
}

export const generateRandomPassword = async () => {
  try {
    const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return { success: true, message: 'Password generated successfully', data: { password } }
  } catch (error) {
    console.error('Error generating password:', error)
    return { success: false, message: 'Error generating password', data: null }
  }
}
