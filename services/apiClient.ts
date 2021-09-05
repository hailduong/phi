import authService from './authentication/authService'

const apiClient = {
    async get<ReturnedType>(url: string) {
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${authService.getAccessToken()}`
            }
        })
        const data: ReturnedType = await response.json()
        return data
    },

    async delete<ReturnedType>(url: string) {
        const response = await fetch(url, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${authService.getAccessToken()}`
            }
        })
        const data: ReturnedType = await response.json()
        return data
    },

    async post<ReturnedType>(url: string, body: any, authenticate = true) {

        const header: HeadersInit = authenticate ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authService.getAccessToken()}`
        } : {
            'Content-Type': 'application/json'
        }

        const response = await fetch(url, {
            method: 'post',
            headers: header,
            body: JSON.stringify(body)
        })
        const data: ReturnedType = await response.json()
        return data
    },
    async put<ReturnedType>(url: string, body: any, authenticate = true) {

        const header: HeadersInit = authenticate ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authService.getAccessToken()}`
        } : {
            'Content-Type': 'application/json'
        }

        const response = await fetch(url, {
            method: 'put',
            headers: header,
            body: JSON.stringify(body)
        })
        const data: ReturnedType = await response.json()
        return data
    }

}

export default apiClient