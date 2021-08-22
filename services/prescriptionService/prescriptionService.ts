import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {TPrescriptionResponse} from './prescriptionTypes'


const defaultData: TPrescriptionResponse = {
    status: {
        code: 0,
        message: ''
    },
    total: 0,
    data: []
}

class PrescriptionService {
    getAllPrescriptions(patientId = '', pageNumber = 1, pageSize = 5) {
        if (patientId) {
            const response = apiClient.fetch<TPrescriptionResponse>(`${API_URL}/doctor/prescription/patient/${patientId}?pagenum=${pageNumber}&pagesize=${pageSize}`)
            return response
        }
        return defaultData
    }
}

export default new PrescriptionService()