import apiClient from "../apiClient";
import {API_URL} from "../../env";
import {TDoctorCreateBody, TDoctorResponse} from "./adminTypes";

const adminService = {
    getDoctorList: async () => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/info/doctors`)
    },
    deleteDoctor: async (doctorId: number) => {
        return await apiClient.delete<TDoctorResponse>(`${API_URL}/admin/info/doctor/${doctorId}`)
    },
    createDoctor: async (doctorData: TDoctorCreateBody) => {
        return await apiClient.post<TDoctorResponse>(`${API_URL}/admin/info/doctor`, doctorData)
    },
    getDoctorInfo: async (doctorId: number) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin-doctor/${doctorId}/info`)
    },
    getPatientInfo: async (doctorId: number) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin-doctor/${doctorId}/info/patient`)
    },
    getEventInfo: async (doctorId: number, patientId: number) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/event/${doctorId}/patient/${patientId}`)
    },
    getHistoryInfo: async (doctorId: number, patientId: number) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/history/${doctorId}/patient/${patientId}`)
    },
    getPrescriptionInfo: async (doctorId: number, patientId: number) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/prescription/${doctorId}/patient/${patientId}`)
    }
}

export default adminService