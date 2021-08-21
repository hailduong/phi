import authService from './authentication/authService'

const hey = {
    'abc': 'ok',
    'def': 'yes'
}


const apiClient = {
    async fetch(url: string, body?: { [prop: string]: string }, method: string = 'get') {

        switch (method) {
            case 'get': {
                return fetch(url, {
                    method,
                    headers: {
                        'Authorization': `Bearer ${authService.key}`
                    }
                })
            }
            case 'post': {
                return fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authService.key}`
                    },
                    body: JSON.stringify(body)
                })
            }

        }
    }
}

export default apiClient