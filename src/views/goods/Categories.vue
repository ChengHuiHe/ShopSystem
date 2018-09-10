<template>
    <div>
        <!-- 面包屑(路径导航) -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加分类 -->
        <div style="margin-top:15px">
            <el-button type="success" plain @click="showAddRoleDialog">添加分类</el-button>
        </div>
        <!-- 添加树形组件 -->
        <tree-grid :treeStructure="true" :columns="columns"
        :data-source="dataSource" @deleteCate="deleteCategory" @editCate="editCategory">
        </tree-grid>
        <!-- 添加分类对话框 -->
         <el-dialog title="添加商品分类" :visible.sync="adddialogFormVisible">
            <el-form :model="addform" label-width='100px'>
                <el-form-item label="分类名称">
                    <el-input v-model="addform.cat_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级名称">
                    <!-- 注意：一定要加这个 :props='cascaderProps'，看树形组件文档，否则有数据，没效果 -->
                    <el-cascader :options="categoreList" v-model="selectedOptions" @change="handleChange" :props='cascaderProps'>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategorySubmit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {getCategories, addCategory} from '@/api/index.js'
// 引入公共部分 --- 但是官网的是 tree-grid,所以 要自定component 该回来
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
  data () {
    return {
      adddialogFormVisible: false,
      dataSource: [],
      addform: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      categoreList: [],
      selectedOptions: [],
      //   这样就可以显示数据到界面，否则有数据无界面
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  methods: {
    //  加载 商品分类数据
    initList () {
      // 3表示显示3级数据
      getCategories(3).then(res => {
        console.log(res)
        this.dataSource = res.data
      })
    },
    // 实现商品分类的添加
    addCategorySubmit () {
      if (this.selectedOptions.length === 0) {
        this.addform.cat_level = 0
        this.addform.cat_pid = 0
      } else if (this.selectedOptions.length === 1) {
        this.addform.cat_level = 1
        this.addform.cat_pid = this.selectedOptions[0]
      } else {
        this.addform.cat_level = 2
        this.addform.cat_pid = this.selectedOptions[2]
      }
      console.log(this.addform)
      addCategory(this.addform).then(res => {
        if (res.data.status === 201) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          getCategories(2).then(res => {
            this.dataSource = res.data
          })
          this.adddialogFormVisible = false
        }
      })
    },
    // 当级联选择发生变化的时候触发
    handleChange () {},
    //   显示添加角色对话框
    showAddRoleDialog () {
      this.adddialogFormVisible = true
      getCategories(2).then(res => {
        this.categoreList = res.data
      })
    },
    // 删除分类
    deleteCategory () {

    },
    // 编辑分类
    editCategory () {

    }

  },
  mounted () {
    //  加载 商品分类数据
    this.initList()
  },
  // 通过components属性可以来注入你想使用的组件
  components: {
    'tree-grid': TreeGrid
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
