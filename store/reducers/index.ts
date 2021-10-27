import {combineReducers} from 'redux'

import patientSlice from '../../services/patients/patientSlice'

const combinedReducers = combineReducers({
    patients: patientSlice
})
export type RootState = ReturnType<typeof combinedReducers>

const rootReducer = (state: RootState, action: any) => {
    // Clear all data in redux store if action type = auth/logout/pending to initial.
    // if (action.type === 'auth/logout/pending') {
    //     state = undefined
    //     localStorage.clear()
    // }

    // Return the combineReducers1
    return combinedReducers(state, action)
}

export default rootReducer
