// 让vue使用vuex工具来实现 组件之间的共享
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 存储数据对象，我们可以将需要的成员属性写在这里
const state = {
  // 当前登录的用户名
  username: ''
}
// （同步）
const mutations = {
  // 提供一个方法，为 state中的username赋值
  // 这些方法有一个默认的参数，这个参数就是当前的store中的State
  setUserName (state, username) {
    state.username = username
    // 解决点击刷新页面为空，因为是响应式
    localStorage.setItem('myname', username)
  },
  getUserName (state) {
    return state.username
  }
}
// （异步）
const actions = {
  setUserNameAction: ({commit}, username) => {
    commit('setUserName', username)
  },
  getUserNameAction: ({commit}) => {
    commit('getUserName')
  }
}
// 返回值
const getters = {
  getUserName: (state) => {
    return localStorage.getItem('myname')
  }
}

export default new Vuex.Store({
  // 如果添加严格模式，那么直接会 Do not mutate vuex store state outside mutation handlers，所以还是需要使用mutations中的函数进行数据的修改
  strict: true,
  state,
  getters,
  actions,
  mutations
})

//  还要在main.js 入口函数注入！！！
