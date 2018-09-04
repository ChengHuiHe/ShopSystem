// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './styles/index.scss' // 添加样式(要下载包npm install less less-loader sass-loader node-sass --save-dev)

// 快速上手
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 添加全局路由守卫 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  // 如果登录，随便访问
  if (token) {
    next()
  } else {
    // 如果没登录，访问其它页面，需要登录，路由到登录（不使用next会是死循环！）
    if (to.path !== '/login') {
      // to.path = '/login'
      next({path: '/login'})
    } else {
      // 如果没有登录，但你访问的login，那你随意
      next()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
