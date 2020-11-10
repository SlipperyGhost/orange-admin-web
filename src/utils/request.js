import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/json' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      config.headers.common['Authorization'] = token
    }
    config.data = JSON.stringify(config.data)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (response.headers.authorization) {
      setToken(response.headers.authorization)
    }
    return res
  },
  error => {
    const rest = error.response
    console.error(rest) // for debug
    if (rest) {
      if (rest.status === 400 || rest.status === 500) {
        Message({ message: rest.data.desc, type: 'error' })
      } else if (rest.status === 401) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
    } else {
      Message({ message: 'Api Error, Please Try Again!', type: 'error' })
    }
    return Promise.reject(error)
  }
)

export default service
