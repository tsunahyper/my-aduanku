const COMMENTDOMAIN = process.env.COMMENTDOMAIN || 'http://localhost:5004/api/v1'

export const getCommentStats = async () => {
    try {
        const response = await fetch(`${COMMENTDOMAIN}/comments/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                window.location.href = '/login'
                return { success: false, message: 'Session expired', data: 0 }
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()
        return { success: true, message: 'Comment stats fetched successfully', data: responseData.data.totalComments }
    } catch (error: any) {
        console.error('Error fetching comment stats:', error)
        return { success: false, message: error.message || 'Error fetching comment stats', data: 0 }
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