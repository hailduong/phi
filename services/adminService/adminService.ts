import apiClient from "../apiClient";
import {API_URL} from "../../env";
import {TDoctorCreateBody, TDoctorResponse} from "./adminTypes";

const adminService = {
    getDoctorList: async () => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/info/doctors`)
    },
    getDoctorInfo: async (doctorId: string) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin-doctor/${doctorId}/info`)
    },
    getPatientInfo: async (doctorId: string) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin-doctor/${doctorId}/info/patient`)
    },
    getEventInfo: async (doctorId: string, patientId: string) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/event/${doctorId}/patient/${patientId}`)
    },
    getHistoryInfo: async (doctorId: string, patientId: string) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/history/${doctorId}/patient/${patientId}`)
    },
    getPrescriptionInfo: async (doctorId: string, patientId: string) => {
        return await apiClient.get<TDoctorResponse>(`${API_URL}/admin/prescription/${doctorId}/patient/${patientId}`)
    }
}

export default adminService