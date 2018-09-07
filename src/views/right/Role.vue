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
            <el-button type="success" @click="adddialogFormVisible = true">添加角色</el-button>
        </div>
        <!-- 列表 -->
        <template>
            <el-table :data="roleList" border style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <!-- 第一大行 -->
                        <el-row v-for="first in scope.row.children" :key="first.id">
                            <!-- 左边占4份 -->
                            <el-col :span="4">
                                <el-tag closable type="info" @close='deleteUserRight(scope.row,first.id)'>
                                    {{first.authName}}
                                </el-tag>
                            </el-col>
                            <!-- 右边 -->
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
                            <el-button type="danger" icon="el-icon-delete" plain ></el-button>
                        </el-tooltip>
                        <el-tooltip content="分配权限" placement="top">
                            <el-button type="primary" icon="el-icon-share" plain></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
import { getAllRoleList, getDeleteRole } from '@/api/index.js'
export default {
  data () {
    return {
      roleList: []
    }
  },
  mounted () {
    // 一加载该页面就 加载值
    getAllRoleList().then(res => {
      console.log(res.data)
      this.roleList = res.data
    })
  },
  methods: {
    // 删除 角色对应的权限（和局部刷新！）
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
