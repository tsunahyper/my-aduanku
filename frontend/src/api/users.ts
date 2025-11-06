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
    // Only fetch pagination info (limit: 1) to get total count efficiently
    const response = await getUsers({ page: 1, limit: 1 })
    if (response.success && response.data?.pagination) {
      return response.data.pagination.totalItems || 0
    }
    return 0
  } catch (error) {
    console.error('Error getting total users:', error)
    return 0
  }
}

// Get all users and group them by role (frontend filtering)
// Note: Backend doesn't have a specific "users by role" endpoint,
// so fetch all users and group by role on the frontend
export const getUsersByRole = async () => {
  try {
    // Fetch all users with a high limit to get all users
    const response = await getUsers({ page: 1, limit: 1000 })
    if (response.success && response.data?.users) {
      const users = response.data.users
      
      // Group users by role on the frontend
      const usersByRole: { [key: string]: number } = {
        user: 0,
        admin: 0,
        superadmin: 0,
      }
      
      users.forEach((user: any) => {
        const role = user.role || 'user'
        if (usersByRole[role] !== undefined) {
          usersByRole[role]++
        }
      })
      
      return { 
        success: true, 
        message: 'Users by role fetched successfully', 
        data: usersByRole 
      }
    }
    return { success: false, message: 'Error fetch users by role', data: null }
  } catch (error: any) {
    console.error('Error fetch users by role:', error)
    return { success: false, message: error.message || 'Error fetch users by role', data: null }
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

export const getActiveUsers = async () => {
  try {
    const response = await getUsers({ filters: { isActive: true } })
    if (response.success && response.data?.pagination) {
      return { success: true, message: 'Active users fetched successfully', data: response.data.pagination.totalItems }
    }
    return { success: false, message: 'Error fetch active users', data: null }
  } catch (error: any) {
    console.error('Error fetch active users:', error)
    return { success: false, message: error.message || 'Error fetch active users', data: null }
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${USERDOMAIN}/users/profile`, {
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
    console.error('Error fetching current user:', error)
    return {
      success: false,
      message: error.message || 'Error fetching current user',
      data: null
    }
  }
}