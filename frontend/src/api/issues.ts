const ISSUEDOMAIN = process.env.ISSUEDOMAIN || 'http://localhost:5003/api/v1'

export const getIssues = async (props: any = {}) => {
    const { page, limit, sortBy, sortOrder, category, status, priority, search, near, radius } = props
    try {
        const queryParams = new URLSearchParams()
        
        if (page !== undefined) queryParams.append('page', page.toString())
        if (limit !== undefined) queryParams.append('limit', limit.toString())
        if (sortBy) queryParams.append('sortBy', sortBy)
        if (sortOrder) queryParams.append('sortOrder', sortOrder)
        if (category) queryParams.append('category', category)
        if (status) queryParams.append('status', status)
        if (priority) queryParams.append('priority', priority)
        if (search) queryParams.append('search', search)
        if (near) queryParams.append('near', near)
        if (radius !== undefined) queryParams.append('radius', radius.toString())

        const response = await fetch(`${ISSUEDOMAIN}/issues?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()
        return responseData
    } catch (error: any) {
        console.error('Error fetching issues:', error)
        return { 
            success: false, 
            message: error.message || 'Error fetching issues', 
            data: null 
        }
    }
}

export const getTotalIssues = async () => {
    try {
        const response = await getIssues({})
        if (response.success && response.data?.pagination) {
            return response.data.pagination.totalItems || 0
        }
        return 0
    } catch (error) {
        console.error('Error fetch total issues:', error)
        return 0
    }
}

export const getTotalIssuesResolved = async () => {
    try {
        const response = await getIssues({ status: 'resolved' })
        if (response.success && response.data?.pagination) {
            return { success: true, message: 'Issues resolved fetched successfully', data: response.data.pagination.totalItems }
        }
        return { success: false, message: 'Error fetch total issues resolved', data: null }
    } catch (error: any) {
        console.error('Error fetch total issues resolved:', error)
        return { success: false, message: error.message || 'Error fetch total issues resolved', data: null }
    }
}

export const createIssue = async (issue: any) => {
    try {
        const response = await fetch(`${ISSUEDOMAIN}/issues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(issue),
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        
        const responseData = await response.json()
        return responseData
    } catch (error: any) {
        console.error('Error creating issue:', error)
        return { 
            success: false, 
            message: error.message || 'Error creating issue', 
            data: null 
        }
    }
}

export const getIssuesByStatus = async () => {
    try {
        // Fetch all issues without status filter to get counts for all statuses
        const response = await getIssues({})
        if (response.success && response.data?.issues) {
            const issues = response.data.issues
            return { 
                success: true, 
                message: 'Issues by status fetched successfully', 
                data: {
                    reported: issues.filter((issue: any) => issue.status === 'reported').length,
                    in_review: issues.filter((issue: any) => issue.status === 'in_review').length,
                    assigned: issues.filter((issue: any) => issue.status === 'assigned').length,
                    resolved: issues.filter((issue: any) => issue.status === 'resolved').length,
                    archived: issues.filter((issue: any) => issue.status === 'archived').length,
                } 
            }
        }
        return { success: false, message: 'Error fetch issues by status', data: null }
    } catch (error: any) {
        console.error('Error fetch issues by status:', error)
        return { success: false, message: error.message || 'Error fetch issues by status', data: null }
    }
}