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
    }
}

export default adminService