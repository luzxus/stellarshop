import axios from 'axios'

export const makeRequest = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV,
  headers: {
    Authorization:
      'Bearer ' + import.meta.env.PROD
        ? import.meta.env.VITE_API_TOKEN_PROD
        : import.meta.env.VITE_API_TOKEN,
  },
})
