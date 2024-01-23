import axios from 'axios'

const request = axios.create({
  // baseURL: '/api',
  baseURL: 'http://127.0.0.1:8080/renren-fast',
  timeout: 20000,
})

request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if(response.data.code === 401) {
      window.location = '/login'
    }
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    // 对请求错误做些什么
    if(error.response.status === 404) {
      window.location = '/404'
    }
    return Promise.reject(error)
  }
)

export default request