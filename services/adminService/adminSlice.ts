import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import adminService from './adminService'
import {TDoctorEntity} from './adminTypes'

/* Thunk */
export const fetchDoctorList = createAsyncThunk('customers/fetchOneCustomer', async () => {
    const response = await adminService.getDoctorList()
    return response.data
})

/* Adapter */
const doctorAdapter = createEntityAdapter<TDoctorEntity>()

/* Slice */
const doctorSlice = createSlice({
    name: 'doctors',
    initialState: doctorAdapter.getInitialState([]),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDoctorList.fulfilled, (state, {payload}) => {
            doctorAdapter.setAll(state, payload)
        })
    }
})

export default doctorSlice.reducer