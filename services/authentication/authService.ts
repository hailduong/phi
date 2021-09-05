import {API_URL} from '../../env'
import {TAuthResponse, TDoctorInfoEntity, TDoctorInfoResponse, TUserEntity} from './authType'
import apiClient from '../apiClient'


class AuthService {

    getUser(): TUserEntity | null {
        if (typeof window !== 'undefined') {
            const value = localStorage.getItem('user')
            if (value) {
                return JSON.parse(window.atob(window.atob(value)))
            }
        }
        return null
    }

    setUser(user: TUserEntity | null) {
        if (typeof window !== 'undefined' && user) {
            localStorage.setItem('user', window.btoa(window.btoa(encodeURIComponent(JSON.stringify(user)))))
        }
    }

    async getDoctorBasicInfo(): Promise<null | TDoctorInfoEntity> {
        if (typeof window !== 'undefined') {
            const value = sessionStorage.getItem('doctorBasicInfo')
            if (value) {
                return JSON.parse(value) as TDoctorInfoEntity
            }

            const data = await this.getMyProfile()
            if (data.status.code === 200) {
                sessionStorage.setItem('doctorBasicInfo', JSON.stringify(data.data))
                return data.data
            }

        }

        return null
    }

    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('key')
            localStorage.removeItem('user')
            sessionStorage.removeItem('doctorBasicInfo')
            location.assign('/login')
        }
    }

    getAccessToken(): string | null {
        if (typeof window !== 'undefined') {
            const value = localStorage.getItem('key')
            if (value) {
                return window.atob(window.atob(value))
            }
        }
        return null
    }

    setAccessToken(value: string | null) {
        if (typeof window !== 'undefined' && typeof value === 'string') {
            window.localStorage.setItem('key', window.btoa(window.btoa(value)))
        }
    }

    //1. Sign up
    async signup(email: string, password: string) {
        const response = await apiClient.post<TAuthResponse>(`${API_URL}/doctor/auth/register`, {
            email: email,
            password: password
        }, false)

        return response
    }

    //2. Login
    async login(email: string, password: string) {

        // Send request

        const response = await apiClient.post<TAuthResponse>(`${API_URL}/doctor/auth/login`, {
            email: email,
            password: password
        }, false)

        // Save the access token
        if (response.status?.code === 200) {

            // Save to localStorage
            this.setAccessToken(response.data.accessToken)

            // Save user
            this.setUser(response.data)
        }
        return response
    }

    //3. Forgot password
    async forgotPassword(email: string, password: string) {
        const response = await fetch(`${API_URL}/doctor/auth/forgot-password`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const emailData: TAuthResponse = await response.json()
        return emailData
    }

    //4. Change password
    async changePassword(code: string, password: string) {
        const response = await fetch(`${API_URL}/doctor/auth/change-password`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(({
                password: password,
                code: code
            }))
        })
        const newPassword: TAuthResponse = await response.json()
        return newPassword
    }


    //4. Check user has logged in?
    checkIfUserHasLoggedIn() {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('key') !== null
        }
        return false
    }

    async getMyProfile() {
        return await apiClient.get<TDoctorInfoResponse>(`${API_URL}/doctor/info`)
    }

    async updateMyProfile(data: TDoctorInfoEntity) {
        const response = await apiClient.put<TDoctorInfoResponse>(`${API_URL}/doctor/info`, data)
        if (response.status.code === 200 && typeof window !== 'undefined') {
            sessionStorage.setItem('doctorBasicInfo', JSON.stringify(data))
        }

        return response
    }
}

export default new AuthService()


