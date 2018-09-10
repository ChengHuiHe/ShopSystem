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
// ----------------------- axios 使用----------------------
// get:
// 向具有指定ID的用户发出请求
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// 也可以通过 params 对象传递参数
// axios.get('/user', {
//   params: {
//     ID: 12345
//   }
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

// -----------------------post ----------------------
// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
// --------------------- 过个并发 请求 --------------------
// function getUserAccount () {
//   return axios.get('/user/12345')
// }
// function getUserPermissions () {
//   return axios.get('/user/12345/permissions')
// }
// axios.all([getUserAccount(), getUserPermissions()])
//   .then(axios.spread(function (acct, perms) {
//     // 两个请求现已完成
//   }))
// --------------------------------------------------------

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
// --------------------. 分配用户角色(主管、员工、hr、会计等) ----------------------
// 请求路径：users/:id/role
// 请求方法：put
// 请求参数
// id用户ID不能为空参数是url参数:id
// rid角色id不能为空参数body参数
export const grantRoleById = (pa) => {
  return axios.put(`users/${pa.id}/role`, {rid: pa.rid}).then(res => {
    return res.data
  })
}

// ----------------------------角色列表 和 权限列表的分割线--------------------------------------

// ------------------------- “权限”列表(看文档) -----------------
// 请求路径：rights/:type
// 请求方法：get
export const getAllRightList = (type) => {
  return axios.get(`rights/${type}`).then(res => {
    return res.data
  })
}

// ------------------------- 获取所有“角色权限列表”数据 -----------------
// 请求路径：roles
// 请求方法：get
// 响应数据说明
// 第一层为角色信息
// 第二层开始为权限说明，权限一共有3层权限
export const getAllRoleList = () => {
  return axios.get('roles').then((res) => {
    return res.data
  })
}

// ------------------删除角色指定权限 -------------------
// 请求路径：roles/:roleId/rights/:rightId
// 请求方法：delete
export const getDeleteRole = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`).then(res => {
    return res.data
  })
}

// -------------------- 给指定的角色授权 ---------------------
// 请求路径：roles/:roleId/rights
// 请求方法：post
export const grantroleright = (pa) => {
  // 注意：这里的 roleid 要和rose里的保持一致
  return axios.post(`roles/${pa.roleid}/rights`, {rids: pa.rids}).then(res => {
    return res.data
  })
}

// ------------------------ 编辑提交角色 -----------------------
// 请求路径：roles/:id
// 请求方法：put

// --------------------- 添加角色 Role ---------------------------
// 请求路径：roles
// 请求方法：post
export const addRole = (pa) => {
  // pa 是一个对象
  return axios.post('roles', pa).then(res => {
    return res.data
  })
}

// ----------------------- . 左侧菜单权限 -------------
// 请求路径：menus
// 请求方法：get
export const getLeftMenu = () => {
  return axios.get('menus').then(res => {
    return res.data
  })
}

// ----------------- 获取商品分类的 数据 category.vue----------------
// 商品数据列表
// 请求路径：categories
// 请求方法：get
// 请求参数
// type[1,2,3]值：1，2，3分别表示显示一层二层三层分类列表
export const getCategories = (type) => {
  return axios.get(`categories`, {params: {'type': type}}).then(res => {
    return res.data
  })
}
