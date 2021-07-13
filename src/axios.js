import axios from 'axios'
import router from './router'
import Element from 'element-ui'

axios.defaults.baseURL = 'http://localhost:8082'

const request = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept-Language': 'zh-CN'
  }
})

request.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

request.interceptors.response.use(rep => {
  const res = rep.data
  if (res.success) {
    return rep
  } else {
    Element.Message.error(res.message)
    return Promise.reject(rep.data.msg)
  }
}, error => {
  if (error.res.data) {
    error.message = error.response.message
  }
  if (error.response.status === 401) {
    router.push('/login')
  }

  Element.Message.error(error.message, {
    duration: 3000
  })

  return Promise.reject(error)
})

export default request
