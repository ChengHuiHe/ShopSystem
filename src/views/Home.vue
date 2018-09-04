<template>
    <div class="home">
        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
                <el-menu  class="el-menu-admin"
                 @open="handleOpen"
                  @close="handleClose"
                   background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"

                    :collapse="iscollapse"
                    >

                    <el-submenu index="1" default-active="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="user" class="el-icon-menu">用户列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="2-1" class="el-icon-menu">选项1</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>

                        <el-menu-item index="3-1" class="el-icon-menu">选项1</el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-container>
                <el-header class="el-header">
                    <!-- 在样式里设置 :collapse='iscollapse' 才可以实现点击（官网规则）-->
                    <span class="myicon myicon-menu toggle-btn" @click="iscollapse = !iscollapse"></span>
                    <span class="system-title">商品后台管理系统</span>
                    <div>
                    <span class="welcome">你好！admin</span>
                    <el-button type="text" @click="loginOut">退出</el-button>
                    </div>
                </el-header>
                <el-main>
                    记得占坑 router-view
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
    loginOut () {
      // 清除token
      localStorage.removeItem('mytoken')
      // 重定向
      this.$router.push({name: 'Login'})
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
