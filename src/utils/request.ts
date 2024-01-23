import axios from 'axios'

const request = axios.create({
  // baseURL: '/api',
  baseURL: 'http://127.0.0.1:8080//renren-fast',
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
    // 对请求错误做些什么
    if(error.response.status === 401) {
      this.$router.push('/login')
    }
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request