import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {TPrescriptionCreateBody, TPrescriptionResponse} from './prescriptionTypes'


const defaultData: TPrescriptionResponse = {
    status: {
        code: 0,
        message: ''
    },
    total: 0,
    data: []
}

class PrescriptionService {
    async getAllPrescriptions(patientId = '', pageNumber = 1, pageSize = 100) {
        if (patientId) {
            const response = await apiClient.get<TPrescriptionResponse>(`${API_URL}/doctor/prescription/patient/${patientId}?pagenum=${pageNumber}&pagesize=${pageSize}`)
            return response
        }
        return defaultData
    }

    async createPrescription(patientId: string, dataPrescription: TPrescriptionCreateBody) {
        const response = await apiClient.post<TPrescriptionResponse>(`${API_URL}/doctor/prescription/patient/${patientId}`, dataPrescription)
        return response
    }

    async deletePrescription(patientId: string, prescriptionId: number) {
        return await apiClient.delete<TPrescriptionResponse>(`${API_URL}/doctor/prescription/${prescriptionId}/patient/${patientId}`)
    }

    async updatePrescription(patientId: string, prescriptionId: number, dataPrescription: TPrescriptionCreateBody) {
        return await apiClient.put<TPrescriptionResponse>(`${API_URL}/doctor/prescription/${prescriptionId}/patient/${patientId}`, dataPrescription)
    }
}

export default new PrescriptionService()