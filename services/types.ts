/* Patients */
export type TPatientData = {
    id: number
    fisrtName: string
    lastName: string
    email: string
    phone: number
    title: string
}
export type TPatientDataList = TPatientData[]

export type TPatientDataResponse = {
    status: string
    data: TPatientDataList
}