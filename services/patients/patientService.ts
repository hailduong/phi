import {API_URL} from '../../env'
import {TPatientDataResponse} from './types'
import apiClient from '../apiClient'

const patientService = {
    getPatientList: async () => {
        return apiClient.fetch<TPatientDataResponse>(`${API_URL}/doctor/info/patients`)
    },
    getPatientDetail: () => {
    },
    updatePatientDetail: () => {

    },
    deletePatient: () => {

    }
}

export default patientService