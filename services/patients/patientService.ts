import {API_URL} from '../../env'
import {TCreatePatientResponse, TDeletePatientResponse, TPatientDataResponse, TPatientEntity} from './types'
import apiClient from '../apiClient'

const patientService = {
    getPatientList: async () => {
        return apiClient.get<TPatientDataResponse>(`${API_URL}/doctor/info/patients`)
    },
    createPatient: (patient: Partial<TPatientEntity & { password: string }>) => {
        return apiClient.post<TCreatePatientResponse>(`${API_URL}/doctor/info/patient`, patient)
    },
    updatePatientDetail: () => {

    },
    deletePatient: (id: number) => {
        return apiClient.delete<TDeletePatientResponse>(`${API_URL}/doctor/info/patient/${id}`)
    }
}

export default patientService