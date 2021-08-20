import authService from "./authService";

const hey = {
    "abc": "ok",
    "def": "yes"
}


const apiClient = {
    async fetch(url: string, body?: { [prop: string]: string }, method: string = 'get') {

        const isPost = method === 'post'

        if (isPost) {
            return fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authService.key}`
                },
                body: JSON.stringify(body)
            })
        } else {
            return fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${authService.key}`
                }
            })
        }

    }
}

export default apiClient