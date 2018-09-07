 <template>
  <div class='user'>
    <!-- 面包屑(路径导航) -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索+添加 -->
    <div style="margin-top: 15px;">
      <!--@keydown.native.enter= 要添加 native，因为native是原生的，其它的为组件方法 -->
      <el-input placeholder="请输入内容" v-model="serachKey" @keydown.native.enter="searchUserList" class="input-with-select" style="width:300px">
        <el-button slot="append" icon="el-icon-search" @click="searchUserList"></el-button>
      </el-input>
      <el-button type="success" @click="adddialogTableVisible = true" plain>添加用户</el-button>
    </div>
    <!-- 表格数据展示 -->
    <template>
      <el-table :data="userList" border style="width: 100%;margin-top:15px">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeUserStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 将来我们点击这个按钮，不仅仅需要让用户看到按钮，而且还要能够获取这个按钮所在行的数据，那么template就能够实现这个愿望。它里面有一个属性slot-scope，这个属性的值scop.row就是我们需要的这一行所对应的数据 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button type="success" icon="el-icon-edit" plain @click='showEditDialog(scope.row)'></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" plain></el-button>
            </el-tooltip>
            <el-tooltip content="授权角色" placement="top">
              <el-button type="primary" icon="el-icon-share" plain @click="showGrantDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total=total>
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogTableVisible">
      <!-- 没有 ref="addForm" 的话 property 'validate' of undefined
      没有 :model="addForm" 的话 直接提示 “请输入XXX”-->
      <el-form :model="addForm" ref="addForm" :rules="rules" label-width="100px">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话: " prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击弹出编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogTableVisible">
      <el-form :model="editForm" ref="editForm" :rules="rules" label-width="100px">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话: " prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 授权角色对话框 -->
 <el-dialog title="授权角色" :visible.sync="grantdialogFormVisible">
      <el-form :model="grantform" ref='grantform' label-width="100px">
        <el-form-item label="用户名：">
          <el-input v-model="grantform.username" auto-complete="off" disabled="" style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label="角色：级联">
          <template>
            <!-- v-model:这可以自动的获取:value所绑定的数据，意味着rolevalue就是item.id -->
            <el-select v-model="grantform.rid" placeholder="请选择">
              <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantUserSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  getAllUserList,
  addUser,
  editUser,
  updateUserStateById,
  getAllRoleList
} from '@/api/index.js'
export default {
  data () {
    return {
      serachKey: '',
      userList: [],
      pagenum: 1, // 默认
      pagesize: 1, // 默认
      total: 0, // 默认
      adddialogTableVisible: false,
      editdialogTableVisible: false,
      grantdialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        // 提示，（如果没为空 http://element-cn.eleme.io/#/zh-CN/component/form）
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '请输入电话' }]
      },
      // 授权给用户的参数
      grantform: {
        id: '',
        rid: '',
        username: ''
      },
      roleList: []
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 实现授权给用户
    grantUserSubmit () {

    },
    // 角色权限
    showGrantDialog (row) {
      // 添加用户角色表
      getAllRoleList().then(res => {
        console.log(res)
        this.roleList = res.data
      })
    },

    // 修改 状态
    changeUserStatus (row) {
      updateUserStateById({ id: row.id, state: row.mg_state }).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          this.initList()
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'erreo'
          })
        }
      })
    },

    // 修改 编辑用户信息
    editUserSubmit (editForm) {
      this.$refs[editForm].validate(valid => {
        if (valid) {
          editUser(this.editForm).then(res => {
            console.log(res)
            // 发送请求
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              //
              this.editdialogTableVisible = false
              this.initList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '大哥输入有问题啊！'
          })
        }
      })
    },

    // 弹出对话框，同时填充数据
    showEditDialog (row) {
      console.log(row)
      // 可视化
      this.editdialogTableVisible = true
      // id
      this.editForm.id = row.id
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
    },
    // 搜索
    searchUserList () {
      this.initList()
    },

    // 添加用户
    addUserSubmit (addForm) {
      //  官网方法  -- this.$refs[formName].validate((valid) => {}
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 添加 用户 promise 对象
          addUser(this.addForm).then(res => {
            console.log(res)
            // 发送请求
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })

              // 隐藏 弹出框
              this.adddialogTableVisible = false
              // 重置表单
              this.$refs[addForm].resetFields()
              // 刷新页面
              this.initList()
            } else {
              this.$message({
                type: 'error',
                message: '这你都输不对！！！'
              })
            }
          })
        }
      })
    },
    // 动态获取数据
    initList () {
      getAllUserList({
        query: this.serachKey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res)
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initList()
    }
  }
}
</script>
<style lang='scss' scoped>
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
</style>
