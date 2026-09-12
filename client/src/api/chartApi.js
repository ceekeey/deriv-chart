import apiClient from './axios'

export const getChartLayouts = () => apiClient.get('/charts')
export const saveChartLayout = (layout) => apiClient.post('/charts', layout)
