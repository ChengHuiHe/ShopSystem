<template>
  <div>
    <!-- 面包屑(路径导航) -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <template>
      <el-table :data="rightList" style="width: 100%">
        <el-table-column property='id' label="id" width="180">

        </el-table-column>
        <el-table-column property='authName' label="权限" width="180">

        </el-table-column>
        <el-table-column property='path' label="路径" width="180">

        </el-table-column>
        <el-table-column property='' label="层级">
          <template slot-scope="scope">
            <!-- 局部过滤 -->
            <span>{{scope.row.level | levelFormat}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import { getAllRightList } from '@/api/index.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    getAllRightList('list').then(res => {
      console.log(res)
      this.rightList = res.data
    })
  },
  filters: {
    //  局部过滤
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '2级'
      } else if (level === '2') {
        return '3级'
      }
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
