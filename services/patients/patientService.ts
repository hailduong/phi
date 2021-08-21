import {API_URL} from '../../env'
import {TPatientDataResponse} from './types'
import apiClient from '../apiClient'

const patientService = {
    getPatientList: async () => {
        const response = await apiClient.fetch(`${API_URL}/doctor/info/patients`)
        return await response?.json() as TPatientDataResponse
    },
    getPatientDetail: () => {
    },
    updatePatientDetail: () => {

    },
    deletePatient: () => {

    }
}

export default patientService