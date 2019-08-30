<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="AddRepertory">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品入库</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!-- 修改密码表单 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="商品条形码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="进价">
          <el-input></el-input>
        </el-form-item>
        <el-button type="success">入库</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<!-- JS -->
<script>
export default {
data() {
    return {
      labelPosition: "top"
    };
  }
};
</script>

<!-- CSS -->
<style lang="less">

.el-input {
  width: 300px;
}

</style>