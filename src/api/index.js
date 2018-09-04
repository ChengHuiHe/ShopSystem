// 引入 axios,要下载包 npm i axios
import axios from 'axios'
// 配置路径
// const baseURL = 'http://47.96.21.88:8082/api/private/v1/'
const baseURL = 'http://localhost:8888/api/private/v1/'

// 设置默认的基准路径
axios.defaults.baseURL = baseURL

//  0、添加拦截-- 发送之前拦截
// config 可以进行请求头的设置，通过headers 属性设置
axios.interceptors.request.use(function (config) {
  // Do something before request is sent：请求之前处理
  // 1、获取token
  var token = localStorage.getItem('mytoken')
  // 2、写入请求头 headers.Authorization 不行（这里它是字符串！），对象的写法2种：
  // a. 对象 b.['']
  config.headers['Authorization'] = token
  return config
}, function (error) {
  // Do something with request error:请求失败
  return Promise.reject(error)
})

// 1、登陆 -- 解构 -- promise
// export 暴露成员
export const login = (params) => {
  // axios.post('login', params) promise对象
  return axios.post('login', params).then((res) => {
    return res.data
  })
}

// 获取所有数据 -- 在Vue里 的解构传入
export const getAllUserList = (pa) => {
  return axios.get('users', {params: pa}).then((res) => {
    return res
  })
}
