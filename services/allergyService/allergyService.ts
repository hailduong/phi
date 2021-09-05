import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {TAllergyCreateBody, TAllergyResponse} from './allergyTypes'
import {TEventResponse} from "../eventService/eventTypes";

const defaultData: TAllergyResponse = {
    status: {
        code: 0,
        message: ''
    },
    total: 0,
    data: []
}

class AllergyService {
    async getAllAllergies(patientId = '', pageNumber = 1, pageSize = 5) {
        if (patientId) {
            const response = await apiClient.get<TAllergyResponse>(`${API_URL}/doctor/allergy/patient/${patientId}?pagenum=${pageNumber}&pagesize=${pageSize}`)
            return response
        }
        return defaultData
    }
    async createAllergy(patientId='', allergyData: TAllergyCreateBody){
        const response = await apiClient.post<TAllergyResponse>(`${API_URL}/doctor/allergy/patient/${patientId}`, allergyData)
        return response
    }

    async deleteEvent(patientId: string, allergyId: number) {
        const response = await apiClient.delete<TEventResponse>(`${API_URL}/doctor/allergy/${allergyId}/patient/${patientId}`)
        return response
    }

    async updateEvent(patientId: string, allergyId: number, allergyData: TAllergyCreateBody){
        const response = await apiClient.put(`${API_URL}/doctor/allergy/${allergyId}/patient/${patientId}`, allergyData)
        return response
    }
}

export default new AllergyService()