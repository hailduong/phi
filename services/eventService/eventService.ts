import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {TEventResponse} from './eventTypes'


const defaultData: TEventResponse = {
    status: {
        code: 0,
        message: ''
    },
    total: 0,
    data: []
}

class EventService {
    getAllEvents(patientId = '', pageNumber = 1, pageSize = 5) {
        if (patientId) {
            const response = apiClient.fetch<TEventResponse>(`${API_URL}/doctor/event/patient/${patientId}?pagenum=${pageNumber}&pagesize=${pageSize}`)
            return response
        }
        return defaultData
    }
}

export default new EventService()