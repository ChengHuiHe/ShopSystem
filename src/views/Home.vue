<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu class="el-menu-admin"
         @open="handleOpen"
         @close="handleClose"
         background-color="#545c64"
         text-color="#fff"
         active-text-color="#ffd04b"
         :unique-opened='true'
         :collapse="iscollapse"
         :router='true'>
          <!-- :unique-opened='true' 表示是否只保持一个子菜单的展开 -->
          <!-- index="XXX" 表示：点击就跳转到 XXX,所以这里放了个路由跳转，注意：必须配合  :router='true' 点击才有效-->

          <!-- :index,变成动态绑定，2、给动态绑定后面添加 +'',表示变成字符串（数字+字符串=> 字符串） -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>

      </el-aside>
      <el-container>
        <el-header class="el-header">
          <!-- 在样式里设置 :collapse='iscollapse' 才可以实现点击（官网规则,看 导航菜单）-->
          <span class="myicon myicon-menu toggle-btn" @click="iscollapse = !iscollapse"></span>
          <span class="system-title">商品后台管理系统</span>
          <div>
            <span class="welcome">你好！admin</span>
            <el-button type="text" @click="loginOut">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 记得占坑 router-view 子组件在这里被渲染 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getLeftMenu} from '@/api/index.js'
export default {
  data () {
    return {
      iscollapse: false,
      menuList: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 退出
    loginOut () {
      // 清除token
      localStorage.removeItem('mytoken')
      // 重定向(vue)
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {
    // 获取左边的菜单 --- 获取成功后，到路由动态修改
    getLeftMenu().then(res => {
      console.log('左侧菜单' + res.data)// 这样输出的结果是object 的（因为是字符串+结果=>字符串对象）
      console.log(res.data)
      console.log('------------------------------------')
      this.menuList = res.data
    })
  }
}
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #989898;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
