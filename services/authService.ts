import {API_URL} from '../env'
import {TAuthResponse} from './authType'

const authService = {
    key: '',
    login: async (email: string, password: string) => {

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
        console.log('jsonData', jsonData)
        // Save the access token
        if (jsonData.status.code === 200) {
            authService.key = jsonData.data.accessToken

            // Save to localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('key', window.btoa(window.btoa(authService.key)))
            }
        }

        return jsonData

    },
    checkIfUserHasLoggedIn() {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('key')
        }
        return false
    }
}

export default authService