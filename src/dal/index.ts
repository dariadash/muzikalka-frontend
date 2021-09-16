import axios from 'axios'

export * from './account'
export * from './songs'


axios.interceptors.request.use((config) =>{
    const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})