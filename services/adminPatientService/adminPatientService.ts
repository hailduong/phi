import {API_URL} from "../../env";
import apiClient from "../apiClient";
import {TPatientDataResponse} from "../patients/types";
import {TEventResponse} from "../eventService/eventTypes";
import {THistoryResponse} from "../history/historyTypes";
import {TPrescriptionResponse} from "../prescriptionService/prescriptionTypes";

const adminPatientService = {
    getPatientDoctor: async (doctorId: string) => {
        return await apiClient.get<TPatientDataResponse>(`${API_URL}/admin-doctor/${doctorId}/info/patients`)
    },
    getPatientEvent: async (doctorId: number, patientId: number) => {
        return await apiClient.get<TEventResponse>(`${API_URL}/admin/event/${doctorId}/patient/${patientId}`)
    },
    getPatientHistory: async (doctorId: number, patientId: number) => {
        return await apiClient.get<THistoryResponse>(`${API_URL}/admin/history/${doctorId}/patient/${patientId}`)
    },
    getPatientPrescription: async (doctorId: number, patientId: number) => {
        return await apiClient.get<TPrescriptionResponse>(`${API_URL}/admin/prescription/${doctorId}/patient/${patientId}`)
    }
}

export default adminPatientService