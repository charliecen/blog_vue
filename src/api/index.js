/**
 * Created by zt-2203315 on 2017/7/3.
 */
import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://laravel_admin.com/api'

axios.interceptors.request.use(config => {
  // 进度条
  NProgress.start()
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  alert('错误的参数')
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => {
  if (response.data.code !== 200) {
    alert(response.data.msg)
    return Promise.reject(response)
  }
  return response
}, error => {
  alert('网络异常')
  // 这里吧错误信息扶正，后面不需要写catch
  return Promise.reject(error)
})

export default axios
