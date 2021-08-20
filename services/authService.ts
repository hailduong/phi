import {API_URL} from "../env";
import {TAuthRequestBody, TAuthResponse} from "./authType";

const authService = {
    key: '',
    login: async (email: string, password: string) => {

        // Send request
        const response = await fetch(`${API_URL}/doctor/auth/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
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
        }

        return jsonData

    }
}

export default authService