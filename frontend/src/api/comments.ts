const COMMENTDOMAIN = process.env.COMMENTDOMAIN || 'http://localhost:5004/api/v1'

export const getComments = async () => {
    try {
        const response = await fetch(`${COMMENTDOMAIN}/comments`, {
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
    return { success: true, message: 'Comments fetched successfully', data: responseData.data.pagination.totalItems }
    } catch (error: any) {
        console.error('Error fetching comments:', error)
        return { success: false, message: error.message || 'Error fetching comments', data: null }
    }
}

export const createComment = async (comment: any) => {
    const response = await fetch(`${COMMENTDOMAIN}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
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
}