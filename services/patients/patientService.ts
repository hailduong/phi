import {API_URL} from '../../env'
import {TDeletePatientResponse, TPatientDataResponse} from './types'
import apiClient from '../apiClient'

const patientService = {
    getPatientList: async () => {
        return apiClient.fetch<TPatientDataResponse>(`${API_URL}/doctor/info/patients`)
    },
    getPatientDetail: () => {
    },
    updatePatientDetail: () => {

    },
    deletePatient: (id: number) => {
        return apiClient.fetch<TDeletePatientResponse>(`${API_URL}/doctor/info/patient/${id}`, undefined, 'delete')
    }
}

export default patientService