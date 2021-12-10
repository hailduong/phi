import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import patientService from './patientService'
import {TPatientEntity} from './types'

/* Thunk */
// Get thunk
export const getPatientList = createAsyncThunk('getPatientList', async () => {
    const response = await patientService.getPatientListByCurrentDoctor()
    return response.data
})

// Delete thunk
type TDeletePatientParams = { id: number }
export const deletePatient = createAsyncThunk('deletePatient', async (params: TDeletePatientParams) => {
    const {id} = params
    const response = await patientService.deletePatient(id)
    return response.data
})

// TODO: Create Thunk

// TODO: Update Thunk

// TODO: Get Info Thunk


/* Adapter */
const patientData = createEntityAdapter<TPatientEntity>()

/* Slice */
const patientSlice = createSlice({
    name: 'patients',
    initialState: patientData.getInitialState([]),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPatientList.fulfilled, (state, {payload}) => {
            patientData.setAll(state, payload)
        })
    }
})

export default patientSlice.reducer