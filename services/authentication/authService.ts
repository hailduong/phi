import {API_URL} from '../../env'
import {TAuthResponse, TUserEntity} from './authType'


class AuthService {

    user: TUserEntity | null = null

    get key(): string | null {
        if (typeof window !== 'undefined') {
            const value = localStorage.getItem('key')
            if (value) {
                return window.atob(window.atob(value))
            }
        }
        return null
    }

    set key(value: string | null) {
        if (typeof window !== 'undefined' && typeof value === 'string') {
            window.localStorage.setItem('key', window.btoa(window.btoa(value)))
        }
    }

    async signup(email: string, password: string) {
        const response = await fetch(`${API_URL}/doctor/auth/register`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const respondedData: TAuthResponse = await response.json()
        return respondedData
    }

    async login(email: string, password: string) {

        // Send request
        const response = await fetch(`${API_URL}/doctor/auth/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        // Get responded data
        const jsonData: TAuthResponse = await response.json()

        // Save the access token
        if (jsonData.status.code === 200) {

            // Save to localStorage
            this.key = jsonData.data.accessToken

            // Save user
            this.user = jsonData.data
        }

        return jsonData

    }

    checkIfUserHasLoggedIn() {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('key') !== null
        }
        return false
    }
}

export default new AuthService()


