import authService from './authentication/authService'

const hey = {
    'abc': 'ok',
    'def': 'yes'
}


const apiClient = {
    async fetch<ReturnedType>(url: string, body?: { [prop: string]: string }, method: string = 'get') {

        switch (method) {
            case 'get': {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Authorization': `Bearer ${authService.key}`
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
                        'Authorization': `Bearer ${authService.key}`
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