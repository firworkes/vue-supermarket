<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="clear">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售明细</span>
      </div>
      <div class="time">
        <!-- 开始结束时间框 -->
        <div class="start-time">
            开始时间：
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            结束时间：
            <el-date-picker v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
            <span>（格式：2012-01-01）</span>
        </div>&emsp;
      </div>
      <!-- 查询框 -->
      <div class="reper-main">
        <span>关键字：</span>
        <el-input class="reper-ipt" placeholder="请输入内容"></el-input>
        <span class="reper-size">(商品名称,订单号,客户名字,会员卡号)</span>
        <el-button type="success" size="mini">查询</el-button>
      </div>
      <!-- 表格 -->
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="indent" label="订单号" width="180"></el-table-column>
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <el-table-column prop="amount" label="数量"></el-table-column>
          <el-table-column prop="practical" label="实际销售"></el-table-column>
          <el-table-column prop="discounts" label="优惠（促销/会员）"></el-table-column>
          <el-table-column prop="refund" label="退款"></el-table-column>
          <el-table-column prop="marketTime" label="销售时间"></el-table-column>
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
          indent: "69119090990909",
          name: "我的优乐美",
          amount: 10.0,
          practical: "未促销",
          discounts: 0,
          refund: 0.0,
          marketTime: "管理"
        },
        {
          indent: "69119090990909",
          name: "我的优乐美",
          amount: 10.0,
          practical: "未促销",
          discounts: 0,
          refund: 0.0,
          marketTime: "管理"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
      },
      value1: '',
        value2: '',
    }
  }
};
</script>

<!-- CSS -->
<style lang="less">
.clear {
  .reper-main {
    margin-bottom: 20px;
    .reper-ipt {
      width: 300px;
    }
    .reper-size {
      font-size: 14px;
      margin: 0px 10px;
    }
  }

  //开始结束时间输入框
  .time {
    margin-bottom: 15px;
    span {
      font-size: 14px;
    }
  }
}
</style>