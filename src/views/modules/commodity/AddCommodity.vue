<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="AddCommodity">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <!-- 表单 -->
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px">
        <!-- 分类 -->
        <el-form-item label="所属分类" prop="addCommodity">
          <el-select placeholder="选择分类" v-model="addCommodity.category">
            <el-option label="数码产品" value="数码产品"></el-option>
            <el-option label="家居日用" value="家居日用"></el-option>
            <el-option label="家用电器" value="家用电器"></el-option>
            <el-option label="电脑耗材" value="电脑耗材"></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品条码 -->
        <el-form-item label="商品条码">
          <el-input v-model="addCommodity.barCode" class=" commodity-name"></el-input>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="addCommodity.name"></el-input>
        </el-form-item>
        <!-- 商品卖价 -->
        <el-form-item label="商品卖价">
          <el-input v-model="addCommodity.salePrice"></el-input>
        </el-form-item>
        <!-- 商品市场价 -->
        <el-form-item label="商品市场价">
          <el-input v-model="addCommodity.marketPrice"></el-input>
        </el-form-item>
        <!-- 商品进价 -->
        <el-form-item label="商品进价">
          <el-input v-model="addCommodity.stockPrice"></el-input>
        </el-form-item>
        <!-- 商品库存 -->
        <el-form-item label="商品库存">
          <el-input v-model="addCommodity.stockCount"></el-input>
        </el-form-item>
        <!-- 商品重量 -->
        <el-form-item label="商品重量">
          <el-input v-model="addCommodity.commodityWeight"></el-input>
        </el-form-item>
        <!-- 商品单位 -->
        <el-form-item label="商品单位">
          <el-input v-model="addCommodity.commodityUnit"></el-input>
        </el-form-item>
        <!-- 会员优惠 -->
        <el-form-item label="会员优惠" prop="addCommodity">
          <el-radio-group v-model="addCommodity.vipDiscount">
            <el-radio label="享受"></el-radio>
            <el-radio label="不享受"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 是否促销 -->
        <el-form-item label="是否促销" prop="addCommodity">
          <el-radio-group v-model="addCommodity.promotion">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 商品简介 -->
        <el-form-item label="商品简介">
          <el-input v-model="addCommodity.goodsDesc" type="textarea"></el-input>
          <p>不超过200个汉字</p>
        </el-form-item>
        <el-button @click="addBtn" type="success">添加</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<!-- JS -->
<script>
export default {
  data() {
    return {
      //商品对象
      addCommodity: {
        category: null,   //所属分类
        barCode: '',      //商品条码
        name: '',         //商品名称
        salePrice: '',    //商品卖价
        marketPrice: '',  //商品市场价
        stockPrice: '',   //商品进价
        stockCount: '',   //商品库存
        commodityWeight: '',  //商品重量
        commodityUnit: '',    //商品单位
        vipDiscount: '',    //会员优惠
        promotion: '',      //是否促销
        goodsDesc: '',      //商品简介
      },
      labelPosition: "top",
    };
  },

  //方法
  methods: {
    //添加按钮
    addBtn(){
      //保存this
      let _this = this;
      //发送请求
      this.$axios.post('http://localhost:3000/commodity/addCommodity',{
        category: this.addCommodity.category,
        barCode: this.addCommodity.barCode,
        name: this.addCommodity.name,
        salePrice: this.addCommodity.salePrice,
        marketPrice: this.addCommodity.marketPrice,
        stockPrice: this.addCommodity.stockPrice,
        stockCount: this.addCommodity.stockCount,
        commodityWeight: this.addCommodity.commodityWeight,
        commodityUnit: this.addCommodity.commodityUnit,
        vipDiscount: this.addCommodity.vipDiscount,
        promotion: this.addCommodity.promotion,
        goodsDesc: this.addCommodity.goodsDesc,
      })
        .then(({data}) => {
          if(data.success) {
            this.$message({
              message: data.message,
              showClose: true,
                  message: '恭喜你，用户添加成功！',
                  type: 'success',
                  duration: 500,
                  onClose(){
                    _this.$router.push('/index/commodity')
                  }
            })
          }else {
            this.$message({
              message: data.message,
              showClose: true,
                  message: '温馨提示，用户添加失败！',
                  type: 'error',
                  duration: 500
            })
          }
        })
    }
  },

};
</script>

<!-- CSS -->
<style lang="less">
.AddCommodity {
    
    .el-input {
        width: 200px;
    }
    .commodity-name {
        width: 300px;
    }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>