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

export const getCommentsByIssue = async (issueId: string) => {
    try {
        const response = await fetch(`${COMMENTDOMAIN}/comments/issue/${issueId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                window.location.href = '/login'
                return { success: false, message: 'Session expired', data: null }
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()
        return responseData
    } catch (error: any) {
        console.error('Error fetching comments:', error)
        return { success: false, message: error.message || 'Error fetching comments', data: null }
    }
}

export const createComment = async (issueId: string, text: string) => {
    try {
        const response = await fetch(`${COMMENTDOMAIN}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ issueId, text }),
        })
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                window.location.href = '/login'
                return { success: false, message: 'Session expired', data: null }
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()
        return responseData
    } catch (error: any) {
        console.error('Error creating comment:', error)
        return { success: false, message: error.message || 'Error creating comment', data: null }
    }
}

export const updateComment = async (commentId: string, text: string) => {
    try {
        const response = await fetch(`${COMMENTDOMAIN}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ text }),
        })
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                window.location.href = '/login'
                return { success: false, message: 'Session expired', data: null }
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()
        return responseData
    } catch (error: any) {
        console.error('Error updating comment:', error)
        return { success: false, message: error.message || 'Error updating comment', data: null }
    }
}

export const deleteComment = async (commentId: string) => {
    try {
        const response = await fetch(`${COMMENTDOMAIN}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                window.location.href = '/login'
                return { success: false, message: 'Session expired', data: null }
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()
        return responseData
    } catch (error: any) {
        console.error('Error deleting comment:', error)
        return { success: false, message: error.message || 'Error deleting comment', data: null }
    }
}

export const toggleCommentLike = async (commentId: string) => {
    try {
        const response = await fetch(`${COMMENTDOMAIN}/comments/${commentId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                window.location.href = '/login'
                return { success: false, message: 'Session expired', data: null }
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()
        return responseData
    } catch (error: any) {
        console.error('Error toggling like:', error)
        return { success: false, message: error.message || 'Error toggling like', data: null }
    }
}