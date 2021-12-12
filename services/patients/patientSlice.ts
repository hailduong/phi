import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import patientService from './patientService'
import {TPatientCreateBody, TPatientEntity} from './types'

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
type TCreatePatientParams = Partial<TPatientEntity> & {password: string}
export const createPatient = createAsyncThunk('createPatient', async (patientBody: TCreatePatientParams) => {
    const response = await patientService.createPatient(patientBody)
    return response.data
})

// TODO: Update Thunk

type TUpdatePatientParams = TPatientEntity & {password: string}
export const updatePatient = createAsyncThunk('updatePatient', async (patientBody: TUpdatePatientParams) => {
    const response = await patientService.updatePatientDetail(patientBody.id, patientBody)
    return response.data
})


// TODO: Get Info Thunk
export const getInfoPatient = createAsyncThunk('getInfoPatient', async (params: TDeletePatientParams) => {
    const {id} = params
    const response = await patientService.getPatientInfo(id)
    return response.data
})


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