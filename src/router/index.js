import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/Login.vue' // 引入文件

// 首页
import Home from '../views/Home.vue'
import User from '../views/user/User.vue'
import Right from '../views/right/Right.vue'
import Role from '../views/right/Role.vue'

import Categorie from '../views/goods/Categories.vue'
import Goods from '../views/goods/Goods.vue'
import Params from '../views/goods/Params.vue'
import Add from '../views/goods/GoodsAdd.vue'
import List from '../views/goods/GoodsList.vue'

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
    // {
    //   path: '/',
    //   name: 'default',
    //   component: Login
    // },

    // {
    //   path: '/user', // 登录成功后直接到子路由 /user 要去掉/ 后面的值
    //   name: 'user',
    //   component: User
    // }
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Home',
      path: '/',
      component: Home,
      children: [
        { // 子路由
          name: 'User',
          path: 'users',
          component: User
        },
        {
          name: 'Right',
          path: 'rights',
          component: Right
        }, {
          name: 'Role',
          path: 'roles',
          component: Role
        },
        {
          name: 'Goods',
          path: 'goods',
          component: Goods,
          // 子路由（嵌套）
          redirect: {path: 'goods/list'},
          children: [
            {
              name: 'List',
              path: 'list',
              component: List
            }, {
              name: 'Add',
              path: 'add',
              component: Add
            }
          ]
        },
        {
          name: 'Categorie',
          path: 'categories',
          component: Categorie
        },
        {
          name: 'Params',
          path: 'params',
          component: Params
        }
      ]
    }

  ]
})
