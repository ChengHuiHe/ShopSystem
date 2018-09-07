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

// 1、登陆 -- 解构 -- promise  -- http://www.runoob.com/w3cnote/javascript-promise-object.html
// export 暴露成员
export const login = (params) => {
  // axios.post('login', params) promise对象
  //  promise(reslove,reject) 对象
  // then中调用的函数本质是 reslove，它会将返回结果返回给promise对象的 reslove函数
  return axios.post('login', params).then((res) => {
    return res.data
  })
}

// 获取所有数据 -- 在Vue里 的解构传入
export const getAllUserList = (pa) => {
  return axios.get('users', {
    params: pa
  }).then((res) => {
    return res.data
  })
}

// ------------------------- 添加用户 -----------------
export const addUser = (pa) => {
  return axios.post('users', pa).then((res) => {
    return res.data
  })
}
// ------------------------- 编辑用户(看文档) -----------------
// 请求路径：users/:id
// 请求方法：put
// 请求参数
// 参数名：参数说明备注
// id用户id不能为空 参数是url参数:id
// email:邮箱可以为空
// mobile:手机号可以为空

// vue里面拼接 参数 2种方法:
// 1、+  。例如：<a:href="'/xxx/' + id">链接</a>
// 2、使用：`` 号。例如： `users/${pa.id}`
export const editUser = (pa) => {
  return axios.put(`users/${pa.id}`, pa).then((res) => {
    return res.data
  })
}
// ------------------------- 修改用户状态(看文档) -----------------
// 请求路径：users/:uId/state/:type
// 请求方法：put
export const updateUserStateById = (pa) => {
  return axios.put(`users/${pa.id}/state/${pa.state}`).then((res) => {
    return res.data
  })
}

// ------------------------- 权限列表(看文档) -----------------

export const getAllRightList = (type) => {
  return axios.get(`rights/${type}`).then(res => {
    return res.data
  })
}
