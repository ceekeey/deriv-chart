import apiClient from './axios'

export const loginRequest = (credentials) => apiClient.post('/auth/login', credentials)
export const registerRequest = (userData) => apiClient.post('/auth/register', userData)
export const logoutRequest = () => apiClient.post('/auth/logout')
export const getCurrentUser = () => apiClient.get('/auth/me')
