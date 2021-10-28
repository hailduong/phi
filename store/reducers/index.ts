import {combineReducers} from 'redux'

import patientSlice from '../../services/patients/patientSlice'
import adminSlice from '../../services/adminService/adminSlice'

const rootReducer = combineReducers({
    patients: patientSlice,
    doctors: adminSlice
})

export default rootReducer
