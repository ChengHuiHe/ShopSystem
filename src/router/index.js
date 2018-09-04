import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/Login.vue' // 引入文件

// 首页
import Home from '../views/Home.vue'
import User from '../views/user/User.vue'

Vue.use(Router)

export default new Router({
  // 路由懒加载
  // {
  //   path: '/development',
  //   name: 'development',
  //   component: (resolve) => {
  //       require(['../views/development.vue'], resolve)
  //   }
  // },

  routes: [
    {
      path: '/',
      name: 'default',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
