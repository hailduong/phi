import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {THistoryCreateBody, THistoryResponse} from './historyTypes'

const defaultData: THistoryResponse = {
    status: {
        code: 0,
        message: ''
    },
    total: 0,
    data: []
}

class HistoryService {
    async getHistory(patientId = '', pageNumber = 1, pageSize = 5) {
        if (patientId) {
            const response = await apiClient.get<THistoryResponse>(`${API_URL}/doctor/history/patient/${patientId}?pageNum=${pageNumber}&pageSize=${pageSize}`)
            return response
        }
        return defaultData
    }

    async createHistory(patientId: number, historyData: THistoryCreateBody) {
        const response = await apiClient.post<THistoryResponse>(`${API_URL}/doctor/history/patient/${patientId}`, historyData)
        return response
    }

    async deleteHistory(patientId: number, historyId: number, pageNumber = 1, pageSize = 5) {
        return await apiClient.delete<THistoryResponse>(`${API_URL}/doctor/history/${historyId}/patient/${patientId}?pageNum=${pageNumber}&pageSize=${pageSize}`)
    }
}

export default new HistoryService()