import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {THistoryResponse} from './historyTypes'

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
            const response = apiClient.fetch<THistoryResponse>(`${API_URL}/doctor/history/patient/${patientId}?pagenum=${pageNumber}&pagesize=${pageSize}`)
            return response
        }
        return defaultData
    }
}

export default new HistoryService()