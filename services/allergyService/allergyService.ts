import apiClient from '../apiClient'
import {API_URL} from '../../env'
import {TAllergyResponse} from './allergyTypes'


const defaultData: TAllergyResponse = {
    status: {
        code: 0,
        message: ''
    },
    total: 0,
    data: []
}

class AllergyService {
    getAllAllergies(patientId = '', pageNumber = 1, pageSize = 5) {
        if (patientId) {
            const response = apiClient.fetch<TAllergyResponse>(`${API_URL}/doctor/allergy/patient/${patientId}?pagenum=${pageNumber}&pagesize=${pageSize}`)
            return response
        }
        return defaultData
    }
}

export default new AllergyService()