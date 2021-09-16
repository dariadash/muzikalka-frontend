import axios from 'axios'

export const createAccount = (login: string, password: string) => {
    return axios.post('/api/registration',{
        login,
        password
    })
}

export const authAccount = (login: string, password: string) => {
    return axios.post('/api/auth', {
        login,
        password
    })
}

export const getProfile = () => axios.get('/api/profile')
