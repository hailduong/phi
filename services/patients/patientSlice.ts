import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import patientService from './patientService'
import {TPatientEntity} from './types'

/* Thunk */
export const getPatientList = createAsyncThunk('customers/fetchOneCustomer', async () => {
    const response = await patientService.getPatientListByCurrentDoctor()
    return response.data
})

/* Adapter */
const patientAdapter = createEntityAdapter<TPatientEntity>()

/* Slice */
const patientSlice = createSlice({
    name: 'patients',
    initialState: patientAdapter.getInitialState([]),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPatientList.fulfilled, (state, {payload}) => {
            patientAdapter.setAll(state, payload)
        })
    }
})

export default patientSlice.reducer