import {API_URL} from '../../env'
import {TDeletePatientResponse, TPatientCreateBody, TPatientDataResponse, TPatientEntity} from './types'
import apiClient from '../apiClient'

const patientService = {
    getPatientList: async () => {
        return apiClient.get<TPatientDataResponse>(`${API_URL}/doctor/info/patients`)
    },
    createPatient: (patient: Partial<TPatientEntity & { password: string }>) => {
        return apiClient.post<TPatientDataResponse>(`${API_URL}/doctor/info/patient`, patient)
    },
    updatePatientDetail: (id: number, patient: TPatientCreateBody & { password: string }) => {
        return apiClient.put<TPatientDataResponse>(`${API_URL}/doctor-patient/${id}/info`, patient)
    },
    deletePatient: (id: number) => {
        return apiClient.delete<TDeletePatientResponse>(`${API_URL}/doctor/info/patient/${id}`)
    }
}

export default patientService