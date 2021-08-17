import {API_URL} from "../env";
import {TPatientDataResponse} from "./types";

const patientService = {
    getPatientList: async () => {
        const response = await fetch(`${API_URL}/auth/v1/doctor/patients`)
        return await response.json() as TPatientDataResponse
    },
    getPatientDetail: () => {
    },
    updatePatientDetail: () => {

    },
    deletePatient: () => {

    }
}

export default patientService