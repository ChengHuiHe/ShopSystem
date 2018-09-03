// 引入 axios,要下载包 npm i axios
import axios from 'axios'
// 配置路径
const baseURL = 'http://47.96.21.88:8082/api/private/v1/'

// 设置默认的基准路径
axios.defaults.baseURL = baseURL

// 登陆 -- 解构 -- promise
export const login = (params) => {
  return axios.post('login', params).then((res) => {
    return res.data
  })
}
