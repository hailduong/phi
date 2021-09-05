import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {TEventCreateBody, TEventResponse} from './eventTypes'


const defaultData: TEventResponse = {
    status: {
        code: 0,
        message: ''
    },
    total: 0,
    data: []
}

class EventService {
    async getAllEvents(patientId = '', pageNumber = 1, pageSize = 5) {
        if (patientId) {
            const response = await apiClient.get<TEventResponse>(`${API_URL}/doctor/event/patient/${patientId}?pagenum=${pageNumber}&pagesize=${pageSize}`)
            return response
        }
        return defaultData
    }

    async createEvent(patientId: string, eventData: TEventCreateBody) {
        const response = await apiClient.post<TEventResponse>(`${API_URL}/doctor/event/patient/${patientId}`, eventData)
        return response
    }

    async deleteEvent(patientId: string, eventId: number) {
        return await apiClient.delete<TEventResponse>(`${API_URL}/doctor/event/${eventId}/patient/${patientId}`)
    }

    async updateEvent(patientId: string, eventId: number, eventData: TEventCreateBody) {
        return await apiClient.put<TEventResponse>(`${API_URL}/doctor/event/${eventId}/patient/${patientId}`,eventData)
    }
}


export default new EventService()