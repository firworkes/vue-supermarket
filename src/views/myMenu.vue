<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="myMenu">
    <!-- 侧边导航栏 -->
    <el-col :span="12">
      <el-menu
        default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgb(48, 65, 86)"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <h4>
          <i class="el-icon-star-on"></i>XXX超市管理系统
        </h4>
        <div class="title-user">
          您好，欢迎您！
          <span v-if="titleUser==='未登录'">
            <router-link to="/">未登录</router-link>
          </span>
          <span v-else>{{titleUser}}</span>
          <!-- <img src="../assets/images/icon_head.png" alt=""> -->
        </div>

        <el-submenu :index="tree.index" v-for="tree in filterList" :key="tree.index">
          <template slot="title">
            <i :class="tree.cls"></i>
            <!-- 侧边导航一级标题 -->
            <span>{{tree.title}}</span>
          </template>
          <el-menu-item
            :index="item.index"
            v-for="item in tree.children"
            :key="item.index"
          >{{item.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<!-- JS -->
<script>
export default {
  data() {
    return {
      userGroup: 2, //默认都是普通员工
      // 动态菜单创建
      treelist: [
        {
          index: "1",
          cls: "el-icon-s-cooperation",
          title: "商品管理",
          userGroup: [1, 2],
          children: [
            { index: "/index/commodity", name: "商品管理" },
            { index: "/index/addcommodity", name: "添加管理" }
          ]
        },
        {
          index: "2",
          cls: "el-icon-s-goods",
          title: "账号管理",
          userGroup: [1],
          children: [
            { index: "/index/account", name: "账号管理" },
            { index: "/index/changepwd", name: "修改密码" },
            { index: "/index/addaccount", name: "增加账号" }
          ]
        },
        {
          index: "3",
          cls: "el-icon-circle-plus",
          title: "进货管理",
          userGroup: [1],
          children: [
            { index: "/index/repertory", name: "库存管理" },
            { index: "/index/addrepertory", name: "添加库存" }
          ]
        },
        {
          index: "4",
          cls: "el-icon-remove",
          title: "出货管理",
          userGroup: [1, 2],
          children: [
            { index: "/index/clear", name: "销售列表" },
            { index: "/index/clearout", name: "商品出库" },
            { index: "/index/clearback", name: "商品退货" }
          ]
        },
        {
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          userGroup: [1],
          children: [
            { index: "/index/sta", name: "销售统计" },
            { index: "/index/stocksta", name: "进货统计" }
          ]
        },
        {
          index: "6",
          cls: "el-icon-s-custom",
          title: "会员管理",
          userGroup: [1],
          children: [
            { index: "/index/x", name: "账号管理" },
            { index: "/index/l", name: "添加账号" }
          ]
        }
      ],
      titleUser: localStorage.getItem("username")
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  //计算属性
  computed: {
    filterList() {
      //遍历treelist数组
      return this.treelist.filter(tree => {
        //返回 查找出的 大于等于0的 userGroup
        return tree.userGroup.indexOf(this.userGroup) >= 0;
      }); 
    }
  },

  created() {
    this.userGroup = parseInt(localStorage.getItem("userGroup"));
  },

  mounted() {
    //发送axios
    this.$axios
      .post("http://localhost:3000/getusername", {
        //发送请求参数
        token: localStorage.getItem("token")
      })
      .then(({ data }) => {
        this.titleUser = data;
        console.log(data)
      });
  }
};
</script>

<!-- CSS -->
<style lang="less">
.myMenu {
  height: 100%;
  .title-user {
    text-align: center;
    padding: 20px 0px;
    color: #fff;
    line-height: 38px;
    font-size: 12px;
    span {
      font-size: 16px;
      text-decoration: none;
    }
    // img {
    //   width: 35px;
    //   margin-left: 15px;
    //   padding-top: 10px;
    // }
  }
  .el-menu {
    border: none;
    height: 100%;
    h4 {
      text-align: center;
      color: #fff;
    }
  }
}
</style>