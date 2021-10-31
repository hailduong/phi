import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {TEmergencyCreateBody, TEmergencyResponse} from './emergencyTypes'

class EmergencyService {
    async getEmergency(patientId = '') {
        if (patientId) {
            return await apiClient.get<TEmergencyResponse>(`${API_URL}/doctor/allergy/patient/${patientId}`)
        }
    }
    async createEmergency(patientId='', emergencyData: TEmergencyCreateBody){
        const response = await apiClient.post<TEmergencyResponse>(`${API_URL}/doctor-patient/${patientId}/info/emergency`, emergencyData)
        return response
    }

    async deleteEmergency(patientId: string, emergencyId: number) {
        const response = await apiClient.delete<TEmergencyResponse>(`${API_URL}/doctor-patient/${patientId}/info/emergency/${emergencyId}`)
        return response
    }

    async updateEmergency(patientId: string, emergencyId: number, emergencyData: TEmergencyCreateBody){
        const response = await apiClient.put<TEmergencyResponse>(`${API_URL}/doctor-patient/${patientId}/info/emergency/${emergencyId}`, emergencyData)
        return response
    }
}

export default new EmergencyService()