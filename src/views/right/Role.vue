<template>
    <div>
        <!-- 面包屑(路径导航) -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索+添加 -->
        <div style="margin-top:15px">
            <el-button type="success" @click="showdialogRoleFormVisible">添加角色</el-button>
        </div>
        <!-- 列表 -->
        <template>
            <el-table :data="roleList" border style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <!-- 第一大行，第一层数据 -->
                        <el-row v-for="first in scope.row.children" :key="first.id">
                            <!-- 左边占4份 -->
                            <el-col :span="4">
                                <el-tag closable type="info" @close='deleteUserRight(scope.row,first.id)'>
                                    {{first.authName}}
                                </el-tag>
                            </el-col>
                            <!-- 右边 ，里面有2层嵌套-->
                            <el-col :span="20">
                                <el-row v-for="second in first.children" :key="second.id">
                                    <el-col :span="4">
                                        <el-tag closable type="info" @close='deleteUserRight(scope.row,second.id)'>
                                            {{second.authName}}
                                        </el-tag>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-tag closable type="info" @close='deleteUserRight(scope.row,third.id)' v-for="third in second.children" :key="third.id" style="margin:4px">
                                            {{third.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!-- 如果没有就 提示！！！ -->
                        <el-row v-if="scope.row.children.length === 0">
                            <span>没有权限，请到用户管理权限设置</span>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="180">
                </el-table-column>
                <el-table-column prop="roleDesc" label="描述">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button type="success" icon="el-icon-edit" plain></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" plain></el-button>
                        </el-tooltip>
                        <el-tooltip content="分配权限" placement="top">
              <el-button type="primary" icon="el-icon-share" plain @click='showGrantDialog(scope.row)'></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!-- 角色 权限设置弹出框 -->
        <el-dialog title="角色分配权限列表" :visible.sync="grantDialogVisible" >
            <!-- 树形结构 -->
            <div style="height:300px;overflow:auto">
                <!--设置 rightList 数据源 -->
                <el-tree :data="rightList" show-checkbox node-key="id" ref="tree" :default-expand-all= "true" :default-checked-keys="checkArr" :props="defaultProps">
                </el-tree>
            </div>
            <div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="grantDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="grantRightSubmit">确 定</el-button>
                </span>
            </div>
        </el-dialog>

        <!-- 添加角色对话框 -->
        <!-- 注意：这里要添加 prop 作用是完成添加角色时 清空 表单框，结合rules （看element form表单文档）-->
        <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible">
      <el-form :model="addroleform" label-width='100px' :rules="rules" ref='addRoleForm'>
        <el-form-item label="角色名称" prop='roleName'>
          <el-input v-model="addroleform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop='roleDesc'>
          <el-input v-model="addroleform.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import { getAllRoleList, getDeleteRole, getAllRightList, grantroleright, addRole } from '@/api/index.js'
export default {
  data () {
    return {
      // 当前角色的 id
      roleid: '',
      roleList: [],
      checkArr: [], // 默认勾选的节点的 key 的数组
      grantDialogVisible: false,
      addRoleDialogVisible: false,
      rightList: [], // 树形的所有数据
      defaultProps: {
        children: 'children',
        label: 'authName' // 显示 每条值
      },
      addroleform: {
        // roleId: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { }
        ]
      }
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 显示 添加角色对话框
    showdialogRoleFormVisible () {
      this.addRoleDialogVisible = true
    },
    // 添加角色
    addRoleSubmit () {
      // 调用
      addRole(this.addroleform).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            type: 'success',
            message: '添加角色成功'
          })

          // 刷新
          this.initList()
          // 隐藏对话框
          this.addRoleDialogVisible = false
        } else {
          this.$message({
            type: 'error',
            message: '添加角色失败'
          })
          // 看文档 --- 重置表单
          this.$refs['addroleform'].resetFields()
        }
      })
    },
    // 0.加载角色列表
    initList () {
      // 一加载该页面就 加载值
      getAllRoleList().then(res => {
        console.log(res.data)
        this.roleList = res.data
      })
    },
    // 1、删除 角色对应的权限（和局部刷新！）
    deleteUserRight (row, rightId) {
      getDeleteRole(row.id, rightId).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          // 刷新页面（局部刷新，【看浏览器】根据返回的删除的值进行再次加载就可以了）
          row.children = res.data
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'error'
          })
        }
      })
    },
    // 2、显示角色 授权 对话框(和详细信息)
    showGrantDialog (row) {
      this.grantDialogVisible = true
      // 加载所有的权限数据
      getAllRightList('tree').then(res => {
        this.rightList = res.data
      })
      // 将当前的角色数据 id存储到Data的属性中
      this.roleid = row.id
      console.log(row)
      // 加载默认选中项 -- 遍历当前角色的权限数组
      this.checkArr.length = 0 // 清空
      // 这里是3层判断
      if (row.children.length > 0) {
        row.children.forEach(first => {
          if (first.children.length > 0) {
            first.children.forEach((second) => {
              if (second.children.length > 0) {
                second.children.forEach(third => {
                  this.checkArr.push(third.id)
                })
              }
            })
          }
        })
      }
    },
    // 提交 修改后的角色授权
    grantRightSubmit () {
      console.log('点击了确定')
      // 给指定的角色授权
      //   roleid,rids
      // 根据文档，需要2个参数: roleid , rids
      console.log(this.$refs.tree.getCheckedNodes())
      // 1、获取了对象数组，我们需要的数据在每个对象的id 和pid中
      var nodeArr = this.$refs.tree.getCheckedNodes()
      // 2.遍历数组，获取到每个对象的id 和pid，拼接， 返回一个新的字符串，存储在数组中
      var idArr = nodeArr.map(value => {
        return value.id + ',' + value.pid
      })
      console.log(idArr)
      // 3.将数组的元素拆分以、 拼接、得到的结果是： 105,104,106,104
      var strArr = idArr.join(',')
      console.log(strArr)
      // 4.去除重复
      var ridsArr = strArr.split(',')
      console.log(ridsArr)
      // 5.去除数组重复的值
      var tempSet = new Set(ridsArr)
      console.log(tempSet)
      var final = Array.from(tempSet)
      console.log(final.join(','))
      //
      var rids = final.join(',')
      // 调用接口授权
      grantroleright({roleid: this.roleid, rids: rids}).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          // 重置
          this.initList()
          // 隐藏
          this.grantDialogVisible = false
          //
          this.$refs.tree.setCheckedKeys([])
        }
      })
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
