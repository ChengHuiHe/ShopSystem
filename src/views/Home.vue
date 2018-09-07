<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened='true' :collapse="iscollapse" :router='true'>
          <!-- :unique-opened='true' 表示是否只保持一个子菜单的展开 -->
          <!-- index="XXX" 表示：点击就跳转到 XXX,所以这里放了个路由跳转，注意：必须配合  :router='true' 点击才有效-->

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>

           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="right">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
            <el-menu-item index="role">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
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
export default {
  data () {
    return {
      iscollapse: false
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
