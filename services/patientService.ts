import {API_URL} from "../env";
import {TPatientDataResponse} from "./types";

const patientService = {
    getPatientList: async () => {
        const response = await fetch(`${API_URL}/doctor/info/patients`)
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