<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="commodity">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>

      <!-- 表格 -->
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="barCode" label="商品条形码"></el-table-column>
          <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
          <el-table-column prop="category" label="所属分类"></el-table-column>
          <el-table-column prop="salePrice" label="售价(元)"></el-table-column>
          <el-table-column prop="stockPrice" label="进价(元)"></el-table-column>
          <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>
          <el-table-column prop="stockCount" label="库存"></el-table-column>
          <el-table-column prop="manage" label="管理">
            <template slot-scope="scope">
              <el-button size="mini" class="edit_btn" type="primary" icon="el-icon-edit">编辑</el-button>
              <br />
              <el-button
                size="mini"
                @click="removeBtn(scope.$index,scope.row)"
                type="danger"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        @current-change="handleCurrPageChange"
        :pageSize="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<!-- JS -->
<script>
//引入
import {queryCommodityPage} from '../../../../apis/api';

export default {
  data() {
    return {
      tableData: [
        //   {barCode: '69119090990909',
        //   name: '我的优乐美',
        //   category: '优乐美',
        //   salePrice: 10.00,
        //   stockPrice: '未促销',
        //   marketPrice: 10.50,
        //   stockCount: 0,
        //   rental:0.00,
        //   sellRental: 0.00,
        //   manage: '管理'
        // }
      ],
      total:0,
      currentPage:1,
      pageSize: 5
    }
  },
  created(){
      this.ajaxgetlist(this.currentPage)  //初始化获取数据，默认传入的currentPage为1
    },
  methods: {
    handleCurrPageChange(newcurrentPage) {
      this.ajaxgetlist(newcurrentPage);
      this.currentPage = newcurrentPage //设置当前页码

    },

    removeBtn(index,row){
      
      this.$axios.post('http://localhost:3000/commodity/removeData',{
        id: row.id
      })
      // this.$confirm("是否确认删除商品?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
        .then(({data}) => {
          //删除成功提示信息
          this.$message({
            message:data.message,
            duration: 400,
            type: "success"
          })
          //删除成功，再次获取一次表格数据
           this.$axios.get('http://localhost:3000/commodity/commodityPage',{
          params: {
            currentPage:this.currentPage,
            pageSize: this.pageSize
          }
        })
          .then(({data}) => {
            this.tableData = data.data,
            this.total = data.total
          })

        })
        .catch(err => {
          this.$message({
            message: '已取消删除',
            type: 'info'
          })
        });

    },

    ajaxgetlist(page){
      queryCommodityPage(page,this.pageSize).then(res => {
          this.tableData = res.data.data; //设置总数据
          this.total = res.data.total; //总条数
      })
    }
    
  },
 
};
</script>

<!-- CSS -->
<style lang="less">
.commodity {
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .edit_btn {
    margin-bottom: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}
</style>