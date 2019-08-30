<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="repertory">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">商品管理</el-button>
        <el-button style="float: right; padding: 3px 0" type="text">添加商品</el-button>
      </div>
      <div>
          <span>分类：</span>
        <el-select v-model="value" placeholder="选择分类">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>&emsp;
        <span>关键字：</span><el-input class="reper-ipt" placeholder="请输入内容"></el-input>
        <span class="reper-size">(商品名称,条形码)</span>
        <el-button type="success" size="mini">查询</el-button>
      </div>
      <!-- 表格 -->
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="code" label="商品条形码" width="180"></el-table-column>
          <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
          <el-table-column prop="price" label="进价(元)"></el-table-column>
          <el-table-column prop="storage" label="入库"></el-table-column>
          <el-table-column prop="repertoryRental" label="库存"></el-table-column>
          <el-table-column prop="sold" label="已售"></el-table-column>
          <el-table-column prop="manage" label="管理"></el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<!-- JS -->
<script>
export default {
  data() {
    return {
      tableData: [
        {
          code: "69119090990909",
          name: "我的优乐美",
          price: 10.0,
          storage: "未促销",
          repertoryRental: 0,
          sold: 0.0,
          manage: "管理"
        },
        {
          code: "69119090990909",
          name: "我的优乐美",
          price: 10.0,
          storage: "未促销",
          repertoryRental: 0,
          sold: 0.0,
          manage: "管理"
        }
      ],
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  }
};
</script>

<!-- CSS -->
<style lang="less">
.repertory {
    .reper-ipt {
        width: 300px;
    }
    .reper-size {
        font-size: 14px;
        margin: 0px 10px;
    }
}

</style>