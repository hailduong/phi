import {API_URL} from '../../env'
import {TCreatePatientResponse, TDeletePatientResponse, TPatientDataResponse, TPatientEntity} from './types'
import apiClient from '../apiClient'

const patientService = {
    getPatientList: async () => {
        return apiClient.fetch<TPatientDataResponse>(`${API_URL}/doctor/info/patients`)
    },
    createPatient: (patient: Partial<TPatientEntity & { password: string }>) => {
        return apiClient.fetch<TCreatePatientResponse>(`${API_URL}/doctor/info/patient`, patient, 'post')
    },
    updatePatientDetail: () => {

    },
    deletePatient: (id: number) => {
        return apiClient.fetch<TDeletePatientResponse>(`${API_URL}/doctor/info/patient/${id}`, undefined, 'delete')
    }
}

export default patientService