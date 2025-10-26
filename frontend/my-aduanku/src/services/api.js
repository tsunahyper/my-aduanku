import axios from 'axios';

// Base configuration for API calls
const API_BASE_URL = 'http://localhost';

// Service ports based on docker-compose.yml
const SERVICES = {
  AUTH: 5001,
  USER: 5002,
  ISSUE: 5003,
  COMMENTS: 5004,
  ANALYTICS: 5005
};

// Create axios instances for each service
const createApiInstance = (port) => {
  return axios.create({
    baseURL: `${API_BASE_URL}:${port}/api`,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// API instances
export const authApi = createApiInstance(SERVICES.AUTH);
export const userApi = createApiInstance(SERVICES.USER);
export const issueApi = createApiInstance(SERVICES.ISSUE);
export const commentsApi = createApiInstance(SERVICES.COMMENTS);
export const analyticsApi = createApiInstance(SERVICES.ANALYTICS);

// Request interceptor to add auth token
const addAuthToken = (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Add auth interceptor to all API instances
[authApi, userApi, issueApi, commentsApi, analyticsApi].forEach(api => {
  api.interceptors.request.use(addAuthToken);
});

// Response interceptor for error handling
const handleResponseError = (error) => {
  if (error.response?.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

[authApi, userApi, issueApi, commentsApi, analyticsApi].forEach(api => {
  api.interceptors.response.use(
    (response) => response,
    handleResponseError
  );
});

// API Service Classes
export class AuthService {
  static async login(credentials) {
    const response = await authApi.post('/v1/auth/login', credentials);
    return response.data;
  }

  static async register(userData) {
    const response = await authApi.post('/v1/auth/register', userData);
    return response.data;
  }

  static async logout() {
    const response = await authApi.post('/v1/auth/logout');
    return response.data;
  }

  static async checkHealth() {
    const response = await authApi.get('/v1/auth/health');
    return response.data;
  }
}

export class UserService {
  static async getUsers(params = {}) {
    const response = await userApi.get('/v1/users', { params });
    return response.data;
  }

  static async getUserById(id) {
    const response = await userApi.get(`/v1/users/${id}`);
    return response.data;
  }

  static async updateUser(id, userData) {
    const response = await userApi.put(`/v1/users/${id}`, userData);
    return response.data;
  }

  static async deleteUser(id) {
    const response = await userApi.delete(`/v1/users/${id}`);
    return response.data;
  }

  static async getProfile() {
    const response = await userApi.get('/v1/users/profile');
    return response.data;
  }

  static async updateProfile(userData) {
    const response = await userApi.put('/v1/users/profile', userData);
    return response.data;
  }

  static async uploadAvatar(formData) {
    const response = await userApi.post('/v1/users/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async checkHealth() {
    const response = await userApi.get('/health');
    return response.data;
  }
}

export class IssueService {
  static async getIssues(params = {}) {
    const response = await issueApi.get('/v1/issues', { params });
    return response.data;
  }

  static async getIssueById(id) {
    const response = await issueApi.get(`/v1/issues/${id}`);
    return response.data;
  }

  static async createIssue(issueData) {
    const response = await issueApi.post('/v1/issues', issueData);
    return response.data;
  }

  static async updateIssue(id, issueData) {
    const response = await issueApi.put(`/v1/issues/${id}`, issueData);
    return response.data;
  }

  static async deleteIssue(id) {
    const response = await issueApi.delete(`/v1/issues/${id}`);
    return response.data;
  }

  static async assignIssue(id, assignedTo) {
    const response = await issueApi.put(`/v1/issues/${id}/assign`, { 
      assignedTo 
    });
    return response.data;
  }

  static async uploadAttachments(id, formData) {
    const response = await issueApi.post(`/v1/issues/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async getIssuesNearLocation(lat, lng, radius = 1000) {
    const response = await issueApi.get('/v1/issues/near', {
      params: { lat, lng, radius }
    });
    return response.data;
  }

  static async checkHealth() {
    const response = await issueApi.get('/health');
    return response.data;
  }
}

export class CommentsService {
  static async getComments(issueId) {
    const response = await commentsApi.get(`/v1/comments/issue/${issueId}`);
    return response.data;
  }

  static async createComment(commentData) {
    const response = await commentsApi.post('/v1/comments', commentData);
    return response.data;
  }

  static async updateComment(id, commentData) {
    const response = await commentsApi.put(`/v1/comments/${id}`, commentData);
    return response.data;
  }

  static async deleteComment(id) {
    const response = await commentsApi.delete(`/v1/comments/${id}`);
    return response.data;
  }

  static async toggleCommentLike(id) {
    const response = await commentsApi.post(`/v1/comments/${id}/like`);
    return response.data;
  }

  static async checkHealth() {
    const response = await commentsApi.get('/health');
    return response.data;
  }
}

export class AnalyticsService {
  static async getDashboardStats() {
    const response = await analyticsApi.get('/v1/analytics/summary');
    return response.data;
  }

  static async getIssueStats(params = {}) {
    const response = await analyticsApi.get('/v1/analytics/statistics', { params });
    return response.data;
  }

  static async generateAnalytics(params = {}) {
    const response = await analyticsApi.post('/v1/analytics/generate', params);
    return response.data;
  }

  static async checkHealth() {
    const response = await analyticsApi.get('/v1/analytics/health');
    return response.data;
  }
}

// Utility functions
export const apiUtils = {
  // Handle API errors consistently
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        status: 0
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1
      };
    }
  },

  // Format date for API calls
  formatDate: (date) => {
    return new Date(date).toISOString();
  },

  // Build query string from object
  buildQueryString: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    return searchParams.toString();
  }
};
