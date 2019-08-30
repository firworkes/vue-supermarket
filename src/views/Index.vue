<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div id="index">
    <el-container>
      <!-- 侧边 -->
      <el-aside width="200px">
        <!-- 引入导航 -->
        <myMenu></myMenu>
      </el-aside>
      
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- <h2>大家乐超市管理系统</h2> -->
        </el-header>  

        <!-- 中间内容 -->
        <el-main>
            <router-view></router-view>
        </el-main>


        <!-- 尾部 -->
        <el-footer style="height:30px;"><p>©Copyright 2016-2020 大家乐超市管理系统</p></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<!-- JS -->
<script>

//引入menu子组件
import myMenu from './myMenu'

export default {
  data() {
    return {
      multipleSelection: []
    }
  },

  //注册子组件
  components: {
    'myMenu': myMenu
  }
};
</script>

<!-- CSS -->
<style lang="less">

//主页
#index {
  height: 100%;
}
.el-container {
  height: 100%;
}


// 头部和尾部
.el-header,
.el-footer {
  // background-color: #2d3a4b;
  color: #fff;
  text-align: center;
  background-color: #2d3a4b;
  p {
    font-size: 14px;
  }
}


body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-col-12 {
  width: 100% !important;
  height: 100%;
}

</style>