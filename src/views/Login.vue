
<template>

 <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt="" class="avatar">
      <!-- :model :表单数据对象.就是当前表单元素与数据进行的双向绑定-->
      <!-- rules：这就是表单元素的校验规则，它是一个对象 -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <!-- prop:指定当前表单元素所对应的校验规则 -->
        <el-form-item prop='username'>
          <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item  prop='password'>
          <el-input v-model="loginForm.password" type="password" prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入 api 登陆的index.js ，解构{}  getAllUserList
import {login} from '@/api/index.js'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // required:必填项 message：提示信息 trigger：触发时机(失去焦点时触发)
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formname) {
      // 真正的验证用户是否输入合法的数据，如果没有输入合法，则阻止本次请求
      // 我们要对表单进行验证，就需要调用表单的valiate方法,这个函数有一个回调，回调有一个参数，这个参数为true,则说明通过验证，否则则输入不合法
      // formname 是个字符串（传入的值是字符串，不能有多个字符串同时存在），这里要获取对象，只能这样子写（对象）！
      this.$refs[formname].validate((valid) => {
        if (valid) {
          console.log('可以去进行接口的请求的啦')
          login(this.loginForm).then((res) => {
            console.log(res)
            if (res.meta.status === 200) {
              // 给出提示信息
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              // 获取 -- 设置token
              localStorage.setItem('mytoken', res.data.token)
              // 路由跳转 this.$router.push({name:'路由名'})
              this.$router.push({name: 'Home'})

              // 获取所有数据 -- 在解构函数里写上
              // getAllUserList({query: '', pagenum: 1, pagesize: 10})
              //   .then((result) => {
              //     console.log(result)
              //   })
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
