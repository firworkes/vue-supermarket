<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 查询组件 -->
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="formInline.username" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 用户组 -->
        <el-form-item label="用户组">
          <el-select v-model="formInline.userGroup" placeholder="请选择用户组">
            <el-option label="" value=""></el-option>
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通会员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <template>
        <el-table :data="tableData" stripe style="width: 100%" :v-loading="loading">
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="userGroup" :formatter="formatterUserGroup" label="用户组"></el-table-column>
          <el-table-column prop="inputTime" :formatter="formatterInputTime" label="录入时间"></el-table-column>
          <el-table-column prop="right" label="操作">
            <!-- 操作按钮 -->
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
              <el-button @click="removeUserbtn(scope.$index,scope.row)" size="mini" icon="el-icon-delete" type="danger" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<!-- JS -->
<script>
//引入moment
import moment from "moment";

export default {
  data() {
    return {
      loading: true,
      formInline: {
        username: '',
        userGroup: null
      },
      tableData: [
        // {
        // username: '张三',
        // userGroup: '普通会员',
        // inputTime: '1111',
        // }
      ]
    };
  },
  //row:整行的数据对象
  //column:列的配置对象
  //vlaue:本行当前列的值
  //index: 索引
  methods: {

    //删除按钮
    removeUserbtn(index,row) {
      //发送请求
      this.$axios.post('http://localhost:3000/users/removeUser',{
        id: row.id
      })
        .then(({data}) => {
          this.$message({
            message: data.message,
            duration: 400,
            type: "success"
          })
        //发送请求 再次得到页面数据
          this.$axios("http://localhost:3000/users/listAccount")
            .then(({ data }) => {
              this.tableData = data;
            });

        })
        .catch(err => {
          this.$message({
            message: '温馨提示，删除失败！',
            duration: 400,
            type: "info"
          })
        })
    },


    //点击查询
    onSubmit() {

        //加载效果
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        })


      //发送请求
      this.$axios.get('http://localhost:3000/users/listUser',{
        params: {
          username: this.formInline.username,
          userGroup: this.formInline.userGroup
        }
      })
        .then(({data}) => {
          setTimeout(() => {
            loading.close()
            this.tableData = data;
          },500)
        })

    },

    formatterUserGroup(row, column, Value) {
      if (Value === 1) {
        return "超级管理员";
      } else {
        return "普通会员";
      }
    },
    formatterInputTime(row, column, Value) {
      return moment(Value).format("YYYY-MM-DD hh:mm");
    },
    //点击删除数据
    //发送请求
 
  },
  mounted() {

    //加载效果
    const loading = this.$loading({
      lock: true,
      text: '拼命加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
    })

    //发送请求
    this.$axios("http://localhost:3000/users/listAccount").then(({ data }) => {
      this.tableData = data;

      loading.close(); //加载完毕
    });
  }
};
</script>

<!-- CSS -->
<style lang="less">

</style>