import axios from 'axios'

const SW_API = 'https://swapi.dev/api'

export const swAxios = axios.create({
  baseURL: SW_API,
  timeout: 10000
})
