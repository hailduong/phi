import authService from './authentication/authService'

const hey = {
    'abc': 'ok',
    'def': 'yes'
}


const apiClient = {
    async fetch<ReturnedType>(url: string, body?: any, method: string = 'get') {

        switch (method) {
            case 'get': {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Authorization': `Bearer ${authService.getAccessToken()}`
                    }
                })
                const data: ReturnedType = await response.json()
                return data

            }
            case 'delete': {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Authorization': `Bearer ${authService.getAccessToken()}`
                    }
                })
                const data: ReturnedType = await response.json()
                return data

            }
            case 'post': {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authService.getAccessToken()}`
                    },
                    body: JSON.stringify(body)
                })
                const data: ReturnedType = await response.json()
                return data
            }


        }
    }
}

export default apiClient